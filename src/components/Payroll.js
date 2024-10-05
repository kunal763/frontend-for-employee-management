// Payroll.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

const Payroll = () => {
    const [payrolls, setPayrolls] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [salary, setSalary] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [employees, setEmployees] = useState([]); // Add this state for employees

    useEffect(() => {
        fetchPayrolls();
        fetchEmployees(); // Fetch employees when the component mounts
    }, []);

    const fetchPayrolls = async () => {
        try {
            const response = await axiosInstance.get('/payroll/');
            setPayrolls(response.data);
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
        const payrollData = { employee: employeeId, salary, payment_date: paymentDate };
        try {
            await axiosInstance.post('/payroll/', payrollData);
            fetchPayrolls();  // Refresh the list
            clearForm();
        } catch (error) {
            console.error(error);
        }
    };

    const clearForm = () => {
        setEmployeeId('');
        setSalary('');
        setPaymentDate('');
    };

    return (
        <div>
            <h2>Payroll Management</h2>
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
                    type="number"
                    placeholder="Salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    required
                />
                <button type="submit">Add Payroll</button>
            </form>

            <h3>Payroll Records</h3>
            <ul>
                {payrolls.map((payroll) => (
                    <li key={payroll.id}>
                        {payroll.employee_name} - {payroll.salary} - {payroll.payment_date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Payroll;
