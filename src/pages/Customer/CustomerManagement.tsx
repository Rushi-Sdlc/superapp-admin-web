import { useState, useEffect } from 'react';
import { useGetAllCustomersQuery } from '../../services/customer/customer.service';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { formatDate, showApiErrorToast } from '../../utility/utility';
import { downloadExcelFile } from '../../utility/downloadExcel';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility } from '@mui/icons-material';

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [activeTab, setActiveTab] = useState<
    'all customers' | 'E-KYC Requests'
  >('all customers');
  const [page, setPage] = useState(0); // MUI is 0-based
  const [pageSize, setPageSize] = useState(25);

  const { data, error, isLoading, refetch } = useGetAllCustomersQuery(
    {
      page: page + 1, // Backend expects 1-based
      limit: pageSize,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  // const allCustomers = data?.data ?? [];
  const customers = data?.data ?? [];

  const displayValue = (value: string | number | null | undefined): string => {
    return value === null || value === undefined || value === ''
      ? 'NA'
      : String(value);
  };

  // const customers = useFilteredSearch({
  //   data: allCustomers,
  //   searchTerm,
  //   startDate,
  //   endDate,
  //   searchableFields: [
  //     'first_name',
  //     'last_name',
  //     'wallet.wallet_mobile_number',
  //     '_id',
  //     'identity_verification_status',
  //   ],
  //   dateField: 'createdAt',
  // });

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center space-x-2">
          <div className="text-sm">
            {displayValue(params.row.first_name)}{' '}
            {displayValue(params.row.last_name)}
          </div>
        </div>
      ),
    },
    {
      field: 'userId',
      headerName: 'User ID',
      width: 220,
      renderCell: (params) => (
        <div className="text-xs">{displayValue(params.row._id)}</div>
      ),
    },
    {
      field: 'contact',
      headerName: 'Contact',
      width: 160,
      renderCell: (params) => (
        <div className="text-sm">{displayValue(params.row.email)}</div>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Joined Date',
      width: 180,
      renderCell: (params) => {
        const formatted = formatDate(params.row.createdAt);
        return <div className="text-sm text-gray-600">{formatted}</div>;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        const active = params.row.is_active;
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {active ? 'Active' : 'Inactive'}
          </span>
        );
      },
    },
    {
      field: 'ekyc',
      headerName: 'E-KYC',
      width: 140,
      renderCell: (params) => {
        const status =
          params.row.identity_verification_status || 'not_available';
        const statusColor =
          status === 'approved'
            ? 'bg-green-100 text-green-700'
            : status === 'in_progress'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700';
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
          >
            {status.replace('_', ' ')}
          </span>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      renderCell: () => (
        <div className="flex space-x-2">
          <Tooltip title="View">
            <IconButton color="primary" size="small">
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton color="secondary" size="small">
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" size="small">
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    refetch();
    if (error) {
      showApiErrorToast(error);
      console.error('Error fetching customers:', error);
    }
  }, [error, page, pageSize, searchTerm, startDate, endDate, refetch]);

  return (
    <div className="bg-gray-100 font-sans text-gray-700 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Customer Management</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-md p-4 shadow-sm flex flex-col justify-between h-32 relative">
            <div>
              <p className="text-1xl text-gray-500 mb-1">Total Customers</p>
              <p className="text-3xl font-semibold text-teal-700">
                {displayValue(data?.pagination?.totalRecords)}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-md p-4 shadow-sm flex flex-col justify-between h-32 relative">
            <div>
              <p className="text-1xl text-gray-500 mb-1">
                New Customer{' '}
                <span className="text-xs text-blue-600">(in 1 month)</span>
              </p>
              <p className="text-3xl font-semibold text-teal-700">
                {displayValue(data?.newCustomers)}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-md p-4 shadow-sm flex flex-col justify-between h-32 relative">
            <div>
              <p className="text-1xl text-gray-500 mb-1">Active Customers</p>
              <p className="text-3xl font-semibold text-teal-700">
                {displayValue(data?.activeCustomers)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-6 border-b border-gray-300 mb-6 text-sm font-medium overflow-x-auto scrollbar-hide">
          <button
            className={`pb-3 whitespace-nowrap ${
              activeTab === 'all customers'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'hover:text-teal-600'
            }`}
            onClick={() => setActiveTab('all customers')}
          >
            All customers
          </button>
          <button
            className={`pb-3 whitespace-nowrap ${
              activeTab === 'E-KYC Requests'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'hover:text-teal-600'
            }`}
            onClick={() => setActiveTab('E-KYC Requests')}
          >
            E-KYC Requests
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 space-y-3 sm:space-y-0">
          <input
            type="text"
            placeholder="Search customers..."
            className="flex-grow rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="flex items-center space-x-2">
              <DatePicker
                label="Start Date"
                value={startDate ? new Date(startDate) : null}
                onChange={(date) =>
                  setStartDate(date ? date.toISOString().split('T')[0] : '')
                }
                slotProps={{
                  textField: {
                    size: 'small',
                    className: 'bg-white rounded-md',
                  },
                }}
              />
              <span className="text-gray-400">to</span>
              <DatePicker
                label="End Date"
                value={endDate ? new Date(endDate) : null}
                onChange={(date) =>
                  setEndDate(date ? date.toISOString().split('T')[0] : '')
                }
                slotProps={{
                  textField: {
                    size: 'small',
                    className: 'bg-white rounded-md',
                  },
                }}
              />
            </div>
          </LocalizationProvider>

          <button
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-md px-4 py-2 text-sm flex items-center space-x-1"
            onClick={() =>
              downloadExcelFile(
                `${import.meta.env.VITE_AUTH_SERVICE_DEV_API_URL}/admin/proxy/customers/export`,
                'customers.xlsx',
              )
            }
          >
            <i className="fas fa-download"></i>
            <span>Download Excel</span>
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 text-sm flex items-center space-x-1"
            onClick={() => {
              setSearchTerm('');
              setStartDate('');
              setEndDate('');
            }}
          >
            <i className="fas fa-times"></i>
            <span>Clear All</span>
          </button>
        </div>

        {/* DataGrid Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={customers}
              columns={columns}
              loading={isLoading}
              filterMode="client"
              pagination
              paginationMode="server"
              paginationModel={{ page, pageSize }}
              onPaginationModelChange={({
                page: newPage,
                pageSize: newPageSize,
              }) => {
                setPage(newPage);
                setPageSize(newPageSize);
              }}
              rowCount={data?.pagination?.totalRecords || 0}
              pageSizeOptions={[10, 25, 50, 100]}
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

export default CustomerManagement;
