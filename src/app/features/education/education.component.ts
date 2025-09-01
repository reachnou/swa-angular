import { CommonModule, NgOptimizedImage, DatePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { EducationItem } from 'src/app/shared/models/education.model';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, DatePipe],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('listStagger', [
      transition(':enter', [
        query('.edu-card', [
          style({ opacity: 0, transform: 'translateY(16px) scale(0.98)' }),
          stagger(80, animate('400ms cubic-bezier(.2,.7,.2,1)',
            style({ opacity: 1, transform: 'translateY(0) scale(1)' })
          ))
        ], { optional: true })
      ])
    ])
  ]
})
export class EducationComponent {
  title = 'Education';
  mode: 'cards' | 'timeline' = 'timeline';
  showGpa = true;

  // Local data (edit here)
  items: EducationItem[] = [
    {
      id: 1,
      school: 'Trine University',
      degree: 'M.S.',
      field: 'Computer Science',
      startDate: '2024-07-01',
      endDate: null,
      location: 'Tempe, AZ',
      gpa: '3.9/4.0',
      highlights: [
        'Focused on Distributed Systems, Cloud, and Data Engineering',
        'Capstone: Event-driven WMS with Kafka + .NET'
      ],
      logoUrl: 'assets/logos/trine.png'
    },
    {
      id: 2,
      school: 'Royal University of Phnom Penh',
      degree: 'B.S.',
      field: 'Information Technology',
      startDate: '2017-09-01',
      endDate: '2021-06-01',
      location: 'Phnom Penh, Cambodia',
      gpa: '3.7/4.0',
      highlights: ['Graduated with Honors', 'Led a team project on inventory management'],
      logoUrl: 'assets/logos/rupp.png'
    }
  ];

  trackById = (_: number, it: EducationItem) => it.id;

  getRange(a?: string, b?: string | null): string {
    const d = (s?: string | null) => (s ? new Date(s) : null);
    const fmt = (x: Date | null) =>
      x ? x.toLocaleString(undefined, { month: 'short', year: 'numeric' }) : 'Present';
    return `${fmt(d(a))} — ${fmt(d(b))}`;
  }

}
