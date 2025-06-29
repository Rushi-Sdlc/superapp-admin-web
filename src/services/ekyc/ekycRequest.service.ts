// services/merchant/merchantEkyc.service.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_AUTH_SERVICE_DEV_API_URL;

export const ekycApi = createApi({
  reducerPath: 'ekycApi',
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
    approveMerchant: builder.mutation<{ success: boolean }, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/approve-ekycReq-customer/${id}`,
        method: 'PUT',
      }),
    }),
    rejectMerchant: builder.mutation<
      { success: boolean },
      { id: string; rejection_reason: string }
    >({
      query: ({ id, rejection_reason }) => ({
        url: `/admin/reject-ekycReq-customer/${id}`,
        method: 'PUT',
        body: { rejection_reason },
      }),
    }),
  }),
});

export const { useApproveMerchantMutation, useRejectMerchantMutation } =
  ekycApi;
