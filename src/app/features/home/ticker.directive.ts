// app/ticker.directive.ts
import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    NgZone,
    OnDestroy,
} from '@angular/core';

@Directive({
    selector: '[appTicker]',
    standalone: true,
})
export class TickerDirective implements AfterViewInit, OnDestroy {
    /** speed in pixels per second */
    @Input() pxPerSec = 80;
    /** on first reset, flip order A-B-C -> C-B-A */
    @Input() firstFlip = false;

    private rafId = 0;
    private last = 0;
    private x = 0;
    private destroyed = false;
    private didFlip = false;

    constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) { }

    ngAfterViewInit(): void {
        const el = this.el.nativeElement;
        el.style.willChange = 'transform';

        // ensure the moving list is positioned as a row
        const cs = getComputedStyle(el);
        if (cs.display === 'inline') el.style.display = 'flex';

        this.zone.runOutsideAngular(() => {
            const loop = (t: number) => {
                if (this.destroyed) return;

                if (!this.last) this.last = t;
                const dt = (t - this.last) / 1000;
                this.last = t;

                // move right
                this.x += this.pxPerSec * dt;
                el.style.transform = `translateX(${this.x}px)`;

                const parent = el.parentElement as HTMLElement | null;
                const lastChild = el.lastElementChild as HTMLElement | null;

                if (parent && lastChild) {
                    const parentWidth = parent.getBoundingClientRect().width;

                    // read gap (works for flex/grid)
                    const style = getComputedStyle(el);
                    const gap =
                        parseFloat((style as any).columnGap || (style as any).gap || '0') ||
                        0;

                    // LEFT edge of the last (rightmost) token in viewport coords
                    const lastLeft = lastChild.offsetLeft + this.x;

                    // recycle ONLY when last token is completely past the right edge
                    if (lastLeft >= parentWidth) {
                        const w = lastChild.offsetWidth;

                        if (this.firstFlip && !this.didFlip) {
                            const kids = Array.from(el.children) as HTMLElement[];
                            const rest = kids.slice(0, -1).reverse();
                            el.prepend(lastChild); // last -> front
                            for (const k of rest) el.appendChild(k);
                            this.didFlip = true;
                        } else {
                            // rotate last -> front
                            el.insertBefore(lastChild, el.firstElementChild);
                        }

                        // keep motion continuous
                        this.x -= w + gap;
                        el.style.transform = `translateX(${this.x}px)`;
                    }
                }

                this.rafId = requestAnimationFrame(loop);
            };

            this.rafId = requestAnimationFrame(loop);
        });

        window.addEventListener('resize', this.onResize);
    }

    private onResize = () => {
        this.x = 0;
        this.last = 0;
        this.el.nativeElement.style.transform = 'translateX(0)';
    };

    ngOnDestroy(): void {
        this.destroyed = true;
        cancelAnimationFrame(this.rafId);
        window.removeEventListener('resize', this.onResize);
    }
}
