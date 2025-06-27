// services/merchant/merchant.service.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  EkycMerchantApiResponse,
  MerchantApiResponse,
} from '../../types/merchant/merchant.types';

const baseUrl = import.meta.env.VITE_AUTH_SERVICE_DEV_API_URL;

export const merchantApi = createApi({
  reducerPath: 'merchantApi',
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
    getAllMerchants: builder.query<
      MerchantApiResponse,
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
          url: `/admin/get-all-merchants?${params.toString()}`,
          method: 'GET',
        };
      },
    }),
    getEkycMerchants: builder.query<
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
          url: `/admin/get-ekycReq-merchant?${params.toString()}`,
          method: 'GET',
        };
      },
    }),
    approveMerchant: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/approve-ekycReq-customer/${id}`,
        method: 'PUT',
      }),
    }),
    rejectMerchant: builder.mutation({
      query: ({ id, rejection_reason }) => ({
        url: `/admin/reject-ekycReq-customer/${id}`,
        method: 'PUT',
        body: { rejection_reason },
      }),
    }),
  }),
});

// Also export hook
export const {
  useGetAllMerchantsQuery,
  useGetEkycMerchantsQuery,
  useApproveMerchantMutation,
  useRejectMerchantMutation,
} = merchantApi;
