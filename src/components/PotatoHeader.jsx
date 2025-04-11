import { Link } from 'react-router-dom';

function PotatoHeader({ admin, onLogout }) {
  return (
    <header className="potato-header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <h1>🥔 PotatoPai</h1>
        </Link>
        
        <nav className="potato-nav">
          {admin ? (
            <>
              <Link to="/admin" className="nav-link">Orders</Link>
              <button onClick={onLogout} className="nav-button">Logout</button>
            </>
          ) : (
            <Link to="/admin" className="nav-link">Admin</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default PotatoHeader;
