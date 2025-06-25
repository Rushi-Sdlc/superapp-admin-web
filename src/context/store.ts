import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/auth/auth.service';
import { transactions } from '../services/transactions/transaction.service';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [transactions.reducerPath]: transactions.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, transactions.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
