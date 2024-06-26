import React from 'react'

export default function Trainstationtable({formData}) {
  return (
    <div className='train-section'>
    <h2>Train-Station Info Table</h2>
    <table className="train-table">
      <thead>
        <tr>
          <th>Trainstation ID</th>
          <th>Train ID</th>
          <th>Station ID</th>
          <th>Update & Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{formData.trainstationID}</td>
          <td>{formData.trainID}</td>
          <td>{formData.stationID}</td>
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
