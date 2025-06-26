// services/transactions/transaction.service.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_AUTH_SERVICE_DEV_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: ({ page = 1, limit = 25 }) => ({
        url: `/admin/get-all-transactions?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllTransactionsQuery } = transactionApi;
