import { useState, useEffect } from 'react';
import { useGetAllTransactionsQuery } from '../../services/transactions/transaction.service';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

const GetAllTransactions = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'merchant'>('all');
  const { data, error, isLoading } = useGetAllTransactionsQuery();

  // Extract transactions safely
  const transactions = data?.data?.data ?? [];

  // Utility function to show NA for empty/null/undefined
  const displayValue = (value: string | number | null | undefined): string => {
    return value === null || value === undefined || value === ''
      ? 'NA'
      : String(value);
  };

  // Define columns
  const columns: GridColDef[] = [
    {
      field: 'referenceId',
      headerName: 'Reference ID',
      width: 200,
      renderCell: (params) => (
        <div className="text-xs">{displayValue(params.value)}</div>
      ),
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 120,
      renderCell: (params) => (
        <div className="font-medium">{displayValue(params.value)} GNF</div>
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
        const value = params.value;
        return (
          <div className="text-sm">{displayValue(typeMap[value] || value)}</div>
        );
      },
    },
    {
      field: 'direction',
      headerName: 'Direction',
      width: 120,
      renderCell: (params) => {
        const value = params.value;
        if (!value) return <div className="text-sm text-gray-400">NA</div>;
        return (
          <div
            className={`text-sm font-medium ${value === 'credit' ? 'text-green-600' : 'text-red-600'}`}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </div>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const value = params.value;
        const statusStyles: Record<string, string> = {
          completed: 'bg-green-100 text-green-800',
          pending: 'bg-yellow-100 text-yellow-800',
          failed: 'bg-red-100 text-red-800',
        };
        if (!value) {
          return (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
              NA
            </span>
          );
        }
        return (
          <span
            className={`text-xs px-2 py-1 rounded-full ${statusStyles[value] || 'bg-gray-100 text-gray-800'}`}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 200,
      renderCell: (params) => {
        const date = params.row.createdAt;
        const formatted = date ? new Date(date).toLocaleString() : 'NA';
        return <div className="text-sm text-gray-600">{formatted}</div>;
      },
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      width: 200,
      renderCell: (params) => (
        <div className="text-sm">{displayValue(params.value)}</div>
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
          <div className="bg-white rounded-md p-4 shadow-sm flex flex-col justify-between h-32 relative">
            <div>
              <p className="text-1xl text-gray-500 mb-1">Total Transactions</p>
              <p className="text-3xl font-semibold text-teal-700">
                {transactions.length || 'NA'}
              </p>
            </div>
            <div className="absolute bottom-3 left-4 text-sm text-gray-500">
              <span className="text-xs text-gray-500 mb-1">
                Total Transfer amount{' '}
              </span>
              <span className="font-bold text-black">
                ${displayValue(data?.data?.totalAmountTransferred)}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-md p-4 shadow-sm flex flex-col justify-between h-32 relative">
            <div>
              <p className="text-1xl text-gray-500 mb-1">
                Successful Transactions
              </p>
              <p className="text-3xl font-semibold text-teal-700">
                {displayValue(data?.data?.successfulTransactions)}
              </p>
            </div>
            <div className="absolute bottom-3 left-4 text-sm text-gray-500">
              <span className="text-xs text-gray-500 mb-1">
                Total Successful amount{' '}
              </span>
              <span className="font-bold text-black">
                ${displayValue(data?.data?.successfulAmount)}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-md p-4 shadow-sm flex flex-col justify-between h-32 relative">
            <div>
              <p className="text-1xl text-gray-500 mb-1">Failed Transactions</p>
              <p className="text-3xl font-semibold text-red-600">
                {displayValue(data?.data?.failedTransactions)}
              </p>
            </div>
            <div className="absolute bottom-3 left-4 text-sm text-gray-500">
              <span className="text-xs text-gray-500 mb-1">
                Total Failed amount{' '}
              </span>
              <span className="font-bold text-black">
                ${displayValue(data?.data?.failedAmount)}
              </span>
            </div>
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
