import React, { useState, useMemo } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import KycManagement from '../Agent/KycRequests';

interface User {
  _id: string;
  first_name: string;
  last_name?: string;
  phone: number;
  email?: string;
  createdAt: string;
  updatedAt?: string;
  is_active: boolean;
  kyc?: {
    nationalIdVerified: boolean;
    documentType?: string;
    frontImage?: string;
    backImage?: string;
    status?: 'pending' | 'approved' | 'rejected';
    rejectionReason?: string;
  }[];
  wallet?: {
    balance: number;
    currency: string;
    qr_code?: string;
  };
  individual_id?: string;
}

const AgentManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // This will be empty as functionality is removed
  // const [loading, setLoading] = useState<boolean>(false); // Set to false for UI-only
  // const [error, setError] = useState<string | null>(null); // Set to null for UI-only
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateRange, setDateRange] = useState<{
    start: string;
    end: string;
  }>({ start: '', end: '' });
  const [filterApplied, setFilterApplied] = useState<boolean>(false);
  // const [deletingId, setDeletingId] = useState<string | null>(null);
  // const [deleteError, setDeleteError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'customers' | 'kyc'>('customers');

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [entriesPerPage] = useState<number>(15);

  // Mock data for UI presentation
  useMemo(() => {
    const mockUsers: User[] = [
      {
        _id: '1',
        first_name: 'John',
        last_name: 'Doe',
        phone: 1234567890,
        email: 'john.doe@example.com',
        createdAt: '2024-01-15T10:00:00Z',
        is_active: true,
        individual_id: 'USER12345',
        wallet: {
          balance: 1500.75,
          currency: 'USD',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '2',
        first_name: 'Jane',
        last_name: 'Smith',
        phone: 9876543210,
        email: 'jane.smith@example.com',
        createdAt: '2024-02-20T11:30:00Z',
        is_active: false,
        individual_id: 'USER67890',
        wallet: {
          balance: 500.0,
          currency: 'EUR',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: false }],
      },
      {
        _id: '3',
        first_name: 'Peter',
        last_name: 'Jones',
        phone: 1122334455,
        email: 'peter.jones@example.com',
        createdAt: '2024-05-01T14:00:00Z',
        is_active: true,
        individual_id: 'USER11223',
        wallet: {
          balance: 2500.2,
          currency: 'GBP',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '4',
        first_name: 'Alice',
        last_name: 'Williams',
        phone: 5544332211,
        email: 'alice.w@example.com',
        createdAt: '2023-11-10T09:00:00Z',
        is_active: true,
        individual_id: 'USER44556',
        wallet: {
          balance: 800.5,
          currency: 'USD',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: false }],
      },
      {
        _id: '5',
        first_name: 'Bob',
        last_name: 'Brown',
        phone: 9988776655,
        email: 'bob.b@example.com',
        createdAt: '2024-06-05T16:00:00Z',
        is_active: true,
        individual_id: 'USER77889',
        wallet: {
          balance: 120.0,
          currency: 'JPY',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '6',
        first_name: 'Charlie',
        last_name: 'Davis',
        phone: 1029384756,
        email: 'charlie.d@example.com',
        createdAt: '2024-04-25T13:15:00Z',
        is_active: false,
        individual_id: 'USER99001',
        wallet: {
          balance: 300.0,
          currency: 'USD',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: false }],
      },
      {
        _id: '7',
        first_name: 'Diana',
        last_name: 'Miller',
        phone: 6789012345,
        email: 'diana.m@example.com',
        createdAt: '2024-03-12T10:45:00Z',
        is_active: true,
        individual_id: 'USER22334',
        wallet: {
          balance: 1800.9,
          currency: 'CAD',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '8',
        first_name: 'Eve',
        last_name: 'Wilson',
        phone: 2345678901,
        email: 'eve.w@example.com',
        createdAt: '2024-01-01T08:00:00Z',
        is_active: true,
        individual_id: 'USER55667',
        wallet: {
          balance: 950.0,
          currency: 'AUD',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '9',
        first_name: 'Frank',
        last_name: 'Moore',
        phone: 8765432109,
        email: 'frank.m@example.com',
        createdAt: '2023-10-20T17:00:00Z',
        is_active: false,
        individual_id: 'USER88990',
        wallet: {
          balance: 70.0,
          currency: 'NZD',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: false }],
      },
      {
        _id: '10',
        first_name: 'Grace',
        last_name: 'Taylor',
        phone: 3456789012,
        email: 'grace.t@example.com',
        createdAt: '2024-02-05T11:00:00Z',
        is_active: true,
        individual_id: 'USER00112',
        wallet: {
          balance: 2000.0,
          currency: 'CHF',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '11',
        first_name: 'Henry',
        last_name: 'Anderson',
        phone: 4567890123,
        email: 'henry.a@example.com',
        createdAt: '2024-03-29T09:30:00Z',
        is_active: true,
        individual_id: 'USER33445',
        wallet: {
          balance: 450.0,
          currency: 'SEK',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '12',
        first_name: 'Ivy',
        last_name: 'Thomas',
        phone: 5678901234,
        email: 'ivy.t@example.com',
        createdAt: '2024-05-18T15:00:00Z',
        is_active: false,
        individual_id: 'USER66778',
        wallet: {
          balance: 600.0,
          currency: 'NOK',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: false }],
      },
      {
        _id: '13',
        first_name: 'Jack',
        last_name: 'Jackson',
        phone: 6789012345,
        email: 'jack.j@example.com',
        createdAt: '2024-06-01T10:00:00Z',
        is_active: true,
        individual_id: 'USER99887',
        wallet: {
          balance: 1100.0,
          currency: 'DKK',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '14',
        first_name: 'Karen',
        last_name: 'White',
        phone: 7890123456,
        email: 'karen.w@example.com',
        createdAt: '2024-04-10T12:00:00Z',
        is_active: true,
        individual_id: 'USER22110',
        wallet: {
          balance: 220.0,
          currency: 'PLN',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: false }],
      },
      {
        _id: '15',
        first_name: 'Liam',
        last_name: 'Harris',
        phone: 8901234567,
        email: 'liam.h@example.com',
        createdAt: '2024-03-01T09:00:00Z',
        is_active: true,
        individual_id: 'USER55443',
        wallet: {
          balance: 150.0,
          currency: 'CZK',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '16',
        first_name: 'Mia',
        last_name: 'Martin',
        phone: 9012345678,
        email: 'mia.m@example.com',
        createdAt: '2024-01-22T14:30:00Z',
        is_active: false,
        individual_id: 'USER88776',
        wallet: {
          balance: 900.0,
          currency: 'HUF',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: false }],
      },
      {
        _id: '17',
        first_name: 'Noah',
        last_name: 'Garcia',
        phone: 1112233445,
        email: 'noah.g@example.com',
        createdAt: '2024-05-05T11:00:00Z',
        is_active: true,
        individual_id: 'USER11009',
        wallet: {
          balance: 3000.0,
          currency: 'ILS',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '18',
        first_name: 'Olivia',
        last_name: 'Rodriguez',
        phone: 2223344556,
        email: 'olivia.r@example.com',
        createdAt: '2024-06-08T16:00:00Z',
        is_active: true,
        individual_id: 'USER44332',
        wallet: {
          balance: 750.0,
          currency: 'MXN',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '19',
        first_name: 'Patrick',
        last_name: 'Martinez',
        phone: 3334455667,
        email: 'patrick.m@example.com',
        createdAt: '2024-02-14T10:00:00Z',
        is_active: false,
        individual_id: 'USER77665',
        wallet: {
          balance: 400.0,
          currency: 'INR',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: false }],
      },
      {
        _id: '20',
        first_name: 'Quinn',
        last_name: 'Hernandez',
        phone: 4445566778,
        email: 'quinn.h@example.com',
        createdAt: '2024-04-01T08:00:00Z',
        is_active: true,
        individual_id: 'USER00998',
        wallet: {
          balance: 1600.0,
          currency: 'BRL',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '21',
        first_name: 'Rachel',
        last_name: 'Lopez',
        phone: 5556677889,
        email: 'rachel.l@example.com',
        createdAt: '2024-03-07T13:00:00Z',
        is_active: true,
        individual_id: 'USER33221',
        wallet: {
          balance: 200.0,
          currency: 'ZAR',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '22',
        first_name: 'Sam',
        last_name: 'Gonzales',
        phone: 6667788990,
        email: 'sam.g@example.com',
        createdAt: '2024-01-09T11:00:00Z',
        is_active: false,
        individual_id: 'USER66554',
        wallet: {
          balance: 80.0,
          currency: 'EGP',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: false }],
      },
      {
        _id: '23',
        first_name: 'Tina',
        last_name: 'Perez',
        phone: 7778899001,
        email: 'tina.p@example.com',
        createdAt: '2024-05-20T17:00:00Z',
        is_active: true,
        individual_id: 'USER99887',
        wallet: {
          balance: 1200.0,
          currency: 'PKR',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '24',
        first_name: 'Umar',
        last_name: 'Sanchez',
        phone: 8889900112,
        email: 'umar.s@example.com',
        createdAt: '2024-04-15T09:00:00Z',
        is_active: true,
        individual_id: 'USER22110',
        wallet: {
          balance: 650.0,
          currency: 'NGN',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '25',
        first_name: 'Victoria',
        last_name: 'Ramirez',
        phone: 9990011223,
        email: 'victoria.r@example.com',
        createdAt: '2024-03-03T14:00:00Z',
        is_active: false,
        individual_id: 'USER55443',
        wallet: {
          balance: 90.0,
          currency: 'ARS',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: false }],
      },
      {
        _id: '26',
        first_name: 'Walter',
        last_name: 'Flores',
        phone: 1001122334,
        email: 'walter.f@example.com',
        createdAt: '2024-01-29T10:00:00Z',
        is_active: true,
        individual_id: 'USER88776',
        wallet: {
          balance: 1800.0,
          currency: 'CLP',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '27',
        first_name: 'Xenia',
        last_name: 'Rivera',
        phone: 2112233445,
        email: 'xenia.r@example.com',
        createdAt: '2024-05-10T15:00:00Z',
        is_active: true,
        individual_id: 'USER11009',
        wallet: {
          balance: 350.0,
          currency: 'COP',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '28',
        first_name: 'Yara',
        last_name: 'Gomez',
        phone: 3223344556,
        email: 'yara.g@example.com',
        createdAt: '2024-06-02T11:00:00Z',
        is_active: false,
        individual_id: 'USER44332',
        wallet: {
          balance: 50.0,
          currency: 'PEN',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: false }],
      },
      {
        _id: '29',
        first_name: 'Zane',
        last_name: 'Diaz',
        phone: 4334455667,
        email: 'zane.d@example.com',
        createdAt: '2024-02-28T09:00:00Z',
        is_active: true,
        individual_id: 'USER77665',
        wallet: {
          balance: 2500.0,
          currency: 'VES',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: true }],
      },
      {
        _id: '30',
        first_name: 'Amy',
        last_name: 'Lee',
        phone: 5445566778,
        email: 'amy.l@example.com',
        createdAt: '2024-04-20T16:00:00Z',
        is_active: true,
        individual_id: 'USER00998',
        wallet: {
          balance: 100.0,
          currency: 'SGD',
          qr_code: 'https://via.placeholder.com/40',
        },
        kyc: [{ nationalIdVerified: false }],
      },
    ];
    setUsers(mockUsers);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when search changes

    if (value || dateRange.start || dateRange.end) {
      setFilterApplied(true);
    } else {
      setFilterApplied(false);
    }
  };

  const applyFilters = () => {
    setFilterApplied(true);
    setCurrentPage(1); // Reset to first page when applying filters
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user: User) => {
      const searchTermLower = searchTerm.toLowerCase();
      const fullName =
        `${user.first_name} ${user.last_name || ''}`.toLowerCase();

      const matchesSearch = searchTerm
        ? fullName.includes(searchTermLower) ||
          String(user.phone).includes(searchTerm) || // Convert phone to string for search
          user.individual_id?.toLowerCase().includes(searchTermLower) ||
          user.email?.toLowerCase().includes(searchTermLower)
        : true;

      let matchesDateRange = true;
      if (dateRange.start || dateRange.end) {
        const userDate = new Date(user.createdAt);
        userDate.setHours(0, 0, 0, 0); // Normalize to start of day

        if (dateRange.start) {
          const startDate = new Date(dateRange.start);
          startDate.setHours(0, 0, 0, 0);
          if (userDate < startDate) {
            matchesDateRange = false;
          }
        }

        if (dateRange.end) {
          const endDate = new Date(dateRange.end);
          endDate.setHours(23, 59, 59, 999); // End of the day
          if (userDate > endDate) {
            matchesDateRange = false;
          }
        }
      }

      return matchesSearch && matchesDateRange;
    });
  }, [users, searchTerm, dateRange.start, dateRange.end]);

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'start' | 'end',
  ) => {
    const value = e.target.value;
    setDateRange((prev) => ({
      ...prev,
      [type]: value,
    }));

    // Reset end date if it's before start date when start date changes
    if (
      type === 'start' &&
      value &&
      dateRange.end &&
      new Date(value) > new Date(dateRange.end)
    ) {
      setDateRange((prev) => ({
        ...prev,
        end: value,
      }));
    }

    setCurrentPage(1);
    setFilterApplied(!!value || !!searchTerm);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDateRange({ start: '', end: '' });
    setFilterApplied(false);
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  // Get current users for pagination
  const indexOfLastUser = currentPage * entriesPerPage;
  const indexOfFirstUser = indexOfLastUser - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isKycVerified = (user: User) => {
    return user.kyc && user.kyc.length > 0 && user.kyc[0].nationalIdVerified;
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
          <button
            onClick={() => window.location.reload()}
            className="mt-3 bg-teal-600 text-white px-4 py-2 rounded text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 font-sans text-gray-700 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-300 mb-6 text-sm font-medium overflow-x-auto scrollbar-hide">
          <button
            className={`pb-3 whitespace-nowrap ${activeTab === 'customers' ? 'text-teal-600 border-b-2 border-teal-600' : 'hover:text-teal-600'}`}
            onClick={() => setActiveTab('customers')}
          >
            All Customers
          </button>
          <button
            className={`pb-3 whitespace-nowrap ${activeTab === 'kyc' ? 'text-teal-600 border-b-2 border-teal-600' : 'hover:text-teal-600'}`}
            onClick={() => setActiveTab('kyc')}
          >
            E-KYC request
          </button>
        </div>

        {activeTab === 'customers' ? (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-md p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Total Agent</p>
                <p className="text-3xl font-semibold text-teal-700">
                  {users.length}
                </p>
              </div>
              <div className="bg-white rounded-md p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">
                  New Agent <span className="text-blue-600">(in 1 month)</span>
                </p>
                <p className="text-3xl font-semibold text-teal-700">
                  {
                    users.filter((user) => {
                      const oneMonthAgo = new Date();
                      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                      return new Date(user.createdAt) > oneMonthAgo;
                    }).length
                  }
                </p>
              </div>
              <div className="bg-white rounded-md p-4 shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Active Customers</p>
                <p className="text-3xl font-semibold text-teal-700">
                  {users.filter((user) => user.is_active).length}
                </p>
              </div>
            </div>

            {/* Delete Error Message */}
            {deleteError && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>{deleteError}</p>
              </div>
            )}

            <p className="text-gray-700 font-semibold mb-3">
              Showing {indexOfFirstUser + 1} to{' '}
              {Math.min(indexOfLastUser, filteredUsers.length)} of{' '}
              {filteredUsers.length}{' '}
              {filteredUsers.length === 1 ? 'Customer' : 'Customers'}
            </p>

            {/* Search + Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 space-y-3 sm:space-y-0">
              <input
                type="text"
                placeholder="Search by mobile, name, user ID..."
                className="flex-grow rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-0"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
              />
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={dateRange.start}
                  onChange={(e) => handleDateChange(e, 'start')}
                  max={dateRange.end || undefined}
                />
                <span className="text-gray-400">to</span>
                <input
                  type="date"
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={dateRange.end}
                  onChange={(e) => handleDateChange(e, 'end')}
                  min={dateRange.start || undefined}
                />
              </div>
              <button
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-md px-4 py-2 text-sm flex items-center space-x-1 whitespace-nowrap"
                onClick={applyFilters}
              >
                <i className="fas fa-filter"></i>
                <span>Apply Filters</span>
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 text-sm flex items-center space-x-1 whitespace-nowrap"
                onClick={resetFilters}
              >
                <i className="fas fa-times"></i>
                <span>Clear All</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-4 py-3 text-left w-8">
                      <input type="checkbox" />
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">
                      User ID
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      QR Code{' '}
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Joined Date
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">E-KYC</th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Bank Details
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Total Transaction
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input type="checkbox" />
                        </td>
                        <td className="px-4 py-3 font-medium">
                          {user.first_name} {user.last_name || ''}
                        </td>
                        <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                          {user.individual_id}
                        </td>
                        <td className="px-4 py-3">
                          {user.wallet?.qr_code ? (
                            <img
                              src={user.wallet.qr_code}
                              alt="QR Code"
                              className="w-10 h-10 object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  'https://via.placeholder.com/40';
                              }}
                            />
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span>{user.phone}</span>
                            {user.email && (
                              <span className="text-xs text-gray-500">
                                {user.email}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.is_active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              isKycVerified(user)
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {isKycVerified(user) ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">N/A</td>
                        <td className="px-4 py-3">
                          {user.wallet ? (
                            <span className="font-medium">
                              {user.wallet.currency}{' '}
                              {user.wallet.balance.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
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
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className={`text-red-600 hover:text-red-800 ${deletingId === user._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                              title="Delete"
                              // onClick={() => handleDelete(user._id)} // Removed functionality
                              disabled={deletingId === user._id}
                            >
                              {deletingId === user._id ? (
                                <i className="fas fa-spinner fa-spin"></i>
                              ) : (
                                <i className="fas fa-trash-alt"></i>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={11}
                        className="px-4 py-6 text-center text-gray-500"
                      >
                        {filterApplied
                          ? 'No customers match your filters'
                          : 'No customers found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredUsers.length > 0 && (
              <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstUser + 1} to{' '}
                  {Math.min(indexOfLastUser, filteredUsers.length)} of{' '}
                  {filteredUsers.length} entries
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 border rounded text-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                  >
                    Previous
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-3 py-1 border rounded text-sm ${currentPage === number ? 'bg-teal-600 text-white' : 'hover:bg-gray-50'}`}
                      >
                        {number}
                      </button>
                    ),
                  )}

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 border rounded text-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <KycManagement />
        )}
      </div>
    </div>
  );
};

export default AgentManagement;
