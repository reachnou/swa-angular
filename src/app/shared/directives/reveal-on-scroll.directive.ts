import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[revealOnScroll]',
    standalone: true
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
    @Input() revealDelay = 0;   // seconds
    @Input() revealOnce = true;

    private observer?: IntersectionObserver;

    constructor(private el: ElementRef<HTMLElement>, private r: Renderer2) { }

    ngOnInit(): void {
        const node = this.el.nativeElement;
        this.r.addClass(node, 'reveal-init');

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        node.style.setProperty('--reveal-delay', `${this.revealDelay}s`);
                        this.r.addClass(node, 'reveal-in');
                        if (this.revealOnce) this.observer?.unobserve(node);
                    } else if (!this.revealOnce) {
                        this.r.removeClass(node, 'reveal-in');
                    }
                });
            },
            { threshold: 0.2 }
        );

        this.observer.observe(node);
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}
