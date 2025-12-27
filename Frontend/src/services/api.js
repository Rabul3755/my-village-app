import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    if (config.url && config.url.includes('undefined')) {
      return Promise.reject(new Error('Invalid request: Missing required parameters'));
    }

    let token;
    if (config.url?.includes('/admin/')) {
      token = localStorage.getItem('adminToken');
    } else {
      token = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('userToken');

      if (!window.location.pathname.includes('/login')) {
        if (window.location.pathname.includes('/admin')) {
          window.location.href = '/admin/login';
        } else {
          window.location.href = '/login';
        }
      }

      return Promise.reject('Authentication failed. Please login again.');
    }

    let errorMessage = 'An unexpected error occurred';

    if (error.response) {
      errorMessage = error.response.data?.message || error.response.statusText;
    } else if (error.request) {
      errorMessage = 'Network error - please check your connection';
    } else {
      errorMessage = error.message;
    }

    return Promise.reject(errorMessage);
  }
);

export const issueAPI = {
  getAll: (filters = {}) => api.get('/issues', { params: filters }),
  getById: (id) => api.get(`/issues/${id}`),
  create: (data) => api.post('/issues', data),
  update: (id, data) => api.put(`/issues/${id}`, data),
  updateStatus: (id, status) => api.patch(`/issues/${id}/status`, { status }),
  delete: (id) => api.delete(`/issues/${id}`),

  uploadIssueImages: (id, formData) =>
    api.post(`/issues/${id}/upload-issue-images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  uploadResolutionImages: (id, formData) =>
    api.post(`/issues/${id}/upload-resolution-images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  deleteImage: (issueId, imageId, imageType) =>
    api.delete(`/issues/${issueId}/images/${imageId}`, {
      data: { imageType },
    }),
};

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const adminAuthAPI = {
  login: (data) => api.post('/admin/auth/login', data),
  register: (data) => api.post('/admin/auth/register', data),
  getMe: () => api.get('/admin/auth/me'),
  updateDetails: (data) => api.put('/admin/auth/updatedetails', data),
};

export const leaderAPI = {
  getAll: (filters = {}) => api.get('/leaders', { params: filters }),
  getById: (id) => api.get(`/leaders/${id}`),
  create: (data) => api.post('/leaders', data),
};

export const politicalRepAPI = {
  getAll: (filters = {}) => api.get('/political', { params: filters }),
  getById: (id) => api.get(`/political/${id}`),
};

export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getRecentActivity: () => api.get('/admin/dashboard/recent-activity'),
  getSystemHealth: () => api.get('/admin/dashboard/system-health'),

  getAdminIssues: (filters = {}) => api.get('/admin/issues', { params: filters }),
  bulkUpdateIssueStatus: (data) => api.patch('/admin/issues/bulk-status', data),
  bulkDeleteIssues: (data) => api.delete('/admin/issues/bulk-delete', { data }),

  getAdminLeaders: (filters = {}) => api.get('/admin/leaders', { params: filters }),
  createLeader: (data) => api.post('/admin/leaders', data),
  updateLeader: (id, data) => api.put(`/admin/leaders/${id}`, data),
  deleteLeader: (id) => api.delete(`/admin/leaders/${id}`),
  toggleLeaderActive: (id) => api.patch(`/admin/leaders/${id}/toggle-active`),
  bulkDeleteLeaders: (data) => api.delete('/admin/leaders/bulk-delete', { data }),

  getAdminRepresentatives: (filters = {}) =>
    api.get('/admin/representatives', { params: filters }),

  getRepresentativeStats: () => api.get('/admin/representatives/stats'),
  createRepresentative: (data) => api.post('/admin/representatives', data),
  updateRepresentative: (id, data) => api.put(`/admin/representatives/${id}`, data),
  deleteRepresentative: (id) => api.delete(`/admin/representatives/${id}`),
  toggleRepresentativeActive: (id) =>
    api.patch(`/admin/representatives/${id}/toggle-active`),

  getPlatformAnalytics: () => api.get('/admin/analytics/overview'),
  getEngagementAnalytics: () => api.get('/admin/analytics/engagement'),
  exportAnalyticsData: (params) =>
    api.get('/admin/analytics/export', {
      params,
      responseType: 'blob',
    }),
};

export default api;
