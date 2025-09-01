import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { BlogDetail, BlogSummary, CommentNode } from '../models/blog.models';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private base = `${environment.apiBaseUrl}/blogs`;
  constructor(private http: HttpClient) {}

  list(page = 1, pageSize = 10): Observable<BlogSummary[]> {
    return this.http.get<BlogSummary[]>(`${this.base}?page=${page}&pageSize=${pageSize}`);
  }
  bySlug(slug: string): Observable<BlogDetail> {
    return this.http.get<BlogDetail>(`${this.base}/${slug}`);
  }
  create(form: FormData): Observable<BlogDetail> {
    return this.http.post<BlogDetail>(this.base, form);
  }
  uploadImage(file: File): Observable<{ url: string }> {
    const fd = new FormData(); fd.append('file', file);
    return this.http.post<{ url: string }>(`${this.base}/upload`, fd);
  }
  addComment(blogId: string, message: string, parentId?: string): Observable<CommentNode> {
    return this.http.post<CommentNode>(`${this.base}/${blogId}/comments`, { message, parentId });
  }
}
