import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { BlogService } from '../../../core/services/blog.service';
import { BlogDetail } from '../../../core/models/blog.models';
import { CommentThreadComponent } from '../comments/comment-thread.component';

@Component({
  standalone: true,
  imports: [CommonModule, MarkdownModule, CommentThreadComponent],
  templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent implements OnInit {
  post?: BlogDetail;
  constructor(private route: ActivatedRoute, private blog: BlogService) {}
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    // Temporary mock if no API yet:
    this.post = {
      id: '1',
      title: 'Welcome to the WOW Portfolio',
      slug,
      excerpt: 'Intro post',
      tags: ['intro','angular'],
      createdAt: new Date().toISOString(),
      coverUrl: '',
      content: `# Hello!\n\nThis page renders **Markdown**. Connect your API later.`,
      authorId: 'u1',
      comments: []
    };
    // For real API, uncomment:
    // this.blog.bySlug(slug).subscribe(p => this.post = p);
  }
}
