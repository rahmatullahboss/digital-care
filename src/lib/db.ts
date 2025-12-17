import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getD1Database() {
    const { env } = await getCloudflareContext();
    return env.DB;
}

// Types for database entities
export interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    image_url: string | null;
    published: number;
    created_at: string;
    updated_at: string;
}

export interface Service {
    id: string;
    slug: string;
    title: string;
    tagline: string | null;
    description: string | null;
    icon: string | null;
    features: string | null;
    benefits: string | null;
    order_index: number;
}

export interface Pricing {
    id: string;
    name: string;
    price: string;
    period: string | null;
    description: string | null;
    features: string | null;
    popular: number;
    order_index: number;
}

export interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    message: string;
    status: string;
    created_at: string;
}

export interface Affiliate {
    id: string;
    name: string;
    email: string;
    phone: string;
    promotion_strategy: string | null;
    status: string;
    created_at: string;
}

export interface Settings {
    id: number;
    phone: string | null;
    email: string | null;
    address: string | null;
    facebook_url: string | null;
    linkedin_url: string | null;
    youtube_url: string | null;
    updated_at: string;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    order_index: number;
}

export interface User {
    id: string;
    email: string;
    password_hash: string;
    name: string | null;
    role: string;
    created_at: string;
}
