// MerchantEkyc.tsx
import { useState, useMemo } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import {
  useApproveMerchantMutation,
  useGetEkycMerchantsQuery,
  useRejectMerchantMutation,
} from '../../services/merchant/merchant.service';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Visibility } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { renderStatusBadge } from '../../utility/ui.utils';
import MerchantEkycModal from '../../components/EkycDetailsModal';
import { showApiErrorToast, showSuccessToast } from '../../utility/utility';
import Dialog from '@mui/material/Dialog';

const MerchantEkyc = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<'approve' | 'reject'>(
    'approve',
  );
  const [confirmAction, setConfirmAction] = useState<() => void>(
    () => () => {},
  );
  const [rejectReason, setRejectReason] = useState('');

  const [approveMerchant] = useApproveMerchantMutation();
  const [rejectMerchant] = useRejectMerchantMutation();

  const queryParams = useMemo(() => {
    return {
      page: page + 1,
      limit: pageSize,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    };
  }, [page, pageSize, startDate, endDate]);

  const { data, isLoading, refetch } = useGetEkycMerchantsQuery(queryParams);

  const handleViewClick = (recordId: string) => {
    const record = data?.data?.find((item) => item._id === recordId);
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleApprove = () => {
    setConfirmType('approve');
    setConfirmAction(() => async () => {
      if (selectedRecord) {
        try {
          await approveMerchant({ id: selectedRecord._id }).unwrap();
          showSuccessToast('Merchant eKYC request approved successfully');
          setIsModalOpen(false);
          refetch();
        } catch (err) {
          showApiErrorToast(err);
        }
      }
    });
    setConfirmOpen(true);
  };

  const handleReject = () => {
    setConfirmType('reject');
    setConfirmAction(() => async () => {
      if (selectedRecord) {
        try {
          await rejectMerchant({
            id: selectedRecord._id,
            rejection_reason: rejectReason,
          }).unwrap();
          showSuccessToast('Merchant eKYC request rejected successfully');
          setIsModalOpen(false);
          setRejectReason('');
          refetch();
        } catch (err) {
          showApiErrorToast(err);
        }
      }
    });
    setConfirmOpen(true);
  };

  const filteredRows = useMemo(() => {
    return (data?.data || [])
      .filter((record) => {
        const fullName =
          `${record.userDetails.first_name ?? ''} ${record.userDetails.last_name ?? ''}`.toLowerCase();
        const email = record.userDetails.email?.toLowerCase() ?? '';
        const search = searchTerm.toLowerCase();
        return fullName.includes(search) || email.includes(search);
      })
      .map((record) => ({
        id: record._id,
        name:
          `${record.userDetails.first_name ?? ''} ${record.userDetails.last_name ?? ''}`.trim() ||
          'NA',
        email: record.userDetails.email || 'NA',
        phone: record.userDetails.merchant_id || 'NA',
        status: record.userDetails.identity_verification_status || 'NA',
      }));
  }, [data, searchTerm]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center space-x-2">
          <span className="text-sm">{params.value || 'NA'}</span>
        </div>
      ),
    },
    {
      field: 'phone',
      headerName: 'Merchant ID',
      width: 200,
      renderCell: (params) => <span>{params.value || 'NA'}</span>,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 220,
      renderCell: (params) => <span>{params.value || 'NA'}</span>,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: (params) => renderStatusBadge(params.value || 'NA'),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Tooltip title="View">
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleViewClick(params.row.id)}
          >
            <Visibility fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
        <input
          type="text"
          placeholder="Search by name or email..."
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
                textField: { size: 'small', className: 'bg-white rounded-md' },
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
                textField: { size: 'small', className: 'bg-white rounded-md' },
              }}
            />
          </div>
        </LocalizationProvider>
        <button className="bg-teal-600 hover:bg-teal-700 text-white rounded-md px-4 py-2 text-sm">
          Download Excel
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 text-sm"
          onClick={() => {
            setSearchTerm('');
            setStartDate('');
            setEndDate('');
          }}
        >
          Clear All
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-sm">
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
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
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell': { borderBottom: '1px solid #f3f4f6' },
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
        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <div className="p-5 max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Are you sure?
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              You are about to{' '}
              <span className="font-medium">{confirmType}</span> this merchant’s
              eKYC request. This action cannot be undone.
            </p>

            {confirmType === 'reject' && (
              <div className="mb-4">
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reason for Rejection
                </label>
                <textarea
                  id="reason"
                  className="w-full border rounded-md px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-red-400"
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter reason..."
                />
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setConfirmOpen(false);
                  setRejectReason('');
                }}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await confirmAction();
                  setConfirmOpen(false);
                }}
                disabled={
                  confirmType === 'reject' && rejectReason.trim() === ''
                }
                className={`px-4 py-2 rounded-md text-white ${
                  confirmType === 'approve'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                } disabled:opacity-50`}
              >
                Yes,{' '}
                {confirmType.charAt(0).toUpperCase() + confirmType.slice(1)}
              </button>
            </div>
          </div>
        </Dialog>
      </div>
      <MerchantEkycModal
        open={isModalOpen}
        onClose={handleModalClose}
        onApprove={handleApprove}
        onReject={handleReject}
        data={selectedRecord}
      />
    </div>
  );
};

export default MerchantEkyc;
