import { Component } from '@angular/core';
import { SkillGridComponent, type SkillItem } from './skill-grid.component';

@Component({
  selector: 'app-skill-demo',
  standalone: true,
  imports: [SkillGridComponent],
  template: `
    <app-skill-grid
      [title]="'Technical Skills'"
      [subtitle]="'Focused on modern .NET + Angular with cloud experience.'"
      [skills]="skills"
      [showFilters]="true"
      [showMeters]="true"
      [showYears]="true"
      [initialCategory]="'Frontend'">
    </app-skill-grid>
  `,
})
export class SkillsComponent {
  skills: SkillItem[] = [
    { id: 1, name: 'Angular', level: 5, years: 4, category: 'Frontend', keywords: ['RxJS', 'Standalone', 'SSR'], colorHint: '#C3002F' },
    { id: 2, name: 'TypeScript', level: 5, years: 5, category: 'Frontend', keywords: ['Generics', 'Typesafe'] },
    { id: 3, name: 'C# / .NET', level: 5, years: 6, category: 'Backend', keywords: ['ASP.NET Core', 'EF Core', 'DDD'], colorHint: '#512BD4' },
    { id: 4, name: 'SQL Server', level: 4, years: 5, category: 'Data', keywords: ['Indexes', 'Perf', 'SPs'] },
    { id: 5, name: 'Azure', level: 4, years: 3, category: 'Cloud', keywords: ['App Service', 'Functions', 'DevOps'] },
    { id: 6, name: 'Kafka', level: 3, years: 2, category: 'Messaging', keywords: ['Producers', 'Consumers'] },
    { id: 7, name: 'CSS/SCSS', level: 4, years: 6, category: 'Frontend', keywords: ['Responsive', 'Animations'] },
    { id: 8, name: 'Dapper', level: 4, years: 3, category: 'Backend', keywords: ['Micro-ORM', 'Perf'] },
  ];
}
