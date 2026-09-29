import React from 'react';

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', background: '#131c2e', borderRadius: '12px' }}>
        No employees found matching the filter criteria.
      </div>
    );
  }

  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Local Address</th>
            <th>Permanent Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.empId}>
              <td style={{ fontWeight: '700', color: '#60a5fa' }}>{emp.empId}</td>
              <td style={{ fontWeight: '600' }}>{emp.name}</td>
              <td>
                <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem' }}>
                  {emp.department}
                </span>
              </td>
              <td>{emp.gender}</td>
              <td>{emp.phone}</td>
              <td>{emp.localAddress}</td>
              <td>{emp.permanentAddress}</td>
              <td>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }} onClick={() => onEdit(emp)}>Edit</button>
                  <button className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '0.85rem' }} onClick={() => onDelete(emp.empId)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
