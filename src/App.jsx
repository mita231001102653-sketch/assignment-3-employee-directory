import React, { useState } from 'react';
import EmployeeTable from './components/EmployeeTable';
import EmployeeFormModal from './components/EmployeeFormModal';

export default function App() {
  const [employees, setEmployees] = useState([
    {
      empId: "EMP-1001",
      name: "Rajesh Kumar",
      department: "Agronomy",
      gender: "Male",
      phone: "+91 98765 43210",
      localAddress: "Farm Quarters Block A, Farm City",
      permanentAddress: "12 Green Valley, Punjab"
    },
    {
      empId: "EMP-1002",
      name: "Sunita Sharma",
      department: "Horticulture",
      gender: "Female",
      phone: "+91 98123 45678",
      localAddress: "Staff Hostel Room 12, Farm City",
      permanentAddress: "45 Orchid Lane, Shimla"
    },
    {
      empId: "EMP-1003",
      name: "Vikram Singh",
      department: "Livestock",
      gender: "Male",
      phone: "+91 97890 12345",
      localAddress: "Cattle Shed Quarter 4, Farm City",
      permanentAddress: "88 Dairy Road, Haryana"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);

  const handleSaveEmployee = (empData) => {
    if (editingEmp) {
      setEmployees(employees.map(e => e.empId === empData.empId ? empData : e));
    } else {
      setEmployees([...employees, empData]);
    }
  };

  const handleDeleteEmployee = (empId) => {
    if (confirm(`Are you sure you want to delete employee ${empId}?`)) {
      setEmployees(employees.filter(e => e.empId !== empId));
    }
  };

  const handleEditClick = (emp) => {
    setEditingEmp(emp);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingEmp(null);
    setIsModalOpen(true);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.empId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="directory-app">
      <div className="top-bar">
        <div className="page-title">
          <h1>🌱 Farm Employee Directory</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
            State Management & Event Handling Assignment
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div className="stats-card">
            <span>👥 Employee Count:</span>
            <span style={{ color: '#10b981', fontSize: '1.2rem', fontWeight: '800' }}>{filteredEmployees.length} / {employees.length}</span>
          </div>
          <button className="btn btn-primary" onClick={handleAddClick}>
            <span>+ Add Employee</span>
          </button>
        </div>
      </div>

      <div className="filter-bar">
        <input 
          type="text" 
          placeholder="🔍 Search by Name or Employee ID..." 
          className="search-input" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <select 
          className="select-input" 
          value={selectedDept} 
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="All">Filter by Department: All</option>
          <option value="Agronomy">Agronomy</option>
          <option value="Horticulture">Horticulture</option>
          <option value="Livestock">Livestock</option>
          <option value="Farm Operations">Farm Operations</option>
          <option value="Research & Development">Research & Development</option>
        </select>
      </div>

      <EmployeeTable 
        employees={filteredEmployees} 
        onEdit={handleEditClick} 
        onDelete={handleDeleteEmployee} 
      />

      <EmployeeFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveEmployee} 
        initialData={editingEmp} 
      />
    </div>
  );
}
