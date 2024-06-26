import React from 'react';
import './Form.css';


export default function Traintable({ formData }) {
  return (
    <div className='train-section'>
      <h2>Train Details Table</h2>
      <table className="train-table">
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Schedule</th>
            <th>Update & Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formData.trainName}</td>
            <td>{formData.origin}</td>
            <td>{formData.destination}</td>
            <td>{formData.departureTime}</td>
            <td>{formData.arrivalTime}</td>
            <td>{formData.schedule}</td>
            <td>
                <span className="edit-icon"><i className="fas fa-edit"></i></span>
                <span className="delete-icon"><i className="fas fa-trash-alt"></i></span>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  );
}
