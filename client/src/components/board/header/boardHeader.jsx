import './boardHeader.css';
import logo from '../../../assets/logo.png';
import avatar from '../../../assets/avatar.jpg'; // Import your avatar image
import { useDispatch } from 'react-redux';
import { performLogout } from '../../../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        // Dispatch the performLogout action
        await dispatch(performLogout());
        // Show success message in alert

        // Navigate to the home page
        navigate('/');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement search functionality
    };

    return (
        <div className="header">
            <div className="main-container">
                <div className="logo">
                    <img src={logo} alt="Task Manager Logo" className="logo" />
                </div>
                <div className="actions-container">
                    <form onSubmit={handleSubmit} className="search-form">
                        <input type="text" placeholder="Search..." className="search-input" />
                        <button type="submit" className="search-btn">Search</button>
                    </form>
                    <div className="profile">
                        <a href="/dashboard" className="profile-avatar">
                            <img src={avatar} alt="Profile Avatar" />
                        </a>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Header;
