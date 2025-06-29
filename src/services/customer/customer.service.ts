import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  EkycMerchantApiResponse,
  CustomerApiResponse,
} from '../../types/customer/customer.types';

const baseUrl = import.meta.env.VITE_AUTH_SERVICE_DEV_API_URL;

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCustomers: builder.query<
      CustomerApiResponse,
      {
        page?: number;
        limit?: number;
        startDate?: string;
        endDate?: string;
        identity_verification_status?: string;
      }
    >({
      query: ({
        page = 1,
        limit = 25,
        startDate,
        endDate,
        identity_verification_status,
      }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        if (identity_verification_status)
          params.append(
            'identity_verification_status',
            identity_verification_status,
          );

        return {
          url: `/admin/get-user-data?${params.toString()}`,
          method: 'GET',
        };
      },
    }),
    getEkycCustomers: builder.query<
      EkycMerchantApiResponse,
      { page?: number; limit?: number; startDate?: string; endDate?: string }
    >({
      query: ({ page = 1, limit = 10, startDate, endDate }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        return {
          url: `/admin/get-ekycReq-customer?${params.toString()}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetAllCustomersQuery, useGetEkycCustomersQuery } =
  customerApi;
