import { useState, useMemo } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useGetAllMerchantsQuery } from '../../services/merchant/merchant.service';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import MerchantEkyc from './MerchantEkyc'; // Import the MerchantEkyc component
import { renderStatusBadge } from '../../utility/ui.utils';

const MerchantManagement = () => {
  const [activeTab, setActiveTab] = useState<'All merchant' | 'Ekyc Request'>(
    'All merchant',
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [page, setPage] = useState(0); // 0-based for MUI
  const [pageSize, setPageSize] = useState(10);

  const queryParams = useMemo(
    () => ({
      page: page + 1,
      limit: pageSize,
      startDate,
      endDate,
      identity_verification_status:
        activeTab === 'Ekyc Request' ? 'pending' : undefined,
    }),
    [page, pageSize, startDate, endDate, activeTab],
  );

  const { data, isLoading } = useGetAllMerchantsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const rows = useMemo(() => {
    return (data?.data || []).map((user: any) => ({
      id: user._id,
      name:
        `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() || user.email,
      userId: user._id,
      qrCode: user.wallet?.qr_code,
      contact: user.wallet?.wallet_mobile_number || 'NA',
      createdAt: new Date(user.createdAt).toLocaleDateString(),
      status: user.is_active ? 'Active' : 'Inactive',
      ekyc: user.identity_verification_status,
    }));
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center space-x-2">
          <span className="text-sm">{params.value}</span>
        </div>
      ),
    },
    { field: 'userId', headerName: 'User ID', width: 200 },
    {
      field: 'qrCode',
      headerName: 'QR Code',
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <img src={params.value} alt="QR" className="w-10 h-10" />
        ) : (
          <span className="text-xs text-gray-400">NA</span>
        ),
    },
    { field: 'contact', headerName: 'Contact', width: 150 },
    { field: 'createdAt', headerName: 'Joined Date', width: 150 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            params.value === 'Active'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: 'ekyc',
      headerName: 'E-KYC',
      width: 120,
      renderCell: (params) => renderStatusBadge(params.value),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <div className="flex space-x-1">
          <Tooltip title="View">
            <IconButton size="small" color="primary">
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" color="warning">
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error">
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-100 font-sans text-gray-700 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Merchant Management</h1>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-300 mb-6 text-sm font-medium">
          {['All merchant', 'Ekyc Request'].map((tab) => (
            <button
              key={tab}
              className={`pb-3 ${
                activeTab === tab
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'hover:text-teal-600'
              }`}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Ekyc Request' ? (
          <MerchantEkyc />
        ) : (
          <>
            {/* Filters */}
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
              <button className="bg-teal-600 hover:bg-teal-700 text-white rounded-md px-4 py-2 text-sm flex items-center space-x-1">
                <i className="fas fa-download"></i>
                <span>Download Excel</span>
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 text-sm"
                onClick={() => {
                  setStartDate('');
                  setEndDate('');
                }}
              >
                Clear All
              </button>
            </div>

            {/* DataGrid Table */}
            <div className="bg-white rounded-lg shadow-sm">
              <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  loading={isLoading}
                  pagination
                  paginationMode="server"
                  rowCount={data?.pagination?.totalRecords || 0}
                  paginationModel={{ page, pageSize }}
                  onPaginationModelChange={({
                    page: newPage,
                    pageSize: newPageSize,
                  }) => {
                    setPage(newPage);
                    setPageSize(newPageSize);
                  }}
                  getRowId={(row) => row.id}
                  pageSizeOptions={[10, 25, 50, 100]}
                  checkboxSelection={false}
                  disableRowSelectionOnClick
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
          </>
        )}
      </div>
    </div>
  );
};

export default MerchantManagement;
