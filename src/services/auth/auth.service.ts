// services/auth.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  AdminLoginRequest,
  AdminLoginResponse,
} from '../../types/auth/auth.types';

const authServiceUrl = import.meta.env.VITE_AUTH_SERVICE_DEV_API_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: authServiceUrl,
  }),
  endpoints: (builder) => ({
    loginAdmin: builder.mutation<AdminLoginResponse, AdminLoginRequest>({
      query: (body) => ({
        url: '/admin/verify-admin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginAdminMutation } = authApi;
