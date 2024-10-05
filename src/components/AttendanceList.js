// Attendance.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const Attendance = () => {
    const [attendances, setAttendances] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('Present');
    const [employees, setEmployees] = useState([]); // Add this state for employees

    useEffect(() => {
        fetchAttendances();
        fetchEmployees(); // Fetch employees when the component mounts
    }, []);

    const fetchAttendances = async () => {
        try {
            const response = await axiosInstance.get('/attendance/');
            setAttendances(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axiosInstance.get('/employees/');
            setEmployees(response.data); // Set employees data
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const attendanceData = { employee: employeeId, date, status };
        try {
            await axiosInstance.post('/attendance/', attendanceData);
            fetchAttendances();  // Refresh the list
            clearForm();
        } catch (error) {
            console.error(error);
        }
    };

    const clearForm = () => {
        setEmployeeId('');
        setDate('');
        setStatus('Present');
    };

    return (
        <div>
            <h2>Attendance Management</h2>
            <form onSubmit={handleSubmit}>
                <select
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                </select>
                <button type="submit">Add Attendance</button>
            </form>

            <h3>Attendance Records</h3>
            <ul>
                {attendances.map((attendance) => (
                    <li key={attendance.id}>
                        {attendance.employee_name} - {attendance.date} - {attendance.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Attendance;
