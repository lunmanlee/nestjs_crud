import { Post, CreatePostData, UpdatePostData, ApiResponse } from '@/types/post';

const API_BASE_URL = 'http://localhost:3001';

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
      });
      if (!response.ok) {
        throw new Error(`Http error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error'};
    }
  }

  async getAllPosts(): Promise<ApiResponse<Post[]>> {
    return this.request<Post[]>('/posts');
  }

  async getPost(id: number): Promise<ApiResponse<Post>> {
    return this.request<Post>(`/posts/${id}`);
  }

  async createPost(data: CreatePostData): Promise<ApiResponse<Post>> {
    return this.request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePost(id: number, data: UpdatePostData): Promise<ApiResponse<Post>> {
    return this.request<Post>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePost(id: number): Promise<ApiResponse<Post>> {
    return this.request<Post>(`/posts/${id}`, { method: 'DELETE' })
  }
}

export const apiClient = new ApiClient();