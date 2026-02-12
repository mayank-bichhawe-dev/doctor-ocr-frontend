import axios from "axios";
import {
  clearUserDataFromLocalStorage,
  loadUserDataFromLocalStorage,
  saveUserDataToLocalStorage,
} from "../modules/auth/utils";
import type { AuthApiRes } from "../modules/auth/types/user.type";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to prevent multiple simultaneous refresh calls
let isRefreshing = false;
// Queue of failed requests waiting for the new token
let failedRequestsQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedRequestsQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedRequestsQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = loadUserDataFromLocalStorage();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Mark this request so we don't retry it again infinitely
      originalRequest._retry = true;

      if (isRefreshing) {
        // If a refresh is already in progress, queue this request
        // and wait for the new token
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      const { refreshToken } = loadUserDataFromLocalStorage();

      if (!refreshToken) {
        clearUserDataFromLocalStorage();
        window.location.href = "/auth";
        return Promise.reject(error);
      }

      try {
        const { data }: { data: AuthApiRes } = await axiosInstance.post(
          "/auth/refresh-token",
          { refreshToken },
        );

        const newAccessToken = data.data.accessToken;

        // Save the new tokens
        saveUserDataToLocalStorage(
          data.data.user,
          newAccessToken,
          data.data.refreshToken,
        );

        // Update the header for the original failed request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Resolve all queued requests with the new token
        processQueue(null, newAccessToken);

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearUserDataFromLocalStorage();
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
