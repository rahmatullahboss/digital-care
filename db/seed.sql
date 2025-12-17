-- Create default admin user
-- Password: admin123 (bcrypt hash)
INSERT OR REPLACE INTO users (id, email, password_hash, name, role)
VALUES (
  'admin-user-001',
  'admin@digitalcare.site',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Admin',
  'admin'
);
