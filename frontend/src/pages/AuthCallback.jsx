import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api, useAuth } from '../context/AuthContext';

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const hashParams = new URLSearchParams(location.hash.substring(1));
    const sessionId = hashParams.get('session_id');

    if (sessionId) {
      api.post('/auth/exchange', { session_id: sessionId })
        .then((response) => {
          setUser(response.data.user);
          navigate('/', { state: { user: response.data.user }, replace: true });
        })
        .catch((error) => {
          console.error("Auth exchange failed:", error);
          navigate('/', { replace: true });
        });
    } else {
      navigate('/', { replace: true });
    }
  }, [location, navigate, setUser]);

  return (
    <div className="min-h-screen bg-[#0f0f10] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white font-bold tracking-wider">Authentifiziere...</p>
      </div>
    </div>
  );
}
