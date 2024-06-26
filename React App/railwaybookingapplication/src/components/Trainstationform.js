import React, {useState} from 'react'
import Trainstationtable from './Trainstationtable';

export default function Trainstationform() {
    const [formData, setFormData] = useState({
        trainstationID: '',
        trainID: '',
        stationID: '',
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
            trainstationID: '',
            trainID: '',
            stationID: '',
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
        if (!data.trainstationID) {
          errors.trainstationID = 'Required';
        }
        if (!data.trainID) {
          errors.trainID = 'Required';
        }
        if (!data.stationID) {
          errors.stationID= 'Required';
        }
        return errors;
      };
  return (
    <div>
        <div className='form-section'>
        <h2>TrainStation Info</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Train - Station ID</label>
            <input
              type="text"
              name="trainstationID"
              value={formData.trainstationID}
              onChange={handleChange}
            />
            {errors.trainstationID && <span className='error-spam'>{errors.trainstationID}</span>}
          </div>
          <div>
            <label>Train ID</label>
            <input
              type="text"
              name="trainID"
              value={formData.trainID}
              onChange={handleChange}
            />
            {errors.trainID && <span className='error-spam'>{errors.stationID}</span>}
          </div>
          <div>
            <label>Train ID</label>
            <input
              type="text"
              name="trainID"
              value={formData.trainID}
              onChange={handleChange}
            />
            {errors.trainID && <span className='error-spam'>{errors.trainID}</span>}
          </div>
          <div>
            <label>Station ID</label>
            <input
              type="text"
              name="stationID"
              value={formData.stationID}
              onChange={handleChange}
            />
            {errors.stationID && <span className='error-spam'>{errors.stationID}</span>}
          </div>
          
          <div className="btn-sec">
            <button className='button-class' type="submit">Submit</button>
            {/* Display success message if form is successfully submitted */}
            {submitted && <p className="success-message">Successfully entered!</p>}
          </div>
          
        </form>

        {/* Pass formData as props to Traintable component */}
      <Trainstationtable formData={formData} />
      </div>

    </div>
  )
}
