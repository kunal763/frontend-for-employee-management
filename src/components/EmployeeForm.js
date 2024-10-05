import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const EmployeeForm = ({ employeeId, onClose, onRefresh }) => {
    const [employee, setEmployee] = useState({ name: '', email: '', department: '', salary: '' });
    const [emailError, setEmailError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const isEditing = !!employeeId;

    useEffect(() => {
        if (isEditing) {
            axiosInstance.get(`/employees/${employeeId}/`)
                .then(res => setEmployee(res.data))
                .catch(err => console.error(err));
        }
    }, [employeeId, isEditing]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const validateEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(employee.email)) {
            setEmailError('Please enter a valid email address.');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail()) {
            return;
        }

        const request = isEditing
            ? axiosInstance.put(`/employees/${employeeId}/`, employee)
            : axiosInstance.post('/employees/', employee);

        request
            .then(() => {
                onRefresh();
                onClose();
            })
            .catch((err) => {
                if (err.response && err.response.status === 400 && err.response.data.email) {
                    setEmailError('This email address is already in use.');
                } else {
                    setGeneralError('An error occurred. Please try again.');
                }
            });
    };

    return (
        <div>
            <h2>{isEditing ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    placeholder="Employee Name"
                    required
                />
                <input
                    type="text"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                <input
                    type="text"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    placeholder="Department"
                    required
                />
                <input
                    type="number"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                    required
                />
                {generalError && <span style={{ color: 'red' }}>{generalError}</span>}
                <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
