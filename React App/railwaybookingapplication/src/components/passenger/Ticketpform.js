import React, { useState } from "react";

export default function Ticketpform() {
    const [formData, setFormData] = useState({
        name: '',
        nic: '',
        date: '',
        board: '',
        drop: '',
      });

      const [errors, setErrors] = useState({});
      const [submitted, setSubmitted] = useState(false); // State to track if form is submitted successfully
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(formData);
        if (Object.keys(errors).length === 0) {
          // Handle form submission
          console.log('Form submitted:', formData);
          // Reset form
          setFormData({
            name: '',
            nic: '',
            date: '',
            board: '',
            drop: '',
          });
          // Set submitted to true
          setSubmitted(true);
        } else {
          setErrors(errors);
          // Set submitted to false if there are errors
          setSubmitted(false);
        }
      };
      
       
    
      const validate = (data) => {
        const errors = {};
        
        if (!data.name) {
          errors.name = 'Required';
        }
        if (!data.nic) {
          errors.nic = 'Required';
        }
        if (!data.date) {
          errors.date = 'Required';
        }
        if (!data.board) {
          errors.board = 'Required';
        }
        if (!data.drop) {
          errors.drop = 'Required';
        }
        
        return errors;
      };
    
        
  
  
    return (
      <div className='form-section'>
        <h2>Trains</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Passenger Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className='error-spam'>{errors.name}</span>}
          </div>
          <div>
            <label>NIC</label>
            <input
              type="text"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
            />
            {errors.nic && <span className='error-spam'>{errors.nic}</span>}
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <span className='error-spam'>{errors.date}</span>}
          </div>
          <div>
            <label>Board</label>
            <input
              type="text"
              name="board"
              value={formData.board}
              onChange={handleChange}
            />
            {errors.board && <span className='error-spam'>{errors.board}</span>}
          </div>
          <div>
            <label>Drop</label>
            <input
              type="text"
              name="drop"
              value={formData.drop}
              onChange={handleChange}
            />
            {errors.drop && <span className='error-spam'>{errors.drop}</span>}
          </div>



          <div className="btn-sec">
            <button className='button-class' type="submit">Submit</button>
            {/* Display success message if form is successfully submitted */}
            {submitted && <p className="success-message">Successfully entered!</p>}
          </div>
          
        </form>

        {/* Pass formData as props to Traintable component */}
      <Ticketpform formData={formData} />
      </div>
  )
}
