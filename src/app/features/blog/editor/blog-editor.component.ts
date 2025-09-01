import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './blog-editor.component.html'
})
export class BlogEditorComponent {
  form = this.fb.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    tags: [''],
    content: ['', Validators.required],
    cover: [null as File | null]
  });
  uploading = false;

  constructor(private fb: FormBuilder, private blog: BlogService, private router: Router) {}

  onCover(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0] || null;
    this.form.patchValue({ cover: file });
  }

  submit() {
    if (this.form.invalid) return;
    const fd = new FormData();
    Object.entries(this.form.value).forEach(([k, v]) => {
      if (v !== null && v !== undefined) {
        if (k === 'cover' && v instanceof File) fd.append('cover', v);
        else fd.append(k, String(v));
      }
    });
    this.uploading = true;
    // For now simulate publish success:
    setTimeout(() => {
      this.uploading = false;
      this.router.navigate(['/blog', this.form.value.slug || 'new-post']);
    }, 600);
    // Real API:
    // this.blog.create(fd).subscribe({
    //   next: post => this.router.navigate(['/blog', post.slug]),
    //   error: () => this.uploading = false
    // });
  }
}
