-- Add English translation columns to posts table
ALTER TABLE posts ADD COLUMN title_en TEXT;
ALTER TABLE posts ADD COLUMN excerpt_en TEXT;
ALTER TABLE posts ADD COLUMN content_en TEXT;
