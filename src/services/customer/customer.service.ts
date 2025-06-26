import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const customerServiceUrl = import.meta.env.VITE_AUTH_SERVICE_DEV_API_URL;

export const customersApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: customerServiceUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: ({ page = 1, limit = 25 }) => ({
        url: `/admin/get-user-data?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllCustomersQuery } = customersApi;
