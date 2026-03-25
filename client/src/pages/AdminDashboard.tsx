import { useState, useEffect } from 'react';
import { Users, Calendar, Activity, AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';
import { Navbar } from '../components/ui/navbar';
import { adminService } from '../services/adminService';

// TypeScript interfaces define the "shape" of data
interface Stats {
  totalUsers: number;
  totalDoctors: number;
  totalAppointments: number;
  activeEmergencies: number;
  recentUsers: User[];
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
}

interface Appointment {
  _id: string;
  userId: { name: string; email: string };
  doctorId: { name: string; specialization: string };
  date: string;
  time: string;
  status: string;
}

const AdminDashboard = () => {
  // State for each tab's data
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'appointments'>('overview');
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  // Load different data based on active tab
  useEffect(() => {
    if (activeTab === 'users') loadUsers();
    if (activeTab === 'appointments') loadAppointments();
  }, [activeTab]);

  const loadStats = async () => {
    try {
      const response = await adminService.getStats();
      if (response.success) setStats(response.data);
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await adminService.getAllUsers();
      if (response.success) setUsers(response.data);
    } catch (err) {
      console.error('Error loading users:', err);
    }
  };

  const loadAppointments = async () => {
    try {
      const response = await adminService.getAllAppointments();
      if (response.success) setAppointments(response.data);
    } catch (err) {
      console.error('Error loading appointments:', err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await adminService.deleteUser(userId);
      // Remove from local state (no need to refetch)
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  // Tab button component
  const TabButton = ({ id, label }: { id: typeof activeTab, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 font-medium border-b-2 transition-colors ${
        activeTab === id 
          ? 'border-blue-600 text-blue-600' 
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      {label}
    </button>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6 flex gap-4">
          <TabButton id="overview" label="Overview" />
          <TabButton id="users" label="Users" />
          <TabButton id="appointments" label="Appointments" />
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-6">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Each card shows one stat */}
              {[
                { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'blue' },
                { label: 'Total Doctors', value: stats.totalDoctors, icon: Activity, color: 'green' },
                { label: 'Appointments', value: stats.totalAppointments, icon: Calendar, color: 'purple' },
                { label: 'Active Emergencies', value: stats.activeEmergencies, icon: AlertTriangle, color: 'red' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
                    </div>
                    <Icon className={`h-8 w-8 text-${color}-500`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Users Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Recent Registrations</h2>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Name', 'Email', 'Joined'].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stats.recentUsers.map(user => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">All Users ({users.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Name', 'Email', 'Role', 'Verified', 'Actions'].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.isVerified 
                          ? <CheckCircle className="h-5 w-5 text-green-500" />
                          : <span className="text-gray-400 text-sm">Pending</span>
                        }
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-700"
                          title="Delete user"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* APPOINTMENTS TAB */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">All Appointments ({appointments.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Patient', 'Doctor', 'Date', 'Time', 'Status'].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map(apt => (
                    <tr key={apt._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{apt.userId?.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{apt.doctorId?.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{apt.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{apt.time}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          apt.status === 'Booked' ? 'bg-blue-100 text-blue-700' :
                          apt.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;