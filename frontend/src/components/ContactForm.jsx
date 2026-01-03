import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ refreshList }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' }); // Professional status handling

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isInvalid = !formData.name || !formData.phone || !validateEmail(formData.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Full URL is required unless you've set up a proxy
        await axios.post('https://contact-app-coik.onrender.com', formData); 
        setStatus({ type: 'success', msg: 'Contact saved successfully!' });
        refreshList(); 
        setFormData({ name: '', email: '', phone: '', message: '' });
        
        // Bonus: Auto-hide success message after 3 seconds
        setTimeout(() => setStatus({ type: '', msg: '' }), 3000);
    } catch (err) {
        console.error("Submission failed:", err);
        setStatus({ type: 'danger', msg: 'Server error. Is the backend running?' });
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4 sticky-top" style={{ top: '20px' }}>
      <h4 className="mb-4 fw-bold text-primary">Add New Contact</h4>
      
      {status.msg && (
        <div className={`alert alert-${status.type} py-2 small fw-bold mb-3 animate-fade`}>
          {status.msg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label small fw-bold text-muted uppercase">Name (Required)</label>
          <input className="form-control form-control-lg" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        </div>
        <div className="mb-3">
          <label className="form-label small fw-bold text-muted uppercase">Email (Valid)</label>
          <input type="email" className="form-control form-control-lg" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
        </div>
        <div className="mb-3">
          <label className="form-label small fw-bold text-muted uppercase">Phone (Required)</label>
          <input className="form-control form-control-lg" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
        </div>
        <div className="mb-4">
          <label className="form-label small fw-bold text-muted uppercase">Message (Optional)</label>
          <textarea className="form-control" rows="3" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
        </div>
        
        <button type="submit" className="btn btn-primary w-100 py-3 fw-bold shadow-sm" disabled={isInvalid}>
          {isInvalid ? 'Fill Required Fields' : 'Save Contact'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;