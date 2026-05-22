import React, { useState } from 'react';
import '../styles/forms.css';

export default function CreatorRequestForm({ onSubmit, loading, existingRequest }) {
  const [formData, setFormData] = useState({
    sample_work_link: '',
    message: '',
  });
  const [error, setError] = useState('');

  if (existingRequest) {
    return (
      <div className="request-status">
        <h3>Creator Request Status</h3>
        <p>Status: <strong>{existingRequest.status}</strong></p>
        {existingRequest.status === 'pending' && (
          <p className="info-text">Your request is being reviewed by admin. Please wait...</p>
        )}
        {existingRequest.status === 'approved' && (
          <p className="success-text">Congratulations! You are now a creator!</p>
        )}
        {existingRequest.status === 'rejected' && (
          <p className="error-text">Your request was rejected. Please contact admin for more details.</p>
        )}
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.sample_work_link || !formData.message) {
      setError('All fields are required');
      return;
    }
    await onSubmit(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}

      <p className="form-description">
        Submit your creator application with examples of your work to get approved.
      </p>

      <div className="form-group">
        <label htmlFor="sample_work_link">Portfolio/Sample Work Link *</label>
        <input
          id="sample_work_link"
          type="url"
          name="sample_work_link"
          value={formData.sample_work_link}
          onChange={handleChange}
          placeholder="https://github.com/your-portfolio or personal website"
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Why do you want to become a creator? *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your experience and why you want to sell projects..."
          rows="5"
        />
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}
