import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TransactionsWithStatsApiResponse } from '../../types/transactions/transactions.types';

const transactionServiceUrl = import.meta.env.VITE_AUTH_SERVICE_PROD_API_URL;

export const transactions = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: transactionServiceUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllTransactions: builder.query<TransactionsWithStatsApiResponse, void>({
      query: () => '/admin/get-all-transactions',
    }),
  }),
});

export const { useGetAllTransactionsQuery } = transactions;
