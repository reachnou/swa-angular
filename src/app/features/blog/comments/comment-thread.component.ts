import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentNode } from '../../../core/models/blog.models';
import { BlogService } from '../../../core/services/blog.service';
import { FormsModule } from '@angular/forms';
import { CommentItemComponent } from './comment-item.component';

@Component({
  standalone: true,
  selector: 'app-comment-thread',
  imports: [CommonModule, FormsModule, CommentItemComponent],
  templateUrl: './comment-thread.component.html'
})
export class CommentThreadComponent {
  @Input() root: CommentNode[] = [];
  @Input() blogId!: string;
  newMessage = '';
  constructor(private blog: BlogService) {}
  add() {
    const msg = this.newMessage.trim();
    if (!msg) return;
    // Mock add for now:
    const newNode: CommentNode = {
      id: Math.random().toString(36).slice(2),
      blogId: this.blogId,
      author: 'You',
      message: msg,
      createdAt: new Date().toISOString(),
      replies: []
    };
    this.root = [newNode, ...this.root];
    this.newMessage = '';
    // Real API:
    // this.blog.addComment(this.blogId, msg).subscribe(c => {
    //   this.root = [c, ...this.root];
    //   this.newMessage = '';
    // });
  }
}
