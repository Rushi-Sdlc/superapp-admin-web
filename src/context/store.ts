import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/auth/auth.service';
import { transactionApi } from '../services/transactions/transaction.service';
import { merchantApi } from '../services/merchant/merchant.service';
import { ekycApi } from '../services/ekyc/ekycRequest.service';
import { customerApi } from '../services/customer/customer.service';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [merchantApi.reducerPath]: merchantApi.reducer,
    [ekycApi.reducerPath]: ekycApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      transactionApi.middleware,
      merchantApi.middleware,
      ekycApi.middleware,
      customerApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
