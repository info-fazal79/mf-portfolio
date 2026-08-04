/**
 * Next.js Frontend - PHP API Communication Layer
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  screenshots: string[];
  tech_stack: string[];
  live_link?: string;
  github_link?: string;
  created_at: string;
}

export interface EBook {
  id: number;
  title: string;
  image: string;
  status: 'free' | 'paid';
  regular_price: number;
  offer_price: number;
  created_at: string;
}

export interface SiteSettings {
  site_logo?: string;
  logo_width?: string;
  logo_height?: string;
  social_linkedin?: string;
  social_github?: string;
  seo_title?: string;
  seo_description?: string;
  hero_typing_text?: string[];
  hero_cv_path?: string;
  whatsapp_free_redirect?: string;
}

/**
 * Fetch projects from PHP API
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api.php?endpoint=projects`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch projects');
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("API error fetching projects:", error);
    return [];
  }
}

/**
 * Fetch E-Books from PHP API
 */
export async function getEbooks(): Promise<EBook[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api.php?endpoint=ebooks`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch ebooks');
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (error) {
    console.error("API error fetching ebooks:", error);
    return [];
  }
}

/**
 * Fetch general site settings
 */
export async function getSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(`${API_BASE_URL}/api.php?endpoint=settings`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch settings');
    const json = await res.json();
    return json.success ? json.data : {};
  } catch (error) {
    console.error("API error fetching settings:", error);
    return {};
  }
}

/**
 * Submit dynamic consultation request
 */
export async function submitConsultation(name: string, email: string, message: string): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api.php?endpoint=consultation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    return await res.json();
  } catch (error) {
    console.error("API submission error:", error);
    return { success: false, error: "Network connection failure. Please try again later." };
  }
}
