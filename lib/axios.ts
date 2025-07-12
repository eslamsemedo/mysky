import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://darkgray-termite-166434.hostingersite.com/api',
  withCredentials: true,  // Removed to disable credentials
});

// Request interceptor: attach Authorization header if token exists
api.interceptors.request.use(async (config) => {
  if (typeof window !== 'undefined') {
    const token = getCookie('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      // config.headers['Authorization'] = `Bearer 4|JueC9cImAVKrCEhsDCCutBozbde2Efp3bHH4U96m3590fd7a`;
    }
  }
  return config;
});

// Response interceptor: handle 401/419
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 419)) {
      if (typeof window !== 'undefined') {
        // Remove cookie and redirect to /admin/login
        document.cookie = 'auth_token=; Max-Age=0; path=/;';
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Helper to get cookie value
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export default api; 