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


-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  package_name TEXT NOT NULL,
  price TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  company_name TEXT,
  message TEXT,
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

-- Jobs/Career Positions
CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_bn TEXT, -- Bengali Title
  department TEXT,
  department_bn TEXT, -- Bengali Department
  type TEXT, -- 'full-time', 'part-time', 'remote', 'contract'
  type_bn TEXT, -- Bengali Type
  location TEXT,
  location_bn TEXT, -- Bengali Location
  description TEXT,
  description_bn TEXT, -- Bengali Description
  responsibilities TEXT, -- JSON array (EN)
  responsibilities_bn TEXT, -- JSON array (BN)
  requirements TEXT, -- JSON array (EN)
  requirements_bn TEXT, -- JSON array (BN)
  salary_range TEXT,
  salary_range_bn TEXT, -- Bengali Salary Range
  is_active INTEGER DEFAULT 1,
  order_index INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
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

-- Chat Conversations
CREATE TABLE IF NOT EXISTS chat_conversations (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  session_id TEXT UNIQUE NOT NULL,
  user_id TEXT, -- Nullable, references users(id) if needed but we keep it loose for now
  guest_name TEXT,
  guest_phone TEXT,
  message_count INTEGER DEFAULT 0,
  last_message_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Chat Messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  conversation_id TEXT NOT NULL,
  role TEXT NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (conversation_id) REFERENCES chat_conversations(id) ON DELETE CASCADE
);

-- Insert default settings
INSERT OR IGNORE INTO settings (id, phone, email, address)
VALUES (1, '01639590392', 'rahmatullahzisan@gmail.com', 'ডিকেপি রোড, বরগুনা');
