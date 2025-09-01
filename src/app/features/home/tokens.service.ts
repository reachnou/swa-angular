// tokens.service.ts
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface OutputToken {
    name: string;
    icon: SafeHtml;
    delay: number; // seconds
}

@Injectable({ providedIn: 'root' })
export class TokensService {
    constructor(private sanitizer: DomSanitizer) { }

    getTokens(): OutputToken[] {
        const baseTokens = [
            { name: 'RESTful APIs', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#a63ad9" d="M26 22a3.86 3.86 0 0 0-2 .57l-3.09-3.1a6 6 0 0 0 0-6.94L24 9.43a3.86 3.86 0 0 0 2 .57a4 4 0 1 0-4-4a3.86 3.86 0 0 0 .57 2l-3.1 3.09a6 6 0 0 0-6.94 0L9.43 8A3.86 3.86 0 0 0 10 6a4 4 0 1 0-4 4a3.86 3.86 0 0 0 2-.57l3.09 3.1a6 6 0 0 0 0 6.94L8 22.57A3.86 3.86 0 0 0 6 22a4 4 0 1 0 4 4a3.86 3.86 0 0 0-.57-2l3.1-3.09a6 6 0 0 0 6.94 0l3.1 3.09a3.86 3.86 0 0 0-.57 2a4 4 0 1 0 4-4m0-18a2 2 0 1 1-2 2a2 2 0 0 1 2-2M4 6a2 2 0 1 1 2 2a2 2 0 0 1-2-2m2 22a2 2 0 1 1 2-2a2 2 0 0 1-2 2m10-8a4 4 0 1 1 4-4a4 4 0 0 1-4 4m10 8a2 2 0 1 1 2-2a2 2 0 0 1-2 2"/></svg>' },
            { name: 'Unit Test', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#24c1ac" d="M20 4v2h-2v4.531l.264.461l7.473 13.078a2 2 0 0 1 .263.992V26a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-.938a2 2 0 0 1 .264-.992l7.473-13.078l.263-.46V6h-2V4zm0-2h-8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2v2L4.527 23.078A4 4 0 0 0 4 25.062V26a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4v-.938a4 4 0 0 0-.527-1.984L20 10V8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"/><circle cx="17" cy="17" r="1" fill="#24c1ac"/><path fill="#24c1ac" d="M19.72 20.715a1 1 0 0 0-1.134-.318a5 5 0 0 1-1.18.262a3.95 3.95 0 0 1-1.862-.292a2.74 2.74 0 0 0-3.371.489a2 2 0 0 0-.237.35L10 24h12Z"/></svg>' },
            { name: 'Microservices', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#13ac14" d="m11 21l-4-2.2v-4.5l4-2.2l4 2.2v4.5zm-2-3.4l2 1.1l2-1.1v-2.2l-2-1.1l-2 1.1zM6 30l-4-2.2v-4.5L6 21l4 2.2v4.5zm-2-3.4l2 1.1l2-1.1v-2.2l-2-1.1l-2 1.1zM16 30l-4-2.2v-4.5l4-2.2l4 2.2v4.5zm-2-3.4l2 1.1l2-1.1v-2.2l-2-1.1l-2 1.1zM26 30l-4-2.2v-4.5l4-2.2l4 2.2v4.5zm-2-3.4l2 1.1l2-1.1v-2.2l-2-1.1l-2 1.1zm.6-15L22 14.2V9.4l3-1.7V3.2L21 1l-4 2.2v4.5l3 1.7v4.7l-2.6-2.6L16 13l5 5l5-5zM19 4.4l2-1.1l2 1.1v2.2l-2 1.1l-2-1.1z"/><path fill="none" d="M0 0h32v32H0z"/></svg>' },
            { name: 'SPA', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#ff7d3e" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 2.25h18s1.5 0 1.5 1.5v16.5s0 1.5-1.5 1.5H3s-1.5 0-1.5-1.5V3.75s0-1.5 1.5-1.5m-1.5 4.5h21M9 6.75v15m0-7.5h13.5"/></svg>' },
            { name: 'CI/CD', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path fill="#ee366d" d="M23.53 19.81a7.5 7.5 0 0 1-1.65-.18a10.5 10.5 0 0 1 .72 2.13h.93a9.5 9.5 0 0 0 3-.49l-.93-1.81a7.7 7.7 0 0 1-2.07.35m-5.17-1.94l-.36-.38a7.4 7.4 0 0 1-2.2-5.92a7.3 7.3 0 0 1 1.54-4L17.26 9a1 1 0 0 0 .91 1h.09a1 1 0 0 0 1-.91L19.6 5a1 1 0 0 0-.29-.79a1 1 0 0 0-.79-.21l-4.09.35a1 1 0 0 0 .17 2l1.29-.11a9.45 9.45 0 0 0-2.05 5.32a9.28 9.28 0 0 0 2.67 7.26l.31.37a7.33 7.33 0 0 1 2.06 4.91a7.4 7.4 0 0 1-.26 2.47l1.8.91a8.8 8.8 0 0 0 .45-3.51a9.28 9.28 0 0 0-2.51-6.1m14.04.04l-1.21.09a9.65 9.65 0 0 0-7.66-15.55a9.3 9.3 0 0 0-3 .49l.91 1.8a7.67 7.67 0 0 1 9.76 7.39a7.58 7.58 0 0 1-1.65 4.72l.1-1.54a1 1 0 1 0-2-.13l-.28 4.08a1 1 0 0 0 .31.78a.94.94 0 0 0 .69.28h.1l4.08-.42a1 1 0 0 0 .9-1.1a1 1 0 0 0-1.05-.89M4.07 20.44h.08l4.09-.35a1 1 0 1 0-.17-2l-1.39.12a7.63 7.63 0 0 1 4.52-1.49a8 8 0 0 1 1.63.18a10.2 10.2 0 0 1-.71-2.13h-.92a9.66 9.66 0 0 0-5.9 2l.12-1.31a1 1 0 0 0-.92-1.08a1 1 0 0 0-1.08.91l-.35 4.08a1 1 0 0 0 1 1.08Zm14.35 7.79l-4.09.27a1 1 0 0 0 .13 2l1.54-.11a7.71 7.71 0 0 1-12.54-6a7.6 7.6 0 0 1 .29-2L2 21.46a9.6 9.6 0 0 0-.47 2.95A9.7 9.7 0 0 0 17.19 32l-.12 1.18a1 1 0 0 0 .89 1.1h.11a1 1 0 0 0 1-.9l.42-4.06a1 1 0 0 0-1.06-1.1Z"/></svg>' },
            { name: 'Deployment', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#799499" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.59 14.37q.159.666.16 1.38a6 6 0 0 1-6 6v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.9 14.9 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.9 14.9 0 0 0-2.58 5.84m2.699 2.7q-.155.032-.311.06a15 15 0 0 1-2.448-2.448l.06-.312m-2.24 2.39a4.49 4.49 0 0 0-1.757 4.306q.341.054.696.054a4.5 4.5 0 0 0 3.61-1.812M16.5 9a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"/></svg>' },
            { name: 'Web Application', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="none" stroke="#1cb3d0" stroke-width="3"><path stroke-linejoin="round" d="M3 24a21 21 0 1 0 42 0a21 21 0 1 0-42 0"/><path stroke-linejoin="round" d="M15 24a9 21 0 1 1 18 0a9 21 0 1 1-18 0"/><path stroke-linecap="round" d="M4.5 31h39m-39-14h39"/></g></svg>'},
            { name: 'AI', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#3ee0ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 4.5a3 3 0 0 0-2.567 4.554a3.001 3.001 0 0 0 0 5.893M7 4.5a2.5 2.5 0 0 1 5 0v15a2.5 2.5 0 0 1-5 0a3 3 0 0 1-2.567-4.553M7 4.5c0 .818.393 1.544 1 2m-3.567 8.447A3 3 0 0 1 6 13.67m13.25-8.92L17 7h-2m3.5-2.25a.75.75 0 1 0 1.5 0a.75.75 0 0 0-1.5 0m.75 14.5L17 17h-2m3.5 2.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0m.75-7.25H15m3.5 0a.75.75 0 1 0 1.5 0a.75.75 0 0 0-1.5 0"/></svg>'}
        ];

        return baseTokens.map((t, index) => {
            const sizedSvg = t.icon.replace('<svg ', '<svg width="100" height="100" ');
            return {
                name: t.name,
                icon: this.sanitizer.bypassSecurityTrustHtml(sizedSvg),
                delay: Number((index * 0.8).toFixed(1))
            };
        });
    }
}
