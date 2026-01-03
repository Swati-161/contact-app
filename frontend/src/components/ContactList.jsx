import React from 'react';
import axios from 'axios';

const ContactList = ({ contacts, refreshList }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Delete this contact?")) {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      refreshList();
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white py-3 border-0">
        <h5 className="mb-0 fw-bold">Stored Contacts</h5>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="px-4">Name</th>
              <th>Contact Info</th>
              <th className="text-end px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c._id}>
                <td className="px-4 fw-bold">{c.name}</td>
                <td>
                  <div className="small text-muted">{c.email}</div>
                  <div className="small text-primary">{c.phone}</div>
                </td>
                <td className="text-end px-4">
                  <button onClick={() => handleDelete(c._id)} className="btn btn-outline-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;