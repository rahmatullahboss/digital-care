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
    excerpt?: string;
    content: string;
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
    period?: string;
    description?: string;
    features: string; // JSON string in DB
    popular: number; // 0 or 1
    order_index: number;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    order_index: number;
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
