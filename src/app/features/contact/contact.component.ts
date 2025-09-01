import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  trigger, transition, style, animate, query, stagger, keyframes
} from '@angular/animations';

/**
 * QUICK SETUP (no backend needed):
 * 1) Create a free Formspree form and grab your endpoint URL (looks like https://formspree.io/f/abcdwxyz).
 * 2) Paste it into FORM_ENDPOINT below. Done.
 *
 * Prefer your own API? Replace submit() with your fetch/HttpClient call.
 */
const FORM_ENDPOINT = 'https://formspree.io/f/your_form_id_here';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('pageFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('300ms 80ms ease-out', style({ opacity: 1, transform: 'none' }))
      ])
    ]),
    trigger('staggerIn', [
      transition(':enter', [
        query('.stagger', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(60, animate('280ms ease-out', style({ opacity: 1, transform: 'none' })))
        ], { optional: true })
      ])
    ]),
    trigger('pulse', [
      transition(':enter', []),
      transition('* => success', [
        animate('600ms ease-out', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.04)', offset: 0.4 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class ContactComponent {
  private fb = inject(FormBuilder);

  sending = signal(false);
  state = signal<'idle' | 'success' | 'error'>('idle');
  messageText = computed(() => {
    switch (this.state()) {
      case 'success': return 'Message sent! I’ll get back to you soon.';
      case 'error': return 'Something went wrong. Please try again.';
      default: return '';
    }
  });

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
    // honeypot — invisible field against bots
    website: ['']
  });

  get f() { return this.form.controls; }

  async submit() {
    if (this.form.invalid || this.sending()) {
      this.form.markAllAsTouched();
      return;
    }

    // basic anti-bot
    if (this.form.value.website) {
      this.state.set('success'); // silently "succeed"
      this.form.reset();
      return;
    }

    this.sending.set(true);
    this.state.set('idle');

    try {
      const payload = {
        name: this.form.value.name,
        email: this.form.value.email,
        subject: this.form.value.subject || '(No subject)',
        message: this.form.value.message
      };

      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        this.state.set('success');
        this.form.reset();
      } else {
        this.state.set('error');
      }
    } catch {
      this.state.set('error');
    } finally {
      this.sending.set(false);
      // auto-hide the banner
      setTimeout(() => this.state.set('idle'), 4500);
    }
  }
}
