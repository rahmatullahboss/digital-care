-- Hide Facebook Management and Digital Marketing posts
UPDATE posts SET published = 0 WHERE id IN (
  'post-service-002',
  'post-service-004'
);
