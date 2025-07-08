// src/pages/auth/GoogleCallbackPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Save token to localStorage or cookies
      localStorage.setItem('jwt', token);
      navigate('/dashboard'); // Or your protected page
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default GoogleCallbackPage;
