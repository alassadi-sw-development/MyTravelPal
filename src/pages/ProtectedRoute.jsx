import { useEffect } from 'react';
import { useAuth } from '../contexts/FakeAuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated, setRedirectPath } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectPath(location.pathname);
      navigate("/login");
    }
  }, [isAuthenticated, navigate, setRedirectPath, location.pathname]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
