import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm.jsx';
import ContactList from './components/ContactList.jsx';

const API_URL = 'https://contact-app-coik.onrender.com';

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await axios.get(`${API_URL}/api/contacts`);
    setContacts(res.data);
  };

  useEffect(() => { fetchContacts(); }, []);

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-5">Contact Management</h2>
        <div className="row g-4">
          <div className="col-lg-4">
            <ContactForm refreshList={fetchContacts} />
          </div>
          <div className="col-lg-8">
            <ContactList contacts={contacts} refreshList={fetchContacts} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ConnectionStatus() {
  const [status, setStatus] = useState('Checking connection...');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Ensure this matches your backend PORT and /api path
        const response = await axios.get(`${API_URL}/api/contacts/test-connection`);
        setStatus(response.data.message);
      } catch (err) {
        console.error("Connection Error Detail:", err);
        setStatus('❌ Backend unreachable. Check CORS or Port 5000.');
      }
    };
    checkConnection();
  }, []);

  return (
    <div className={`alert ${status.includes('✅') ? 'alert-success' : 'alert-danger'} py-2 small`}>
      <strong>System Status:</strong> {status}
    </div>
  );
}

export default App;