import React from 'react'

export default function Stationtable({formData}) {
  return (
    <div className='train-section'>
    <h2>Station Info Table</h2>
    <table className="train-table">
      <thead>
        <tr>
          <th>Station ID</th>
          <th>Name</th>
          <th>Train-Station ID</th>
          <th>Update & Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{formData.stationID}</td>
          <td>{formData.name}</td>
          <td>{formData.trainstationID}</td>
          
          
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
