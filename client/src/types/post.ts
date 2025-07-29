export interface Post {
  id: number;
  title: string;
  content?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  title: string;
  content?: string;
  published?: boolean;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  published?: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}