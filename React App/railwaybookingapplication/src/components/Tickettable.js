import React from 'react'

export default function Tickettable({formData}) {
  return (
    <div className='train-section'>
      <h2>Ticket Details Table</h2>
      <table className="train-table">
        <thead>
          <tr>
            
            <th>Passenger Name</th>
            <th>NIC</th>
            <th>Date</th>
            <th>Board</th>
            <th>Drop</th>
            <th>Status</th>
            
            <th>Update & Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>{formData.trainID}</td>
            <td>{formData.name}</td>
            <td>{formData.nic}</td>
            <td>{formData.date}</td>
            <td>{formData.board}</td>
            <td>{formData.drop}</td>
            <td>{formData.status}</td>
            <td>{formData.userID}</td>
            <td>{formData.trainID}</td>
            <td>{formData.paymentID}</td>
            <td>{formData.seatID}</td>
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
