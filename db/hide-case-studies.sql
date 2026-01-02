-- Hide duplicate/placeholder case study posts
UPDATE posts SET published = 0 WHERE id IN (
  'post-case-001',
  'post-case-002', 
  'post-case-003',
  'post-case-004'
);
