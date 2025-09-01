import { Component } from '@angular/core';
import { ExperienceGridComponent } from './experience-grid.component';
import { Experience } from 'src/app/shared/models/experience.model';
@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [ExperienceGridComponent],
  templateUrl: './experience.component.html'
})
export class ExperienceComponent {
  items: Experience[] = [
    {
      id: 'uwm',
      company: 'United Wholesale Mortgage',
      role: 'Senior .NET Full-Stack Developer',
      period: 'Apr 2023 – Aug 2025',
      location: 'Pontiac, MI (Hybrid)',
      bullets: [
        'Built scalable .NET + Angular features for enterprise apps used by 5k+ internal users.',
        'Led migration to Azure App Services; introduced CI/CD with staged blue-green deployments.',
        'Improved query latency 40% with targeted indexes & Dapper micro-optimizations.'
      ],
      tags: ['C#', '.NET 8', 'Angular 17', 'Azure', 'SQL Server', 'Dapper', 'EF Core'],
      logoUrl: 'https://dummyimage.com/80x80/111/fff&text=U', // replace with your asset
      link: 'https://www.uwm.com/'
    },
    {
      id: 'wms',
      company: 'WMS (Personal Project)',
      role: 'Architect & Developer',
      period: 'Jan 2024 – Present',
      location: 'Remote',
      bullets: [
        'Domain-Driven Design across Inventory/Warehouse/Delivery bounded contexts.',
        'Event-driven workflows with Kafka; CQRS read models for responsive dashboards.',
        'Clean API surface + end-to-end tests; containerized with docker-compose.'
      ],
      tags: ['DDD', 'CQRS', 'Kafka', '.NET API', 'Angular', 'Docker', 'SQL'],
      logoUrl: 'https://dummyimage.com/80x80/1a73e8/ffffff&text=W',
      link: '#'
    },
    {
      id: 'eclinical',
      company: 'eClinical Solutions',
      role: 'Full-Stack Engineer',
      period: 'Aug 2022 – Mar 2023',
      location: 'Remote',
      bullets: [
        'Enhanced Angular portal UX with lazy routes and route-level preloading.',
        'Refactored EF queries, added caching; shaved ~30% from hot endpoints.',
        'Paired with QA to automate happy-path regression tests.'
      ],
      tags: ['Angular', 'RxJS', '.NET 7', 'EF Core', 'CI/CD'],
      logoUrl: 'https://dummyimage.com/80x80/14e4b5/001122&text=eC',
      link: 'https://www.eclinicalsol.com/'
    }
  ];
}
