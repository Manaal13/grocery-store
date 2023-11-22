import React, { useState } from 'react';
import { useRouter } from 'next/router';

const ComplaintForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    concern: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Simple validation example (you can add more complex validation logic)
    if (!formData.name || !formData.phoneNumber || !formData.email || !formData.concern) {
      setError('All fields are required');
      return;
    }
  
    // Save form data in local storage
    const existingData = JSON.parse(localStorage.getItem('complaints')) || [];
    const newData = {
      id: new Date().getTime(), // You can use a more sophisticated ID generation method if needed
      ...formData,
    };
    const updatedData = [...existingData, newData];
    localStorage.setItem('complaints', JSON.stringify(updatedData));
  
    // Add your logic to handle form submission (e.g., API request)
    console.log('Form submitted:', formData);
  
    window.alert('Form submitted successfully!');
    window.location.href = '/';
  
    // Reset the form after successful submission
    setFormData({
      name: '',
      phoneNumber: '',
      email: '',
      concern: '',
    });
  
    // Clear any existing error
    setError(null);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phoneNumber: '',
      email: '',
      concern: '',
    });
    // Clear any existing error and success message
    setError(null);
    setSuccessMessage(null);
  };

  const containerStyle = {
    width: '400px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#e6ffe6', // Light green background
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#006600', // Dark green text
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '16px',
    borderRadius: '4px',
    border: '1px solid #006600', // Dark green border
  };

  const buttonStyle = {
    backgroundColor: '#006600', // Dark green button
    color: '#fff',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  };

  const resetButtonStyle = {
    backgroundColor: '#cc0000', // Dark red reset button
    color: '#fff',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const alertStyle = {
    color: 'red',
    marginBottom: '10px',
  };

  const successStyle = {
    color: '#006600',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      {error && <div style={alertStyle}>{error}</div>}
      {successMessage && <div style={successStyle}>{successMessage}</div>}
      <h2 style={{ color: '#006600', textAlign: 'center' }}>Complaint Form</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Concern:</label>
        <textarea
          name="concern"
          value={formData.concern}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <div style={{ textAlign: 'center' }}>
          <button type="submit" style={buttonStyle}>
            Submit
          </button>
          <button type="button" onClick={handleReset} style={resetButtonStyle}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm;
