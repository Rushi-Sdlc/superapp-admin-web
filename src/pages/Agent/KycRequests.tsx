import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface UserDetails {
  _id: string;
  role: string;
  identity_verification_status: string;
  is_active?: boolean;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  phone?: number;
  country?: string;
}

interface Document {
  type: string;
  url: string;
  status?: string;
}

interface KYCRequest {
  _id: string;
  user_id: string;
  createdAt: string;
  identity_verification_status: string;
  verification_method: string;
  driving_license_document: string;
  national_id_document: string;
  biometric_image: string;
  passport_id_document: string;
  updatedAt?: string;
  userDetails: UserDetails;
  documents?: Document[];
  status?: string;
  rejection_reason?: string;
}

const KycManagement: React.FC = () => {
  // Static data for UI demonstration
  const kycRequests: KYCRequest[] = [
    {
      _id: '1',
      user_id: 'user123',
      createdAt: '2023-05-15T10:30:00Z',
      identity_verification_status: 'pending',
      verification_method: 'national_id',
      driving_license_document: '',
      national_id_document: '',
      biometric_image: '',
      passport_id_document: '',
      userDetails: {
        _id: 'user123',
        role: 'customer',
        identity_verification_status: 'pending',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: 1234567890,
        country: 'United States',
      },
    },
  ];

  const [selectedRequest] = React.useState<KYCRequest | null>(null);
  const loading = false;
  const error = null;
  const filterApplied = false;
  const currentPage = 1;
  const entriesPerPage = 10;
  const totalPages = 1;

  const getStatusBadge = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
            Rejected
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-4 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
            In-progress
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md text-center">
          <h3 className="font-bold mb-2">Error Loading Data</h3>
          <p>{error}</p>
          <button className="mt-3 bg-teal-600 text-white px-4 py-2 rounded text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 font-sans text-gray-700 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-md p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Total KYC Requests</p>
            <p className="text-3xl font-semibold text-teal-700">
              {kycRequests.length}
            </p>
          </div>
          <div className="bg-white rounded-md p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Pending Requests</p>
            <p className="text-3xl font-semibold text-teal-700">
              {
                kycRequests.filter(
                  (req) =>
                    req.userDetails.identity_verification_status !==
                      'approved' &&
                    req.userDetails.identity_verification_status !== 'rejected',
                ).length
              }
            </p>
          </div>
          <div className="bg-white rounded-md p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">Approved Requests</p>
            <p className="text-3xl font-semibold text-teal-700">
              {
                kycRequests.filter(
                  (req) =>
                    req.userDetails.identity_verification_status === 'approved',
                ).length
              }
            </p>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 space-y-3 sm:space-y-0">
          <input
            type="text"
            placeholder="Search by user ID, name, email, phone or request ID..."
            className="flex-grow rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-0"
            value=""
            readOnly
          />
          <div className="flex items-center space-x-2">
            <input
              type="date"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value=""
              readOnly
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value=""
              readOnly
            />
          </div>
          <button className="bg-teal-600 hover:bg-teal-700 text-white rounded-md px-4 py-2 text-sm flex items-center space-x-1 whitespace-nowrap">
            <i className="fas fa-filter"></i>
            <span>Apply Filters</span>
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 text-sm flex items-center space-x-1 whitespace-nowrap">
            <i className="fas fa-times"></i>
            <span>Clear All</span>
          </button>
        </div>

        {/* Current filter status */}
        <div className="mb-4 text-sm text-gray-600">
          Showing 1 to {Math.min(entriesPerPage, kycRequests.length)} of{' '}
          {kycRequests.length} requests
          {filterApplied && (
            <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full text-xs">
              Filters applied
            </span>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left w-8">
                  <input type="checkbox" readOnly />
                </th>
                <th className="px-4 py-3 text-left font-semibold">fullName</th>
                <th className="px-4 py-3 text-left font-semibold">Phone</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">email</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {kycRequests.length > 0 ? (
                kycRequests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input type="checkbox" readOnly />
                    </td>
                    <td className="px-4 py-3">
                      {request.userDetails?.first_name}{' '}
                      {request.userDetails?.last_name}
                    </td>
                    <td className="px-4 py-3">{request?.userDetails?.phone}</td>
                    <td className="px-4 py-3 w-20">
                      {getStatusBadge(
                        request.userDetails.identity_verification_status,
                      )}
                    </td>
                    <td className="px-4 py-3">{request.userDetails?.email}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          className="text-green-600 hover:text-green-800"
                          title="Approve"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          title="Reject"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No KYC requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {kycRequests.length > entriesPerPage && (
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-500">
              Showing 1 to {Math.min(entriesPerPage, kycRequests.length)} of{' '}
              {kycRequests.length} entries
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 border rounded text-sm opacity-50 cursor-not-allowed">
                Previous
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    className={`px-3 py-1 border rounded text-sm ${currentPage === number ? 'bg-teal-600 text-white' : 'hover:bg-gray-50'}`}
                  >
                    {number}
                  </button>
                ),
              )}

              <button className="px-3 py-1 border rounded text-sm opacity-50 cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        )}

        {/* Detailed View Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    KYC Request Details
                  </h3>
                  <button className="text-gray-500 hover:text-gray-700">
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      User Information
                    </h4>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Name:</span>{' '}
                        {selectedRequest?.userDetails?.first_name}{' '}
                        {selectedRequest?.userDetails?.last_name}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{' '}
                        {selectedRequest?.userDetails?.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span>{' '}
                        {selectedRequest?.userDetails?.phone}
                      </p>
                      <p>
                        <span className="font-medium">Country:</span>{' '}
                        {selectedRequest?.userDetails?.country}
                      </p>
                      <p>
                        <span className="font-medium">verification method</span>{' '}
                        {selectedRequest?.verification_method}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Request Information
                    </h4>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Status:</span>{' '}
                        {getStatusBadge(
                          selectedRequest.userDetails
                            .identity_verification_status ||
                            selectedRequest.status,
                        )}
                      </p>
                      <p>
                        <span className="font-medium">Submitted:</span>{' '}
                        {formatDate(selectedRequest.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedRequest.documents &&
                  selectedRequest.documents.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 mb-3">
                        Submitted Documents
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedRequest.documents.map((doc, index) => (
                          <div key={index} className="border rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium capitalize">
                                  {doc.type}
                                </p>
                                {doc.status && (
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      doc.status === 'approved'
                                        ? 'bg-green-100 text-green-800'
                                        : doc.status === 'rejected'
                                          ? 'bg-red-100 text-red-800'
                                          : 'bg-yellow-100 text-yellow-800'
                                    }`}
                                  >
                                    {doc.status}
                                  </span>
                                )}
                              </div>
                              <a
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <i className="fas fa-external-link-alt"></i>{' '}
                                View
                              </a>
                            </div>
                            <div className="mt-2">
                              <img
                                src={doc.url}
                                alt={`${doc.type} document`}
                                className="w-full h-auto rounded border"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center space-x-2">
                    <i className="fas fa-check"></i>
                    <span>Approve KYC</span>
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center space-x-2">
                    <i className="fas fa-times"></i>
                    <span>Reject KYC</span>
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KycManagement;
