// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import Home from './components/Home';
import EmployeeList from './components/EmployeeList';
import Payroll from './components/Payroll';
import Attendance from './components/AttendanceList';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<AdminLogin />} />

                {/* Protected Routes */}
                
                 <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employees"
                    element={
                        <ProtectedRoute>
                            <EmployeeList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/payroll"
                    element={
                        <ProtectedRoute>
                            <Payroll />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/attendance"
                    element={
                        <ProtectedRoute>
                            <Attendance />
                        </ProtectedRoute>
                    }
                />

                {/* Redirect to login if the route doesn't exist */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
