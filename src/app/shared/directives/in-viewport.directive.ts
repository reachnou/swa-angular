import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
    selector: '[appInViewport]',
    standalone: true,
})
export class InViewportDirective implements OnInit, OnDestroy {
    @Output() visibleChange = new EventEmitter<boolean>();
    private obs?: IntersectionObserver;

    constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) { }

    ngOnInit(): void {
        this.zone.runOutsideAngular(() => {
            this.obs = new IntersectionObserver(
                entries => {
                    for (const e of entries) {
                        if (e.isIntersecting) {
                            this.zone.run(() => this.visibleChange.emit(true));
                        }
                    }
                },
                { root: null, threshold: 0.25 }
            );
            this.obs.observe(this.el.nativeElement);
        });
    }

    ngOnDestroy(): void {
        this.obs?.disconnect();
    }
}
