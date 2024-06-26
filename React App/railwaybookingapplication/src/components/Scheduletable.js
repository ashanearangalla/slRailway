import React from 'react'
import './Form.css';

export default function Scheduletable({ formData }) {
  return (
    <div className='train-section'>
      <h2>Schedule Details Table</h2>
      <table className="train-table">
        <thead>
          <tr>
            <th>Schedule ID</th>
            <th>Departure Date</th>
            <th>Arrival Date</th>
            <th>Train ID</th>
            <th>Update & Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formData.departureDate}</td>
            <td>{formData.arrivalDate}</td>
            <td>{formData.trainID}</td>
            <td>
                <span className="edit-icon"><i className="fas fa-edit"></i></span>
                <span className="delete-icon"><i className="fas fa-trash-alt"></i></span>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  )
}
