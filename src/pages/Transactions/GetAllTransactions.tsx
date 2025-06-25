import { useState, useEffect } from 'react';
import { useGetAllTransactionsQuery } from '../../services/transactions/transaction.service';
import {
  DataGrid,
  type GridColDef,
  type GridValueGetter,
} from '@mui/x-data-grid';

const GetAllTransactions = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'merchant'>('all');
  const { data, error, isLoading } = useGetAllTransactionsQuery();

  // Extract transactions safely
  const transactions = data?.data?.data ?? [];

  // Define columns
  const columns: GridColDef[] = [
    {
      field: 'referenceId',
      headerName: 'Reference ID',
      width: 200,
      renderCell: (params) => <div className="text-xs">{params.value}</div>,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 120,
      renderCell: (params) => (
        <div className="font-medium">{params.value} GNF</div>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 180,
      renderCell: (params) => {
        const typeMap: Record<string, string> = {
          withdraw_to_bank: 'Withdraw to Bank',
          transfer: 'Transfer',
          deposit: 'Deposit',
          add_money: 'Add Money',
          wallet_transfer: 'Wallet Transfer',
        };
        return (
          <div className="text-sm">{typeMap[params.value] || params.value}</div>
        );
      },
    },
    {
      field: 'direction',
      headerName: 'Direction',
      width: 120,
      renderCell: (params) => (
        <div
          className={`text-sm font-medium ${
            params.value === 'credit' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const statusStyles: Record<string, string> = {
          completed: 'bg-green-100 text-green-800',
          pending: 'bg-yellow-100 text-yellow-800',
          failed: 'bg-red-100 text-red-800',
        };
        return (
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              statusStyles[params.value] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
          </span>
        );
      },
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      valueGetter: (params: GridValueGetter) =>
        new Date(params.value as string).toLocaleString(),
      renderCell: (params) => (
        <div className="text-sm text-gray-600">{params.value}</div>
      ),
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      width: 200,
      renderCell: (params) => (
        <div className="text-sm">{params.value || '-'}</div>
      ),
    },
  ];

  useEffect(() => {
    if (error) {
      console.error('Error fetching transactions:', error);
    }
  }, [data, error]);

  return (
    <div className="bg-gray-100 font-sans text-gray-700 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Transactions</h1>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-300 mb-6 text-sm font-medium overflow-x-auto scrollbar-hide">
          <button
            className={`pb-3 whitespace-nowrap ${activeTab === 'all' ? 'text-teal-600 border-b-2 border-teal-600' : 'hover:text-teal-600'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`pb-3 whitespace-nowrap ${activeTab === 'merchant' ? 'text-teal-600 border-b-2 border-teal-600' : 'hover:text-teal-600'}`}
            onClick={() => setActiveTab('merchant')}
          >
            Merchant
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-md p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Total Transactions</p>
            <p className="text-3xl font-semibold text-teal-700">
              {transactions.length}
            </p>
          </div>
          <div className="bg-white rounded-md p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Pending</p>
            <p className="text-3xl font-semibold text-teal-700">
              {transactions.filter((t) => t.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-md p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Completed</p>
            <p className="text-3xl font-semibold text-teal-700">
              {transactions.filter((t) => t.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Filters UI (placeholders) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 space-y-3 sm:space-y-0">
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-0"
            value=""
            readOnly
          />
          <div className="flex items-center space-x-2">
            <input
              type="date"
              className="rounded-md border px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-teal-500"
              readOnly
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              className="rounded-md border px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-teal-500"
              readOnly
            />
          </div>
          <button className="bg-teal-600 hover:bg-teal-700 text-white rounded-md px-4 py-2 text-sm flex items-center space-x-1">
            <i className="fas fa-filter"></i>
            <span>Apply Filters</span>
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 text-sm flex items-center space-x-1">
            <i className="fas fa-times"></i>
            <span>Clear All</span>
          </button>
        </div>

        {/* DataGrid Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={transactions}
              columns={columns}
              loading={isLoading}
              pagination
              pageSizeOptions={[10, 25, 50, 100]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 25,
                    page: 0,
                  },
                },
              }}
              getRowId={(row) => row._id}
              sx={{
                border: 'none',
                '& .MuiDataGrid-cell': {
                  borderBottom: '1px solid #f3f4f6',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f9fafb',
                  borderBottom: '1px solid #f3f4f6',
                },
                '& .MuiDataGrid-footerContainer': {
                  backgroundColor: '#f9fafb',
                  borderTop: '1px solid #f3f4f6',
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetAllTransactions;
