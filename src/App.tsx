import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import LandingPage from './pages/LandingPage';

import DoctorMainLayout from './pages/doctor/DoctorMainLayout';
import Admin from './pages/admin/Admin';

import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import PrivateRoute from './routes/PrivateRoute';
import NotFoundPage from './pages/NotFound';

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  
  // Public routes
  {
    path: '/admin',
    element: (
      <PrivateRoute roles={['admin']}>
        <Admin />
      </PrivateRoute>
    )
  },
  
  // Doctor-protected routes
  // { path: '/dashboard', element: < /> },

  {
    path: '/dashboard',
    element: (
      <PrivateRoute roles={['doctor']}>
        <DoctorMainLayout />
      </PrivateRoute>
    )
  },
 

  // Catch-all route for 404
  { path: '*', element: <NotFoundPage /> }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;