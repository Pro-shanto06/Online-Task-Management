import './header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Header() {
  return (
    <header className="header">
      <div className='nav'>
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Task Manager Logo" className="logo" />
          </Link>
        </div>
        <nav>
          <Link to="/login" className="login-button">Log In</Link>
          <Link to="/signup" className="signup-button">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
