// src/components/AdminLogin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // If token already exists, redirect to dashboard
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();

        // Send a POST request to obtain the token
        axios.post('https://employee-management-system-backend-7rjr.onrender.com/api-token-auth/', {
            username,
            password
        })
        .then(res => {
            // Store the token in localStorage
            localStorage.setItem('token', res.data.token);

            // Navigate to the dashboard
            navigate('/');
        })
        .catch(err => {
            // Handle login errors
            setError('Invalid username or password');
        });
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
