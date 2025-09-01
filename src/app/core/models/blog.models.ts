export interface BlogSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverUrl?: string;
  tags: string[];
  createdAt: string; // ISO
}

export interface BlogDetail extends BlogSummary {
  content: string; // markdown
  authorId: string;
  comments: CommentNode[];
}

export interface CommentNode {
  id: string;
  blogId: string;
  author: string;
  message: string;
  createdAt: string;
  replies?: CommentNode[];
}
