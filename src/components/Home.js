import React from 'react';
import { Link,useNavigate } from 'react-router-dom'; // Import Link for navigation
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <div className="home-container">
            <h1>Employee Management System</h1>
            <p>Welcome to the Employee Management System!</p>
            <div className="navigation-links">
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
            <div className="links-container">
                <h2>Navigate to:</h2>
                <ul>
                    <li><Link to="/employees">Employee List</Link></li>
                    <li><Link to="/attendance">Attendance</Link></li>
                    <li><Link to="/payroll">Payroll</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
