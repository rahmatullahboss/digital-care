-- Blog Posts
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  published INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  icon TEXT,
  features TEXT, -- JSON array
  benefits TEXT, -- JSON array
  order_index INTEGER DEFAULT 0
);

-- Pricing Packages
CREATE TABLE IF NOT EXISTS pricing (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  period TEXT,
  description TEXT,
  features TEXT, -- JSON array
  popular INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 0
);

-- Contact Submissions
CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TEXT DEFAULT (datetime('now'))
);

-- Affiliate Applications
CREATE TABLE IF NOT EXISTS affiliates (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  promotion_strategy TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now'))
);

-- Site Settings
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  phone TEXT,
  email TEXT,
  address TEXT,
  facebook_url TEXT,
  linkedin_url TEXT,
  youtube_url TEXT,
  updated_at TEXT DEFAULT (datetime('now'))
);

-- FAQ
CREATE TABLE IF NOT EXISTS faq (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0
);

-- Admin Users
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TEXT DEFAULT (datetime('now'))
);

-- Insert default settings
INSERT OR IGNORE INTO settings (id, phone, email, address)
VALUES (1, '01639590392', 'rahmatullahzisan@gmail.com', 'ডিকেপি রোড, বরগুনা');
