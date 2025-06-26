import { useEffect, useState } from 'react';
import { useGetAllCustomersQuery } from '../../services/customer/customer.service';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { showApiErrorToast } from '../../utility/utility';

const CustomerManagement = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const { data, error, isLoading } = useGetAllCustomersQuery({
    page: paginationModel.page,
    limit: paginationModel.pageSize,
  });

  useEffect(() => {
    if (error) {
      showApiErrorToast(error);
      console.error('Error fetching customer data:', error);
    }
  }, [error]);

  const displayValue = (value: string | number | null | undefined): string => {
    return value === null || value === undefined || value === ''
      ? 'NA'
      : String(value);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 180,
      renderCell: (params) => (
        <span>
          {displayValue(params.row?.first_name)}{' '}
          {displayValue(params.row?.last_name)}
        </span>
      ),
    },
    {
      field: 'individual_id',
      headerName: 'User ID',
      width: 230,
    },
    {
      field: 'qr_code',
      headerName: 'QR Code',
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row?.wallet?.qr_code || ''}
          alt="QR"
          className="w-10 h-10 object-contain"
        />
      ),
    },
    {
      field: 'wallet_mobile_number',
      headerName: 'Contact',
      width: 160,
      renderCell: (params) => (
        <span>{params.row?.wallet?.wallet_mobile_number || 'NA'}</span>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Joining Date',
      width: 180,
      renderCell: (params) => (
        <span>
          {params.row?.createdAt
            ? new Date(params.row.createdAt).toLocaleDateString()
            : 'NA'}
        </span>
      ),
    },
    {
      field: 'identity_verification_status',
      headerName: 'eKYC Status',
      width: 140,
      renderCell: (params) => {
        const status = params.row?.identity_verification_status;
        const colorMap = {
          completed: 'text-green-600',
          in_progress: 'text-yellow-600',
          failed: 'text-red-600',
        };
        return (
          <span
            className={`text-sm font-semibold ${colorMap[status] || 'text-gray-600'}`}
          >
            {displayValue(status?.replace(/_/g, ' '))}
          </span>
        );
      },
    },
    {
      field: 'is_active',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            params.row?.is_active
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {params.row?.is_active ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: () => (
        <div className="flex items-center space-x-2">
          <button title="View">
            <i className="fas fa-eye text-blue-600" />
          </button>
          <button title="Edit">
            <i className="fas fa-edit text-green-600" />
          </button>
          <button title="Delete">
            <i className="fas fa-trash text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data?.rows || []}
          rowCount={data?.total || 0}
          columns={columns}
          loading={isLoading}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
          pageSizeOptions={[10, 25, 50, 100]}
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
  );
};

export default CustomerManagement;
