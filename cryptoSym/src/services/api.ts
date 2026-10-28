// services/api.ts
import axios from 'axios';
import { UserManager } from 'oidc-client-ts';

// Создаем один экземпляр UserManager
export const userManager = new UserManager({
  authority: import.meta.env.VITE_ZITADEL_DOMAIN,
  client_id: import.meta.env.VITE_ZITADEL_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_ZITADEL_CALLBACK_URL,
  post_logout_redirect_uri: import.meta.env.VITE_ZITADEL_POST_LOGOUT_URL,
  scope: 'openid profile email offline_access',
});

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// 🔹 Добавляем токен к запросам
api.interceptors.request.use(
  async (config) => {
    try {
      const user = await userManager.getUser();
      if (user?.access_token) {
        config.headers.Authorization = `Bearer ${user.access_token}`;
      }
      return config;
    } catch (error) {
      console.error('Error getting token:', error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// 🔸 Обработка ошибок
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('🔴 Токен истек, выполняем выход');
      await userManager.signoutRedirect();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;