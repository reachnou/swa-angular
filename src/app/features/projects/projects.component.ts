import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf, NgOptimizedImage } from '@angular/common';


export type ProjectLink = {
  live?: string;
  github?: string;
  doc?: string;
};


export type Project = {
  id: string | number;
  title: string;
  description: string;
  imageUrl?: string; // optional banner image
  tags?: string[]; // short badges
  tech?: string[]; // e.g., ["Angular", ".NET", "SQL"]
  links?: ProjectLink; // actions
  highlight?: boolean; // slightly accent the card
};


@Component({
  selector: 'app-project-grid',
  standalone: true,
  imports: [NgFor, NgIf, NgOptimizedImage],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  @Input() heading = 'Featured Projects';
  @Input() subheading = 'The collection of projects I found interesting to build.';
  @Input() projects: Project[] = demoProjects; // replace at runtime
}


// ---- Demo data (remove in production) ----
export const demoProjects: Project[] = [
  {
    id: 'wms',
    title: 'Warehouse Management Platform',
    description: 'Event‑driven WMS built with .NET + Angular. CQRS, DDD, Kafka streams, and observability baked in.',
    imageUrl: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1600&auto=format&fit=crop',
    tags: ['Microservices', 'Kafka', 'DDD'],
    tech: ['Angular', '.NET', 'SQL', 'Azure'],
    links: { live: '#', github: '#' },
    // highlight: true
  },
  {
    id: 'ims',
    title: 'Inventory Service API',
    description: 'High‑throughput REST API with EF Core + Dapper hybrid and Redis caching.',
    imageUrl: 'https://myhfa.org/wp-content/uploads/2022/04/Make-Inventory-Control-Your-competitive-advantage_blog-image.jpg',
    tags: ['API', 'Caching'],
    tech: ['ASP.NET Core', 'Dapper', 'Redis'],
    links: { github: '#', doc: '#' },
    // highlight: true
  },
  {
    id: 'portfolio',
    title: 'Wow Portfolio',
    description: 'SSR Angular portfolio with playful animations, a11y, and blazing Lighthouse scores.',
  },
  {
    id: 'ims',
    title: 'Inventory Service API',
    description: 'High‑throughput REST API with EF Core + Dapper hybrid and Redis caching.',
    imageUrl: 'https://myhfa.org/wp-content/uploads/2022/04/Make-Inventory-Control-Your-competitive-advantage_blog-image.jpg',
    tags: ['API', 'Caching'],
    tech: ['ASP.NET Core', 'Dapper', 'Redis'],
    links: { github: '#', doc: '#' }
  }
];