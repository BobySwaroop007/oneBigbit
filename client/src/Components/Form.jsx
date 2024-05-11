import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    password: '',
    city: '',
    state: '',
    designation: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
console.log(formData);
    // for (const key in formData) {
    //   if (formData[key] === '') {
    //     alert('Please fill out all fields!');
    //     return;
    //   }
    // }

    axios.post('http://localhost:8080', formData)
      .then(response => {
        console.log('Data submitted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error submitting data:', error);
      }); 
  };

  return (
    <div>
      <form className="w-50 mx-auto mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">User Name</label>
          <input type="text" className="form-control" id="userName" placeholder="Name" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="userEmail" className="form-label">Email</label>
          <input type="text" className="form-control" id="userEmail" placeholder="Email" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" placeholder="password" onChange={handleChange} />
        </div>
        <div className="mb-3">
  <label htmlFor="city" className="form-label">City</label>
  <select className="form-select" id="city" onChange={handleChange} value={formData.city}>
    <option value="Lucknow">Lucknow</option>
    <option value="Kanpur">Kanpur</option>
    <option value="Allahabad">Allahabad</option>
  </select>
</div>

<div className="mb-3">
  <label htmlFor="state" className="form-label">State</label>
  <select className="form-select" id="state" onChange={handleChange} value={formData.state}>
    <option value="UP">UP</option>
    <option value="Bihar">Bihar</option>
    <option value="Delhi">Delhi</option>
  </select>
</div>

        <div className="mb-3">
          <label htmlFor="designation" className="form-label">Designation</label>
          <input type="text" className="form-control" id="designation" placeholder="Designation" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      
    </div>
  );
}

export default Form;
