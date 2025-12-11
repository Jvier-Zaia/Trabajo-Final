import axios from 'axios';
import type { Product } from '../types';

const api = axios.create({
  baseURL: 'https://trabajo-final-2flw.onrender.com/api',
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('store_auth');
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { token: string };
        if (parsed.token) {
          config.headers = config.headers ?? {};
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch {
        // ignore
      }
    }
  }
  return config;
});

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id?: string;
    _id?: string;
    email: string;
    name: string;
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const getProducts = async (params?: {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  name?: string;
}): Promise<Product[]> => {
  const res = await api.get<Product[]>('/products', { params });
  return res.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
};

export const loginRequest = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>('/auth/login', payload);
  return res.data;
};

export const registerRequest = async (payload: RegisterPayload) => {
  const res = await api.post('/auth/register', payload);
  return res.data;
};

export const createProduct = async (data: FormData): Promise<Product> => {
  const res = await api.post<Product>('/products', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const updateProduct = async (id: string, data: FormData): Promise<Product> => {
  const res = await api.put<Product>(`/products/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
