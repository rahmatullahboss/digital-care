export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1ExecResult>;
}

export interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<D1Result<T>>;
  all<T = unknown>(): Promise<D1Result<T>>;
  raw<T = unknown>(): Promise<T[]>;
}

interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta: any;
  error?: string;
}

interface D1ExecResult {
  count: number;
  duration: number;
}

export class D1HTTPProxy {
  private accountId: string;
  private databaseId: string;
  private apiToken: string;

  constructor(accountId: string, databaseId: string, apiToken: string) {
    this.accountId = accountId;
    this.databaseId = databaseId;
    this.apiToken = apiToken;
  }

  prepare(query: string) {
    return new D1PreparedStatementProxy(this, query);
  }

  async exec(query: string): Promise<D1ExecResult> {
    // This is a simplified exec that just runs the query. 
    // Real D1 exec supports multiple statements, but for now we'll treat it as one text block.
    // The API might handle multiple statements if separated by semicolons.
    const response = await this.fetchD1(query, []);
    return {
      count: response.result.length, 
      duration: response.timing?.duration || 0
    };
  }

  async fetchD1(sql: string, params: any[]): Promise<any> {
    const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/d1/database/${this.databaseId}/query`;
    
    // Cloudflare D1 API expects params to be an array of strings/numbers/nulls
    // "prepared statements" via API are handled by passing sql and params
    
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiToken}`
      },
      body: JSON.stringify({
        sql,
        params
      })
    });

    if (!res.ok) {
        const text = await res.text();
        console.error('D1 API Error:', res.status, text);
        throw new Error(`D1 API Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    if (!json.success) {
      console.error('D1 Query Error:', json.errors);
      throw new Error(json.errors?.[0]?.message || 'Unknown D1 Error');
    }

    return json;
  }
}

class D1PreparedStatementProxy {
  private proxy: D1HTTPProxy;
  private query: string;
  private params: any[];

  constructor(proxy: D1HTTPProxy, query: string) {
    this.proxy = proxy;
    this.query = query;
    this.params = [];
  }

  bind(...values: any[]) {
    this.params = values;
    return this;
  }

  async all<T = unknown>(): Promise<D1Result<T>> {
    const json = await this.proxy.fetchD1(this.query, this.params);
    // The API returns { result: [{...}], success: true, ... }
    // But D1 binding returns { results: [], ... } (note 'results' vs 'result')
    // The API response structure for /query is usually: { result: [ { results: [], success, meta } ], success, errors, messages }
    // It returns an array of results, one for each statement. We usually have 1 statement.
    
    const statementResult = json.result?.[0];
    
    return {
      results: statementResult?.results || [],
      success: statementResult?.success ?? json.success,
      meta: statementResult?.meta || {}
    };
  }

  async first<T = unknown>(colName?: string): Promise<T | null> {
    const { results } = await this.all<T>();
    const firstRow = results.length > 0 ? results[0] : null;
    
    if (firstRow && colName) {
      return (firstRow as any)[colName];
    }
    return firstRow as T | null;
  }

  async run<T = unknown>(): Promise<D1Result<T>> {
     return this.all<T>();
  }
}
