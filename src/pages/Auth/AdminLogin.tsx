import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginAdminMutation } from '../../services/auth/auth.service';
import { useAuth } from '../../context/AuthContext';
import { showApiErrorToast, showSuccessToast } from '../../utility/utility';

const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', passcode: '' });
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginAdmin(formData).unwrap();

      login(response?.data?.accessToken);

      showSuccessToast(response?.message || 'Login successful!');
      navigate('/');
    } catch (err) {
      showApiErrorToast(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Passcode
            </label>
            <input
              type="password"
              name="passcode"
              placeholder="••••••••"
              value={formData.passcode}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-600 text-white font-semibold py-2 rounded-md hover:bg-teal-700 transition"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
