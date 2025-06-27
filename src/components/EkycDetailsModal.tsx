import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

interface MerchantEkycModalProps {
  open: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  data: any | null;
}

const EkycDetailsModal: React.FC<MerchantEkycModalProps> = ({
  open,
  onClose,
  onApprove,
  onReject,
  data,
}) => {
  const user = data?.userDetails || {};
  const request = data || {};
  const formatDateTime = (value?: string) => {
    if (!value) return 'N/A';
    return new Date(value).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="font-semibold text-lg bg-gray-100">
        Merchant eKYC Details
      </DialogTitle>
      <DialogContent className="space-y-6 py-4">
        <div>
          <h3 className="text-md font-semibold mb-2 text-teal-700">
            User Information
          </h3>
          <div className="space-y-1 text-sm">
            <div>
              <strong>Name:</strong>{' '}
              {`${user.first_name ?? 'N/A'} ${user.last_name ?? ''}`}
            </div>
            <div>
              <strong>Email:</strong> {user.email || 'N/A'}
            </div>
            <div>
              <strong>Phone:</strong> {user.phone_number || 'N/A'}
            </div>
            <div>
              <strong>Country:</strong> {user.country || 'N/A'}
            </div>
            <div>
              <strong>Verification Method:</strong>{' '}
              {user.verification_method || 'N/A'}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2 text-teal-700">
            Request Information
          </h3>
          <div className="space-y-1 text-sm">
            <div>
              <strong>Status:</strong>{' '}
              {request.identity_verification_status || 'N/A'}
            </div>
            <div>
              <strong>Submitted:</strong> {formatDateTime(request.createdAt)}
            </div>
            <div>
              <strong>Last Updated:</strong> {formatDateTime(request.updatedAt)}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-2 text-teal-700">
            Documents
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'national_id_document',
              'driving_license_document',
              'passport_document',
            ].some((key) => request[key]?.length) ? (
              [
                'national_id_document',
                'driving_license_document',
                'passport_document',
              ].flatMap(
                (key) =>
                  request[key]?.map((url: string, index: number) => (
                    <div
                      key={`${key}-${index}`}
                      className="border rounded-md overflow-hidden shadow-sm"
                    >
                      <img
                        src={url}
                        alt={`${key} ${index + 1}`}
                        className="w-full h-40 object-cover"
                      />
                      <div className="text-xs text-center py-1 bg-gray-100 capitalize">
                        {key.replace('_document', '').replace('_', ' ')}{' '}
                        {index + 1}
                      </div>
                    </div>
                  )) || [],
              )
            ) : (
              <p className="text-sm text-gray-500">N/A</p>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions className="p-4 border-t bg-gray-50">
        <Button onClick={onReject} variant="outlined" color="error">
          Reject
        </Button>
        <Button onClick={onApprove} variant="outlined" color="success">
          Approve
        </Button>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EkycDetailsModal;
