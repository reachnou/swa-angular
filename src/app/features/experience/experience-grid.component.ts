import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../shared/models/experience.model';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
    selector: 'app-experience-grid',
    standalone: true,
    imports: [CommonModule, RevealOnScrollDirective],
    templateUrl: './experience-grid.component.html',
    styleUrls: ['./experience-grid.component.scss']
})
export class ExperienceGridComponent {
    @Input() experiences: Experience[] = [];

    trackById = (_: number, e: Experience) => e.id;
}
