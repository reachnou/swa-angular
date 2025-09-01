import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class='container py-5' style='max-width:560px;'>
    <h1 class='h3 mb-4'>Create account</h1>
    <form [formGroup]="form" (ngSubmit)="submit()" class='d-grid gap-3'>
      <div>
        <label class='form-label'>Name</label>
        <input class='form-control' formControlName='name'>
      </div>
      <div>
        <label class='form-label'>Email</label>
        <input class='form-control' type='email' formControlName='email'>
      </div>
      <div>
        <label class='form-label'>Password</label>
        <input class='form-control' type='password' formControlName='password'>
      </div>
      <button class='btn btn-brand'>Create</button>
    </form>
  </div>`
})
export class RegisterComponent {
  form = this.fb.group({ name: ['', Validators.required], email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}
  submit() {
    if (this.form.invalid) return;
    this.auth.register(this.form.value as any).subscribe(_ => this.router.navigateByUrl('/'));
  }
}
