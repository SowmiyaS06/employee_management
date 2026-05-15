import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link className="brand" to="/dashboard">
        Employee Management System
      </Link>
      <nav className="nav-links">
        {isAuthenticated ? (
          <>
            <span className="nav-greeting">Hi, {user?.name || 'User'}</span>
            <button className="btn btn-secondary" type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
