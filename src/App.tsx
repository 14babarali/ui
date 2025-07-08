import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/doctor/Dashboard';
import ActiveSubscription from './pages/doctor/ActiveSubscription';
import Settings from './pages/doctor/Settings';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import Admin from './pages/admin/Admin';
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import PrivateRoute from './routes/PrivateRoute';
import NotFoundPage from './pages/NotFound';
import Patients from './pages/doctor/Patients';


const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> 
    
  },

  { path: '/admin', element: <Admin /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/dashboard/subscription', element: <ActiveSubscription /> },
  { path: '/dashboard/settings', element: <Settings /> },
  { path: '/dashboard/Doctor', element: <DoctorDashboard /> },
  { path: '/patients', element: <Patients /> },
  {
    element: <PrivateRoute />,
    children: [
     
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
