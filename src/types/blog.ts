export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  coverImage: string;
}

export interface BlogPostResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
}

export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
}

export interface JsonPlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
