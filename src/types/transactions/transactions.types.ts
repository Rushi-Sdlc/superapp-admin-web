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
  type: string; // Could be more specific
  status: 'completed' | 'pending' | 'failed' | 'cancelled' | string;
  remarks: string | null;
  is_active: boolean;
  createdAt: string; // ISO string or Date
  updatedAt: string;
  __v: number;
}

// Original basic API Response Type
export interface TransactionsApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    data: Transaction[];
    total: number;
  };
}

// Summary counts for UI dashboard cards, etc.
export interface TransactionSummary {
  total: number;
  totalAmountTransferred: number;

  completed: number;
  completedAmount: number;

  failed: number;
  failedAmount: number;

  // You can extend this if needed
  pending?: number;
  pendingAmount?: number;
  cancelled?: number;
  cancelledAmount?: number;
}

// API Response with transaction list + stats (matches enhanced backend response)
export interface TransactionsWithStatsApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    data: Transaction[];
    totalTransactions: number;
    totalAmountTransferred: number;
    successfulTransactions: number;
    successfulAmount: number;
    failedTransactions: number;
    failedAmount: number;
  };
}
