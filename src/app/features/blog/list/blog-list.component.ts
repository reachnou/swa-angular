import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { BlogSummary } from '../../../core/models/blog.models';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-list.component.html'
})
export class BlogListComponent implements OnInit {
  items: BlogSummary[] = [];
  loading = true;
  constructor(private blog: BlogService) {}
  ngOnInit(): void {
    // Temporary mock for UX if no API:
    setTimeout(() => {
      this.items = [{
        id: '1',
        title: 'Welcome to the WOW Portfolio',
        slug: 'welcome',
        excerpt: 'This is a starter blog post. Replace with your content or connect an API.',
        tags: ['intro','angular'],
        createdAt: new Date().toISOString()
      }];
      this.loading = false;
    }, 300);
    // For real API, uncomment:
    // this.blog.list().subscribe(res => { this.items = res; this.loading = false; });
  }
}
