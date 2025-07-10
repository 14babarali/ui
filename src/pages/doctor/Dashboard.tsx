import React from 'react';
import TableSection from '../../components/TableSection';
import PatientTable from '../../components/PatientTable';
import {
  Users,
  Activity,
  Calendar,
  Clock,
  Stethoscope,
  FileText,
  ArrowUpRight,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  // Dashboard mock data
  const stats = [
    { title: "Total Patients", value: "142", icon: Users, change: "+12%", trend: "up" },
    { title: "Appointments Today", value: "8", icon: Calendar, change: "+2", trend: "up" },
    { title: "Avg. Consultation", value: "15m", icon: Clock, change: "-2m", trend: "down" },
    { title: "Prescriptions", value: "23", icon: FileText, change: "+5", trend: "up" }
  ];

  const recentAppointments = [
    { name: "Sarah Johnson", time: "09:30 AM", status: "completed", condition: "Follow-up" },
    { name: "Michael Chen", time: "10:15 AM", status: "upcoming", condition: "Annual Checkup" },
    { name: "Emma Williams", time: "11:00 AM", status: "upcoming", condition: "Fever" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50">
                    <stat.icon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <p className={`text-sm mt-3 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last week
                </p>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Appointments */}
            <div className="bg-white rounded-xl shadow-sm border p-6 lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Today's Appointments</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  View all <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                {recentAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`p-2 rounded-full ${appointment.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'}`}>
                      <Stethoscope className={`h-4 w-4 ${appointment.status === 'completed' ? 'text-green-600' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{appointment.name}</p>
                      <p className="text-sm text-gray-500">{appointment.condition}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.time}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${appointment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Table */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <TableSection>
                  <PatientTable />
                </TableSection>
              </div>
            </div>
          </div>

          {/* Activity Chart Placeholder */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Weekly Activity</h2>
              <select className="text-sm border rounded-md px-3 py-1 focus:ring-blue-500 focus:border-blue-500">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <Activity className="h-12 w-12 text-gray-400" />
              <p className="ml-2 text-gray-500">Activity chart will appear here</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
