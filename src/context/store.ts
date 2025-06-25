// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { transactions } from '../services/transactions/transaction.service';

export const store = configureStore({
  reducer: {
    [transactions.reducerPath]: transactions.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(transactions.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
