export interface Experience {
    id: string;              // unique id
    company: string;
    role: string;
    period: string;          // e.g., "Jan 2022 – Present"
    location?: string;       // optional
    bullets?: string[];      // responsibilities/achievements
    tags?: string[];         // tech stack, keywords
    logoUrl?: string;        // company/logo
    link?: string;           // company or project link
}
