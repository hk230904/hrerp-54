
import { useEffect } from 'react';
import MetricCard from '@/components/Dashboard/MetricCard';
import AttendanceChart from '@/components/Dashboard/Charts/AttendanceChart';
import PerformanceChart from '@/components/Dashboard/Charts/PerformanceChart';
import QuickActions from '@/components/Dashboard/QuickActions';
import RecentActivities from '@/components/Dashboard/RecentActivities';
import QuickStats from '@/components/Dashboard/QuickStats';
import { Users, Clock, Calendar, TrendingUp } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { usePermissions } from '@/hooks/usePermissions';
import { useEmployees } from '@/hooks/useEmployees';

const Dashboard = () => {
  const { user } = useUser();
  const { hasPermission } = usePermissions();
  const { getEmployeeStats } = useEmployees();

  useEffect(() => {
    console.log('Dashboard loaded successfully');
  }, []);

  const employeeStats = getEmployeeStats();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}
        </h1>
        <p className="text-gray-600">Here's what's happening in your organization today</p>
      </div>

      {/* Quick Stats - Enhanced overview */}
      <QuickStats />

      {/* Main Metrics Cards */}
      {hasPermission('view_analytics') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Employees"
            value={employeeStats.total.toString()}
            change={{ value: 0, type: 'neutral' }}
            icon={Users}
          />
          <MetricCard
            title="Attendance Rate"
            value="0%"
            change={{ value: 0, type: 'neutral' }}
            icon={Clock}
          />
          <MetricCard
            title="Pending Leaves"
            value="0"
            change={{ value: 0, type: 'neutral' }}
            icon={Calendar}
          />
          <MetricCard
            title="Performance Score"
            value="0"
            change={{ value: 0, type: 'neutral' }}
            icon={TrendingUp}
          />
        </div>
      )}

      {/* Charts Section */}
      {hasPermission('view_analytics') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttendanceChart />
          <PerformanceChart />
        </div>
      )}

      {/* Quick Actions and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentActivities />
      </div>
    </div>
  );
};

export default Dashboard;
