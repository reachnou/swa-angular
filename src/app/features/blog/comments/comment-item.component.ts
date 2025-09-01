import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentNode } from '../../../core/models/blog.models';
import { BlogService } from '../../../core/services/blog.service';

@Component({
  standalone: true,
  selector: 'app-comment-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-item.component.html'
})
export class CommentItemComponent {
  @Input() node!: CommentNode;
  @Input() blogId!: string;
  replying = false; replyMessage = '';
  constructor(private blog: BlogService) {}

  reply() {
    const msg = this.replyMessage.trim();
    if (!msg) return;
    // Mock reply:
    const r: CommentNode = {
      id: Math.random().toString(36).slice(2),
      blogId: this.blogId,
      author: 'You',
      message: msg,
      createdAt: new Date().toISOString(),
      replies: []
    };
    this.node.replies = [r, ...(this.node.replies || [])];
    this.replyMessage = ''; this.replying = false;
    // Real API:
    // this.blog.addComment(this.blogId, msg, this.node.id).subscribe(r => {
    //   this.node.replies = [r, ...(this.node.replies || [])];
    //   this.replyMessage = ''; this.replying = false;
    // });
  }
}
