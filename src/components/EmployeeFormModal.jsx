import React, { useState, useEffect } from 'react';

export default function EmployeeFormModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    empId: '',
    department: 'Agronomy',
    gender: 'Male',
    phone: '',
    localAddress: '',
    permanentAddress: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        empId: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
        department: 'Agronomy',
        gender: 'Male',
        phone: '',
        localAddress: '',
        permanentAddress: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>
          {initialData ? 'Edit Employee Details' : 'Add New Employee'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Employee Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Employee ID</label>
              <input name="empId" value={formData.empId} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Department</label>
              <select name="department" value={formData.department} onChange={handleChange}>
                <option value="Agronomy">Agronomy</option>
                <option value="Horticulture">Horticulture</option>
                <option value="Livestock">Livestock</option>
                <option value="Farm Operations">Farm Operations</option>
                <option value="Research & Development">Research & Development</option>
              </select>
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group full">
              <label>Phone Number</label>
              <input name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group full">
              <label>Local Address</label>
              <textarea name="localAddress" rows="2" value={formData.localAddress} onChange={handleChange} required />
            </div>
            <div className="form-group full">
              <label>Permanent Address</label>
              <textarea name="permanentAddress" rows="2" value={formData.permanentAddress} onChange={handleChange} required />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" onClick={onClose} className="btn" style={{ background: 'rgba(255,255,255,0.1)' }}>Cancel</button>
            <button type="submit" className="btn btn-primary">{initialData ? 'Update Employee' : 'Add Employee'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
