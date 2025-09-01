import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
  <div class='container py-5' style='max-width:560px;'>
    <h1 class='h3 mb-4'>Sign in</h1>
    <form [formGroup]="form" (ngSubmit)="submit()" class='d-grid gap-3'>
      <div>
        <label class='form-label'>Email</label>
        <input class='form-control' type='email' formControlName='email'>
      </div>
      <div>
        <label class='form-label'>Password</label>
        <input class='form-control' type='password' formControlName='password'>
      </div>
      <button class='btn btn-brand'>Sign in</button>
      <div class='d-flex justify-content-between'>
        <a routerLink='/register'>Create account</a>
        <a routerLink='/reset-password'>Forgot password?</a>
      </div>
    </form>
  </div>`
})
export class LoginComponent {
  form = this.fb.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}
  submit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value as any;
    this.auth.login(email, password).subscribe(res => {
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/');
    });
  }
}
