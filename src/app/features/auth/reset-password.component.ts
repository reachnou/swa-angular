import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class='container py-5' style='max-width:560px;'>
    <h1 class='h3 mb-4'>Reset password</h1>
    <form [formGroup]="form" (ngSubmit)="submit()" class='d-grid gap-3'>
      <div>
        <label class='form-label'>Email</label>
        <input class='form-control' type='email' formControlName='email'>
      </div>
      <button class='btn btn-brand'>Send reset link</button>
    </form>
  </div>`
})
export class ResetPasswordComponent {
  form = this.fb.group({ email: ['', [Validators.required, Validators.email]] });
  sent = false;
  constructor(private fb: FormBuilder, private auth: AuthService) {}
  submit() {
    if (this.form.invalid) return;
    this.auth.resetPassword(this.form.value.email!).subscribe(_ => this.sent = true);
  }
}
