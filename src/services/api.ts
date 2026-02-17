/**
 * API Client Service
 * Centralized HTTP client for communicating with backend API
 * Base URL: http://localhost:3001 (dev) or environment variable
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

interface LeadData {
  email: string;
  name: string;
  source?: string;
  data?: Record<string, any>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          error: errorData.error || `HTTP ${response.status}`,
          message: errorData.message || response.statusText,
        };
      }

      const data = await response.json();
      return { data };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error(`API Error (${endpoint}):`, message);
      return { error: 'Network error', message };
    }
  }

  /**
   * POST /api/leads - Capture lead from form
   */
  async submitLead(lead: LeadData): Promise<ApiResponse<any>> {
    return this.request('/api/leads', {
      method: 'POST',
      body: JSON.stringify(lead),
    });
  }

  /**
   * GET /api/programs - Fetch all programs
   */
  async getPrograms(): Promise<ApiResponse<any>> {
    return this.request('/api/programs');
  }

  /**
   * GET /api/articles - Fetch articles
   */
  async getArticles(): Promise<ApiResponse<any>> {
    return this.request('/api/articles');
  }

  /**
   * GET /api/testimonials - Fetch testimonials
   */
  async getTestimonials(): Promise<ApiResponse<any>> {
    return this.request('/api/testimonials');
  }

  /**
   * Health check - verify backend is running
   */
  async healthCheck(): Promise<boolean> {
    const response = await this.request('/health');
    return !response.error;
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
