import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import CreatorRequestForm from '../components/CreatorRequestForm';
import '../styles/dashboard.css';

export default function RequestCreator() {
  const [existingRequest, setExistingRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      const userData = JSON.parse(user);
      if (userData.role === 'creator') {
        navigate('/dashboard');
      } else {
        checkExistingRequest();
      }
    }
  }, [navigate]);

  const checkExistingRequest = async () => {
    setLoading(true);
    try {
      const request = await api.getMyRequest();
      setExistingRequest(request);
    } catch (err) {
      setMessage('Failed to load request status');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const result = await api.submitCreatorRequest(formData.sample_work_link, formData.message);
      if (result.error) {
        setMessage(`Error: ${result.error}`);
      } else {
        setMessage('✓ Request submitted successfully!');
        await checkExistingRequest();
      }
    } catch (err) {
      setMessage('Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="page-container"><p>Loading...</p></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🚀 Request Creator Access</h1>
        <p>Show us your best work and get approved to sell projects</p>
      </div>

      {message && (
        <div className={message.includes('✓') ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

      <div className="form-wrapper">
        <CreatorRequestForm
          onSubmit={handleSubmit}
          loading={loading}
          existingRequest={existingRequest}
        />
      </div>
    </div>
  );
}
