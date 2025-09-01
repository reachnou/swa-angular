import {
    ChangeDetectionStrategy,
    Component,
    Input,
    computed,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { InViewportDirective } from 'src/app/shared/directives/in-viewport.directive';

export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface SkillItem {
    id: string | number;
    name: string;
    level: SkillLevel;          // 1..5
    years?: number;
    category?: string;
    keywords?: string[];
    colorHint?: string;         // brand hue (e.g. '#C3002F' for Angular)
}

@Component({
    selector: 'app-skill-grid',
    standalone: true,
    imports: [CommonModule, InViewportDirective],
    templateUrl: './skill-grid.component.html',
    styleUrls: ['./skill-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('listStagger', [
            transition(':enter', [
                query(
                    '.skill-card',
                    [
                        style({ opacity: 0, transform: 'translateY(12px) scale(.98)' }),
                        stagger(60, [
                            animate('300ms cubic-bezier(.2,.8,.2,1)',
                                style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
                        ])
                    ],
                    { optional: true }
                )
            ])
        ])
    ]
})
export class SkillGridComponent {
    @Input() title = 'Technical Skills';
    @Input() subtitle = 'Focused on modern .NET + Angular with cloud experience.';
    @Input({ required: true }) skills: SkillItem[] = [];
    @Input() categories?: string[];
    @Input() initialCategory: string | null = null;
    @Input() showFilters = true;
    @Input() showMeters = true;
    @Input() showYears = true;

    isVisible = signal(false);
    selectedCategory = signal<string | null>(this.initialCategory);

    readonly derivedCategories = computed(() => {
        if (this.categories?.length) return this.categories;
        const set = new Set<string>();
        for (const s of this.skills) if (s.category) set.add(s.category);
        return Array.from(set).sort();
    });

    readonly filtered = computed(() => {
        const cat = this.selectedCategory();
        return cat ? this.skills.filter(s => s.category === cat) : this.skills;
    });

    readonly maxLevel = 5;

    trackById = (_: number, s: SkillItem) => s.id;

    onCategoryClick(cat: string | null) {
        this.selectedCategory.set(cat);
    }

    hueFor(skill: SkillItem): string {
        if (skill.colorHint) return skill.colorHint;
        // map 1..5 to a pleasant hue band (teal->violet)
        const hue = Math.round(200 + ((skill.level - 1) / (this.maxLevel - 1)) * 80);
        return `hsl(${hue} 70% 50%)`;
        // ex: 200 = teal, 280 = violet
    }

    progressPct(skill: SkillItem): number {
        return Math.max(0, Math.min(100, Math.round((skill.level / this.maxLevel) * 100)));
    }

    ariaLabel(skill: SkillItem): string {
        const parts = [`${skill.name}`, `level ${skill.level} of ${this.maxLevel}`];
        if (this.showYears && typeof skill.years === 'number') {
            parts.push(`${skill.years} ${skill.years === 1 ? 'year' : 'years'} experience`);
        }
        if (skill.category) parts.push(`Category ${skill.category}`);
        return parts.join(', ');
    }

    onObserved(v: boolean) {
        if (v) this.isVisible.set(true);
    }
}
