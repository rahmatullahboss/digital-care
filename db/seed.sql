-- Create default admin user
-- Password: admin123 (bcrypt hash)
INSERT OR REPLACE INTO users (id, email, password_hash, name, role)
VALUES (
  'admin-user-001',
  'admin@digitalcare.site',
  '$2b$10$i/IvOvS2DAnrhGuJHU95Be6HGpY/9iSll5vB.37Q2ko6XWwQ7H5gW',
  'Admin',
  'admin'
);

-- =============================================================================
-- FAQ Data (Software Development Focus)
-- =============================================================================
INSERT OR REPLACE INTO faq (id, question, answer, order_index) VALUES
(
  'faq-001',
  'আপনারা কী কী সফটওয়্যার ডেভেলপমেন্ট সার্ভিস দেন?',
  'আমরা ওয়েবসাইট ডেভেলপমেন্ট, ওয়েব অ্যাপ্লিকেশন, মোবাইল অ্যাপ (Android ও iOS), ই-কমার্স সলিউশন, এবং কাস্টম সফটওয়্যার ডেভেলপমেন্ট সার্ভিস দিই। React, Next.js, Flutter, Node.js সহ আধুনিক টেকনোলজি ব্যবহার করি।',
  1
);

INSERT OR REPLACE INTO faq (id, question, answer, order_index) VALUES
(
  'faq-002',
  'একটি ওয়েবসাইট বা অ্যাপ বানাতে কত সময় লাগে?',
  'প্রজেক্টের জটিলতা অনুযায়ী সময় ভিন্ন হয়। সাধারণ ওয়েবসাইট ১-২ সপ্তাহ, ই-কমার্স ২-৩ সপ্তাহ, এবং কাস্টম ওয়েব/মোবাইল অ্যাপ ৪-৮ সপ্তাহ সময় নিতে পারে। আমরা এজাইল পদ্ধতিতে কাজ করি তাই প্রতি সপ্তাহে প্রগ্রেস দেখতে পাবেন।',
  2
);

INSERT OR REPLACE INTO faq (id, question, answer, order_index) VALUES
(
  'faq-003',
  'আপনাদের প্রাইসিং কিভাবে কাজ করে?',
  'আমাদের বিভিন্ন প্যাকেজ আছে - বেসিক ওয়েবসাইট ১০,০০০ টাকা থেকে শুরু, বিজনেস ওয়েবসাইট ২৫,০০০ টাকা, মোবাইল অ্যাপ ৮০,০০০ টাকা থেকে শুরু। কাস্টম প্রজেক্টের জন্য বিনামূল্যে কনসালটেশন নিন।',
  3
);

INSERT OR REPLACE INTO faq (id, question, answer, order_index) VALUES
(
  'faq-004',
  'প্রজেক্ট শেষে সাপোর্ট পাব কি?',
  'হ্যাঁ! প্রতিটি প্রজেক্টে ফ্রি সাপোর্ট দেওয়া হয় - বেসিক প্যাকেজে ১ মাস, বিজনেস প্যাকেজে ৩ মাস, এবং প্রিমিয়াম প্যাকেজে ৬ মাস। এরপর মাসিক মেইন্টেন্যান্স প্যাকেজ নিতে পারবেন।',
  4
);

INSERT OR REPLACE INTO faq (id, question, answer, order_index) VALUES
(
  'faq-005',
  'আপনাদের সাথে যোগাযোগ করার সেরা উপায় কী?',
  'ফোন: 01570260118, হোয়াটসঅ্যাপ: 01739416661, ইমেইল: rahmatullahzisan@gmail.com। বিনামূল্যে পরামর্শের জন্য কন্টাক্ট ফর্ম পূরণ করুন অথবা সরাসরি কল করুন।',
  5
);

INSERT OR REPLACE INTO faq (id, question, answer, order_index) VALUES
(
  'faq-1',
  'কোন টেকনোলজি ব্যবহার করেন?',
  'ফ্রন্টএন্ড: React, Next.js, Tailwind CSS। মোবাইল: Flutter, React Native। ব্যাকএন্ড: Node.js, Python। ডেটাবেস: PostgreSQL, MongoDB, Cloudflare D1। হোস্টিং: Cloudflare, Vercel, AWS।',
  6
);

INSERT OR REPLACE INTO faq (id, question, answer, order_index) VALUES
(
  'faq-2',
  'পেমেন্ট পদ্ধতি কি কি?',
  'বিকাশ, নগদ, রকেট এবং ব্যাংক ট্রান্সফার সাপোর্ট করি। ৫০% অগ্রিম এবং বাকি ৫০% প্রজেক্ট ডেলিভারির পর।',
  7
);

INSERT OR REPLACE INTO faq (id, question, answer, order_index) VALUES
(
  'faq-3',
  'সোর্স কোড কি পাব?',
  'হ্যাঁ! প্রজেক্ট শেষে সম্পূর্ণ সোর্স কোড হ্যান্ডওভার করা হয়। GitHub/GitLab এ কোড ট্রান্সফার করে দেওয়া হয়। ডকুমেন্টেশনও দেওয়া হয়।',
  8
);

INSERT OR REPLACE INTO faq (id, question, answer, order_index) VALUES
(
  'faq-4',
  'মোবাইল অ্যাপ কি Android ও iOS দুটোতেই কাজ করবে?',
  'হ্যাঁ! আমরা Flutter বা React Native দিয়ে ক্রস-প্ল্যাটফর্ম অ্যাপ বানাই যা Android ও iOS দুটোতেই কাজ করে। আলাদা আলাদা অ্যাপও বানানো সম্ভব।',
  9
);

INSERT OR REPLACE INTO faq (id, question, answer, order_index) VALUES
(
  'faq-5',
  'হোস্টিং কি আপনারা দেন?',
  'হ্যাঁ! BDIX Cloudflare হোস্টিং সার্ভিস দিই যা বাংলাদেশে সুপার ফাস্ট। ওয়েবসাইট প্যাকেজে ফ্রি হোস্টিং অন্তর্ভুক্ত। SSL সার্টিফিকেটও ফ্রি।',
  10
);

-- =============================================================================
-- Services Data (from src/data/services.ts)
-- =============================================================================
INSERT OR REPLACE INTO services (id, slug, title, tagline, description, icon, features, benefits, order_index) VALUES
(
  'service-001',
  'web-development',
  'স্মার্ট ওয়েবসাইট ও সেলস ফানেল',
  'ওয়েব + ফানেল',
  'আমরা শুধু ওয়েবসাইট বানাই না; আমরা এমন একটি স্বয়ংক্রিয় সিস্টেম তৈরি করি যা আপনার জন্য ২৪/৭ গ্রাহক খুঁজে বের করে, তাদের তথ্য সংগ্রহ করে এবং বিক্রয় নিশ্চিত করে।',
  'FaGlobe',
  '["কনভার্সন-কেন্দ্রিক ল্যান্ডিং পেজ ও ফানেল", "CRM ও অটোমেটেড ফলো-আপ ইন্টিগ্রেশন", "মোবাইল-ফ্রেন্ডলি রেসপন্সিভ ডিজাইন", "দ্রুত লোডিং ও SEO অপটিমাইজড"]',
  '["২৪/৭ অটোমেটেড লিড জেনারেশন", "প্রতিটি ভিজিটরকে কাস্টমারে রূপান্তর", "বিক্রয় বৃদ্ধি ও সময় সাশ্রয়", "প্রফেশনাল ব্র্যান্ড ইমেজ"]',
  1
);

INSERT OR REPLACE INTO services (id, slug, title, tagline, description, icon, features, benefits, order_index) VALUES
(
  'service-002',
  'facebook-automation',
  'সম্পূর্ণ ফেসবুক পেজ ম্যানেজমেন্ট',
  'পেজ ম্যানেজমেন্ট',
  'পেজ সেটআপ থেকে কনটেন্ট তৈরি, নিয়মিত পোস্টিং, বিজ্ঞাপন পরিচালনা এবং মেসেজ অটোমেশন পর্যন্ত ফেসবুকের সকল দায়িত্ব আমাদের।',
  'FaFacebook',
  '["ব্র্যান্ডেড কনটেন্ট ক্যালেন্ডার ও ক্রিয়েটিভ ডিজাইন", "ইনবক্স, কমেন্ট ও বিজ্ঞাপন ব্যবস্থাপনা", "নিয়মিত পোস্টিং ও এনগেজমেন্ট", "পারফরম্যান্স রিপোর্টিং"]',
  '["সময় ও শ্রম সাশ্রয়", "ধারাবাহিক ব্র্যান্ড প্রেজেন্স", "বেশি এনগেজমেন্ট ও রিচ", "প্রফেশনাল সোশ্যাল মিডিয়া ইমেজ"]',
  2
);

INSERT OR REPLACE INTO services (id, slug, title, tagline, description, icon, features, benefits, order_index) VALUES
(
  'service-003',
  'ai-chatbot',
  '২৪/৭ AI সেলস এজেন্ট',
  'এআই সেলস',
  'ছুটির দিনে বা গভীর রাতেও কোনো গ্রাহককে আর অপেক্ষা করতে হবে না। আমাদের AI এজেন্ট তাৎক্ষণিক উত্তর দিয়ে প্রতিটি সুযোগকে বিক্রিতে রূপান্তর করে।',
  'FaRobot',
  '["তাৎক্ষণিক কথোপকথন ও ফলো-আপ", "সেলস টিমের জন্য লিড হস্তান্তর ও রিপোর্টিং", "মেসেঞ্জার, ওয়েবসাইট ও হোয়াটসঅ্যাপ সাপোর্ট", "কাস্টম ট্রেইনড AI মডেল"]',
  '["২৪/৭ গ্রাহক সেবা", "কোনো লিড মিস নয়", "দ্রুত রেসপন্স টাইম", "স্কেলেবল সেলস সলিউশন"]',
  3
);

INSERT OR REPLACE INTO services (id, slug, title, tagline, description, icon, features, benefits, order_index) VALUES
(
  'service-004',
  'digital-marketing',
  'ডিজিটাল মার্কেটিং ও বিজ্ঞাপন',
  'ডেটা গ্রোথ',
  'অনুমানের ওপর ভিত্তি করে আর মার্কেটিং নয়। আমরা ডেটা বিশ্লেষণ করে এমন বিজ্ঞাপন ও SEO কৌশল তৈরি করি যা প্রতিটি টাকায় সর্বোচ্চ লাভ নিশ্চিত করে।',
  'FaBullhorn',
  '["ডেটা-চালিত বিজ্ঞাপন ও SEO কৌশল", "মাসিক ROI বিশ্লেষণ ও স্ট্র্যাটেজি আপডেট", "টার্গেটেড ফেসবুক ও গুগল অ্যাডস", "কম্পিটিটর অ্যানালাইসিস"]',
  '["সর্বোচ্চ ROI", "টার্গেটেড রিচ", "কম খরচে বেশি ফলাফল", "ডেটা-ড্রিভেন সিদ্ধান্ত"]',
  4
);

INSERT OR REPLACE INTO services (id, slug, title, tagline, description, icon, features, benefits, order_index) VALUES
(
  'service-005',
  'mobile-app',
  'মোবাইল অ্যাপ ডেভেলপমেন্ট',
  'অ্যাপ ডেভ',
  'আপনার ব্যবসার জন্য কাস্টম মোবাইল অ্যাপ। Android ও iOS প্ল্যাটফর্মে আপনার গ্রাহকদের হাতে পৌঁছান। আধুনিক প্রযুক্তি ও সুন্দর ডিজাইন দিয়ে তৈরি।',
  'FaMobileAlt',
  '["Android ও iOS অ্যাপ ডেভেলপমেন্ট", "React Native / Flutter", "কাস্টম UI/UX ডিজাইন", "API ইন্টিগ্রেশন ও ব্যাকএন্ড"]',
  '["গ্রাহকদের হাতের মুঠোয়", "ব্র্যান্ড ভ্যালু বৃদ্ধি", "২৪/৭ অ্যাক্সেসিবিলিটি", "পুশ নোটিফিকেশন মার্কেটিং"]',
  5
);

-- =============================================================================
-- Pricing Data (IT Agency Packages)
-- =============================================================================

-- Delete existing pricing data
DELETE FROM pricing;

-- Add total_value column if not exists (will be ignored if exists)
-- Note: Run this separately if needed: ALTER TABLE pricing ADD COLUMN total_value TEXT;

-- ===== ওয়েবসাইট ডেভেলপমেন্ট প্যাকেজ =====
INSERT INTO pricing (id, name, price, total_value, period, description, features, popular, order_index) VALUES
(
  'pricing-001',
  'বেসিক ওয়েবসাইট',
  '১০,০০০',
  '৫৬,০০০',
  'একবার',
  'ছোট ব্যবসা ও পার্সনাল ব্র্যান্ডের জন্য',
  '[{"name": "৫ পেজ রেস্পন্সিভ ওয়েবসাইট", "value": "৮,০০০"}, {"name": "মোবাইল ফ্রেন্ডলি ডিজাইন", "value": "৩,০০০"}, {"name": "**বেসিক ই-কমার্স**", "value": "১০,০০০"}, {"name": "কন্টাক্ট ফর্ম ইন্টিগ্রেশন", "value": "২,০০০"}, {"name": "বেসিক SEO সেটআপ", "value": "৩,০০০"}, {"name": "**মোবাইল অ্যাপ**", "value": "১৫,০০০"}, {"name": "**BDIX Cloudflare হোস্টিং**", "value": "৮,০০০"}, {"name": "১ মাস ফ্রি সাপোর্ট", "value": "৩,০০০"}]',
  0,
  1
);

INSERT INTO pricing (id, name, price, total_value, period, description, features, popular, order_index) VALUES
(
  'pricing-002',
  'বিজনেস ওয়েবসাইট',
  '২৫,০০০',
  '১,০৬,০০০',
  'একবার',
  'প্রফেশনাল বিজনেস ও ই-কমার্সের জন্য',
  '[{"name": "১০+ পেজ কাস্টম ওয়েবসাইট", "value": "১৫,০০০"}, {"name": "অ্যাডমিন প্যানেল (CMS)", "value": "৮,০০০"}, {"name": "**ফুল ই-কমার্স**", "value": "১৫,০০০"}, {"name": "পেমেন্ট গেটওয়ে ইন্টিগ্রেশন", "value": "৫,০০০"}, {"name": "**AI Chatbot ইন্টিগ্রেশন**", "value": "১০,০০০"}, {"name": "**সার্ভার সাইড ট্র্যাকিং**", "value": "৮,০০০"}, {"name": "**Facebook Pixel সেটআপ**", "value": "৫,০০০"}, {"name": "অ্যাডভান্সড SEO", "value": "৫,০০০"}, {"name": "**মোবাইল অ্যাপ**", "value": "১৫,০০০"}, {"name": "**BDIX Cloudflare হোস্টিং**", "value": "১০,০০০"}, {"name": "৩ মাস ফ্রি সাপোর্ট", "value": "৩,০০০"}]',
  1,
  2
);

INSERT INTO pricing (id, name, price, total_value, period, description, features, popular, order_index) VALUES
(
  'pricing-003',
  'প্রিমিয়াম ওয়েবসাইট',
  '৮০,০০০',
  '১,৫৩,০০০',
  'একবার',
  'বড় ব্যবসা ও ই-কমার্স স্টোরের জন্য',
  '[{"name": "আনলিমিটেড পেজ", "value": "২৫,০০০"}, {"name": "অ্যাডভান্সড অ্যাডমিন প্যানেল", "value": "১৫,০০০"}, {"name": "**ফুল ই-কমার্স সিস্টেম**", "value": "২০,০০০"}, {"name": "মাল্টিপল পেমেন্ট গেটওয়ে", "value": "১০,০০০"}, {"name": "**AI Chatbot ইন্টিগ্রেশন**", "value": "১৫,০০০"}, {"name": "**সার্ভার সাইড ট্র্যাকিং**", "value": "৮,০০০"}, {"name": "**Facebook Pixel সেটআপ**", "value": "৫,০০০"}, {"name": "অর্ডার ট্র্যাকিং সিস্টেম", "value": "৭,০০০"}, {"name": "**মোবাইল অ্যাপ**", "value": "১৫,০০০"}, {"name": "**প্রিমিয়াম BDIX Cloudflare হোস্টিং**", "value": "১৫,০০০"}, {"name": "৬ মাস ফ্রি সাপোর্ট", "value": "৫,০০০"}]',
  0,
  3
);

-- ===== ওয়েব অ্যাপ্লিকেশন প্যাকেজ =====
INSERT INTO pricing (id, name, price, total_value, period, description, features, popular, order_index) VALUES
(
  'pricing-004',
  'স্ট্যান্ডার্ড ওয়েব অ্যাপ',
  '৫০,০০০',
  '১,১০,০০০',
  'একবার',
  'কাস্টম ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট',
  '[{"name": "কাস্টম ওয়েব অ্যাপ্লিকেশন", "value": "২৫,০০০"}, {"name": "ইউজার অথেন্টিকেশন সিস্টেম", "value": "১০,০০০"}, {"name": "ড্যাশবোর্ড ও রিপোর্টিং", "value": "১৫,০০০"}, {"name": "ডেটাবেস ইন্টিগ্রেশন", "value": "১০,০০০"}, {"name": "API ডেভেলপমেন্ট", "value": "১০,০০০"}, {"name": "**মোবাইল অ্যাপ**", "value": "৩০,০০০"}, {"name": "রেস্পন্সিভ ডিজাইন", "value": "৫,০০০"}, {"name": "সিকিউরিটি ফিচার", "value": "৫,০০০"}]',
  0,
  4
);

INSERT INTO pricing (id, name, price, total_value, period, description, features, popular, order_index) VALUES
(
  'pricing-005',
  'এন্টারপ্রাইজ ওয়েব অ্যাপ',
  '১,৫০,০০০',
  '৩,১০,০০০',
  'একবার',
  'বড় প্রতিষ্ঠানের জন্য স্কেলেবল সলিউশন',
  '[{"name": "মাল্টি-ইউজার সিস্টেম", "value": "৪০,০০০"}, {"name": "অ্যাডভান্সড অ্যাডমিন প্যানেল", "value": "৩০,০০০"}, {"name": "থার্ড পার্টি API ইন্টিগ্রেশন", "value": "২৫,০০০"}, {"name": "রিয়েল-টাইম নোটিফিকেশন", "value": "১৫,০০০"}, {"name": "অটোমেশন ফিচার", "value": "২০,০০০"}, {"name": "সিকিউরিটি অডিট", "value": "২০,০০০"}, {"name": "**মোবাইল অ্যাপ**", "value": "৩০,০০০"}, {"name": "স্কেলেবল আর্কিটেকচার", "value": "৫০,০০০"}, {"name": "৬ মাস ফ্রি মেইন্টেনেন্স", "value": "৬০,০০০"}]',
  1,
  5
);

-- ===== মোবাইল অ্যাপ প্যাকেজ =====
INSERT INTO pricing (id, name, price, total_value, period, description, features, popular, order_index) VALUES
(
  'pricing-006',
  'বেসিক মোবাইল অ্যাপ',
  '৩০,০০০',
  '১,০০,০০০',
  'একবার',
  'Android অথবা iOS অ্যাপ ডেভেলপমেন্ট',
  '[{"name": "সিঙ্গেল প্ল্যাটফর্ম (Android/iOS)", "value": "৩০,০০০"}, {"name": "কাস্টম UI/UX ডিজাইন", "value": "২৫,০০০"}, {"name": "ইউজার অথেন্টিকেশন", "value": "১৫,০০০"}, {"name": "পুশ নোটিফিকেশন", "value": "১০,০০০"}, {"name": "API ইন্টিগ্রেশন", "value": "২০,০০০"}, {"name": "অ্যাপ স্টোর সাবমিশন", "value": "১০,০০০"}, {"name": "৩ মাস ফ্রি বাগ ফিক্স", "value": "৪০,০০০"}]',
  1,
  6
);

INSERT INTO pricing (id, name, price, total_value, period, description, features, popular, order_index) VALUES
(
  'pricing-007',
  'অ্যাডভান্সড মোবাইল অ্যাপ',
  '৮০,০০০',
  '১,৮০,০০০',
  'একবার',
  'Android + iOS উভয় প্ল্যাটফর্ম',
  '[{"name": "Android ও iOS উভয় প্ল্যাটফর্ম", "value": "৬০,০০০"}, {"name": "React Native / Flutter", "value": "৩০,০০০"}, {"name": "অফলাইন ফাংশনালিটি", "value": "২০,০০০"}, {"name": "পেমেন্ট ইন্টিগ্রেশন", "value": "২৫,০০০"}, {"name": "সোশ্যাল লগইন", "value": "১৫,০০০"}, {"name": "অ্যানালিটিক্স ড্যাশবোর্ড", "value": "২০,০০০"}, {"name": "উভয় স্টোরে সাবমিশন", "value": "১০,০০০"}, {"name": "৬ মাস ফ্রি সাপোর্ট", "value": "৪০,০০০"}]',
  0,
  7
);

-- ===== সফটওয়্যার ডেভেলপমেন্ট =====
INSERT INTO pricing (id, name, price, period, description, features, popular, order_index) VALUES
(
  'pricing-008',
  'কাস্টম সফটওয়্যার',
  'আলোচনা সাপেক্ষে',
  '',
  'আপনার বিজনেসের জন্য কাস্টম সফটওয়্যার',
  '["রিকোয়ারমেন্ট অ্যানালাইসিস", "কাস্টম বিজনেস লজিক", "ইন্টিগ্রেশন সার্ভিস", "ডেটা মাইগ্রেশন", "ইউজার ট্রেনিং", "সোর্স কোড হ্যান্ডওভার", "মেইন্টেনেন্স কন্ট্রাক্ট", "SLA সাপোর্ট"]',
  0,
  8
);

-- ===== ডিজিটাল মার্কেটিং প্যাকেজ =====
INSERT INTO pricing (id, name, price, total_value, period, description, features, popular, order_index) VALUES
(
  'pricing-009',
  'স্টার্টার মার্কেটিং',
  '১৫,০০০',
  '২৮,০০০',
  'মাস',
  'ডিজিটাল মার্কেটিং শুরু করতে চান',
  '[{"name": "ফেসবুক পেজ ম্যানেজমেন্ট", "value": "৮,০০০"}, {"name": "মাসিক ১২টি পোস্ট", "value": "৬,০০০"}, {"name": "বেসিক গ্রাফিক ডিজাইন", "value": "৪,০০০"}, {"name": "ফেসবুক অ্যাড ম্যানেজমেন্ট", "value": "৫,০০০"}, {"name": "মাসিক রিপোর্ট", "value": "২,০০০"}, {"name": "ইনবক্স রিপ্লাই সাপোর্ট", "value": "৩,০০০"}]',
  0,
  9
);

INSERT INTO pricing (id, name, price, total_value, period, description, features, popular, order_index) VALUES
(
  'pricing-010',
  'গ্রোথ মার্কেটিং',
  '৩০,০০০',
  '৫৫,০০০',
  'মাস',
  'সম্পূর্ণ ডিজিটাল মার্কেটিং সার্ভিস',
  '[{"name": "মাল্টি-প্ল্যাটফর্ম ম্যানেজমেন্ট", "value": "১২,০০০"}, {"name": "মাসিক ২৫+ কন্টেন্ট", "value": "১০,০০০"}, {"name": "ভিডিও এডিটিং", "value": "৮,০০০"}, {"name": "সম্পূর্ণ অ্যাড ম্যানেজমেন্ট", "value": "৮,০০০"}, {"name": "SEO অপটিমাইজেশন", "value": "৭,০০০"}, {"name": "ইমেইল মার্কেটিং", "value": "৫,০০০"}, {"name": "লিড জেনারেশন", "value": "৫,০০০"}]',
  1,
  10
);

INSERT INTO pricing (id, name, price, total_value, period, description, features, popular, order_index) VALUES
(
  'pricing-011',
  'প্রিমিয়াম মার্কেটিং',
  '৬০,০০০',
  '১,১০,০০০',
  'মাস',
  'এন্টারপ্রাইজ লেভেল মার্কেটিং সলিউশন',
  '[{"name": "ডেডিকেটেড মার্কেটিং টিম", "value": "২৫,০০০"}, {"name": "ব্র্যান্ড স্ট্র্যাটেজি", "value": "১৫,০০০"}, {"name": "ইনফ্লুয়েন্সার মার্কেটিং", "value": "২০,০০০"}, {"name": "Google Ads ম্যানেজমেন্ট", "value": "১৫,০০০"}, {"name": "কনভার্সেশন রেট অপটিমাইজেশন", "value": "১০,০০০"}, {"name": "A/B টেস্টিং", "value": "৫,০০০"}, {"name": "কম্পিটিটর অ্যানালাইসিস", "value": "১০,০০০"}, {"name": "২৪/৭ সাপোর্ট", "value": "১০,০০০"}]',
  0,
  11
);

-- =============================================================================
-- Jobs/Career Positions Data
-- =============================================================================

-- Delete existing jobs
DELETE FROM jobs;

INSERT INTO jobs (id, slug, title, department, type, location, description, responsibilities, requirements, salary_range, is_active, order_index) VALUES
(
  'job-001',
  'junior-social-media-manager',
  'Junior Social Media Manager (Entry Level)',
  'Marketing',
  'Part-time / Remote',
  'Remote',
  'We need a Junior SMM for our IT Services (Website/Web App/Mobile App). Tasks are basic, we provide templates + guidelines. Low budget (starting) - will increase based on performance.',
  '["AI দিয়ে সপ্তাহে কয়েক দিন পোস্ট/স্টোরি শিডিউল করা", "ইনবক্স/WhatsApp রিপ্লাই দেওয়া (স্ক্রিপ্ট দেওয়া হবে)", "গুগল শীটে লিড লিস্ট আপডেট করা + ফলো-আপ মেসেজ পাঠানো"]',
  '["বেসিক AI জ্ঞান", "নিয়মিত কাজ করার ইচ্ছা", "ভালো কমিউনিকেশন স্কিল", "প্রতিদিন কিছু সময় দিতে পারা (Part-time)"]',
  'শুরুতে কম, পারফরম্যান্স অনুযায়ী বাড়বে',
  1,
  1
);
