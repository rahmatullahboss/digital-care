export interface Service {
    id: string;
    slug: string;
    title: string;
    tagline?: string;
    description?: string;
    icon?: string;
    features: string; // JSON string in DB
    benefits: string; // JSON string in DB
    order_index: number;
    created_at: string;
    updated_at: string;
}

export interface Post {
    id: string;
    slug: string;
    title: string;
    title_en?: string;
    excerpt?: string;
    excerpt_en?: string;
    content: string;
    content_en?: string;
    image_url?: string;
    published: number; // 0 or 1
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: string;
    package_name: string;
    price: string;
    name: string;
    phone: string;
    email?: string;
    company_name?: string;
    message?: string;
    status: string;
    created_at: string;
}

export interface PricingPackage {
    id: string;
    name: string;
    price: string;
    total_value?: string; // Total value of all features (for discount display)
    period?: string;
    description?: string;
    features: Array<string | { name: string; value?: string }>; // Parsed from JSON
    popular: number; // 0 or 1
    order_index: number;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    order_index: number;
}

export interface Job {
    id: string;
    slug: string;
    title: string;
    title_bn: string | null;
    department: string | null;
    department_bn: string | null;
    type: string | null;
    type_bn: string | null;
    location: string | null;
    location_bn: string | null;
    description: string | null;
    description_bn: string | null;
    responsibilities: string[];
    responsibilities_bn: string[];
    requirements: string[];
    requirements_bn: string[];
    salary_range: string | null;
    salary_range_bn: string | null;
    is_active: number;
    order_index: number;
}

export interface CareerApplication {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    cv_link?: string;
    message?: string;
    status: string; // 'pending', 'reviewed', 'hired', 'rejected'
    created_at: string;
}

export interface SiteSettings {
    id: number;
    phone?: string;
    email?: string;
    address?: string;
    facebook_url?: string;
    linkedin_url?: string;
    youtube_url?: string;
    updated_at?: string;
}


import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getD1Database() {
    const { env } = await getCloudflareContext({ async: true });
    return env.DB;
}
