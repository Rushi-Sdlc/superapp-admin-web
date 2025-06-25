// types/transaction.type.ts

// Single Transaction Type
export interface Transaction {
  _id: string;
  referenceId: string;
  walletId: string;
  counterpartyWalletId: string | null;
  direction: 'credit' | 'debit';
  amount: number;
  currency: string;
  channel: string;
  type: string; // Could be more specific if you know all possible types
  status: 'completed' | 'pending' | 'failed' | string; // Add other possible statuses
  remarks: string | null;
  is_active: boolean;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
  __v: number;
}

// API Response Type
export interface TransactionsApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    data: Transaction[];
    total: number;
  };
}

// For the summary counts (used in your cards)
export interface TransactionSummary {
  total: number;
  pending: number;
  completed: number;
  // Add other status counts if needed
}
