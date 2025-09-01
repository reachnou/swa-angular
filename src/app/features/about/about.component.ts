import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, AfterViewInit, ElementRef, signal } from '@angular/core';

export interface AboutLink { label: string; url: string; icon?: string; }
export interface AboutFact { label: string; value: string | number; }
export interface AboutSkill { name: string; level: number; }
export interface AboutProfile {
  name: string; title: string; location?: string; summary: string; avatarUrl?: string; links?: AboutLink[];
}

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutComponent implements AfterViewInit {
  /** Optional inputs (you can ignore these and just use the built-in demo data) */
  @Input() profile?: AboutProfile;
  @Input() highlights?: string[];
  @Input() facts?: AboutFact[];
  @Input() skills?: AboutSkill[];

  /** reveal flags for animations */
  revealSkills = signal(false);

  /** built-in demo data (used when inputs aren’t provided) */
  demoProfile: AboutProfile = {
    name: 'Reach Nou',
    title: '.NET Full Stack Developer',
    location: 'Dallas, TX',
    summary:
      `I craft resilient .NET + Angular systems with clean architecture and delightful UX.
       I love turning complex domains into simple, maintainable software that ships.`,
    avatarUrl: 'assets/avatar.jpg',
    links: [
      { label: 'LinkedIn', url: 'https://linkedin.com/in/reach-nou/', icon: '🔗' },
      { label: 'GitHub', url: 'https://github.com/', icon: '🐙' },
      { label: 'Resume', url: '/assets/Reach-Nou-Resume.pdf', icon: '📄' }
    ]
  };

  demoHighlights = [
    'Clean Architecture & DDD',
    'ASP.NET Core APIs + SQL tuning',
    'Angular animations & modern UI',
    'CI/CD on Azure DevOps',
    'Event-driven messaging',
    'Mentorship & docs culture'
  ];

  demoFacts: AboutFact[] = [
    { label: 'Experience', value: '5+ years' },
    { label: 'Stack', value: 'C#, ASP.NET Core, Angular, SQL' },
    { label: 'Currently', value: 'Building portfolio & interviewing' },
    { label: 'Fun', value: 'Coffee • Cats • Chess' }
  ];

  demoSkills: AboutSkill[] = [
    { name: 'C# / .NET', level: 92 },
    { name: 'Angular', level: 88 },
    { name: 'SQL (Perf & Tuning)', level: 85 },
    { name: 'Azure DevOps / CI-CD', level: 80 },
    { name: 'DDD / Clean Architecture', level: 86 }
  ];

  constructor(private host: ElementRef<HTMLElement>) { }

  /** effective data used by the template (inputs override demo data) */
  get p(): AboutProfile { return this.profile ?? this.demoProfile; }
  get hls(): string[] { return this.highlights ?? this.demoHighlights; }
  get fcts(): AboutFact[] { return this.facts ?? this.demoFacts; }
  get sks(): AboutSkill[] { return this.skills ?? this.demoSkills; }

  ngAfterViewInit(): void {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).classList.add('inview');
          if ((e.target as HTMLElement).classList.contains('skills')) {
            this.revealSkills.set(true);
          }
          io.unobserve(e.target);
        }
      },
      { threshold: 0.18 }
    );
    this.host.nativeElement
      .querySelectorAll<HTMLElement>('.reveal, .skills')
      .forEach((el) => io.observe(el));
  }

  trackByIndex = (i: number) => i;

  getInitials(name?: string, max: number = 2): string {
    if (!name) return '';
    return name
      .trim()
      .split(/\s+/)        // split on any whitespace
      .filter(Boolean)
      .map(part => part[0])
      .join('')
      .slice(0, max)
      .toUpperCase();
  }
}
