import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [isFormVisible, setFormVisible] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        axiosInstance.get('/employees/')
            .then(res => setEmployees(res.data))
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        axiosInstance.delete(`/employees/${id}/`)
            .then(fetchEmployees)
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>Employees</h2>
            <button onClick={() => { setSelectedEmployeeId(null); setFormVisible(true); }}>Add Employee</button>
            <ul>
                {employees.map(emp => (
                    <li key={emp.id}>
                        {emp.name} ({emp.department}, ${emp.salary})
                        <button onClick={() => { setSelectedEmployeeId(emp.id); setFormVisible(true); }}>Edit</button>
                        <button onClick={() => handleDelete(emp.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {isFormVisible && (
                <EmployeeForm 
                    employeeId={selectedEmployeeId} 
                    onClose={() => setFormVisible(false)} 
                    onRefresh={fetchEmployees} 
                />
            )}
        </div>
    );
};

export default EmployeeList;
