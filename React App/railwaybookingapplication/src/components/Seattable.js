import React from 'react'

export default function Seattable({formData}) {
  return (
    <div className='train-section'>
      <h2>Seat Info Table</h2>
      <table className="train-table">
        <thead>
          <tr>
            <th>Seat ID</th>
            <th>Seat No</th>
            <th>Status</th>
            <th>Train ID</th>
            <th>Ticket ID</th>
            <th>Update & Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formData.seatID}</td>
            <td>{formData.seatNo}</td>
            <td>{formData.status}</td>
            <td>{formData.trainID}</td>
            <td>{formData.ticketID}</td>
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
