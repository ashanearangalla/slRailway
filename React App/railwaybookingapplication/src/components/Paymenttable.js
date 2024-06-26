import React from 'react'

export default function Paymenttable({formData}) {
  return (
    <div className='train-section'>
      <h2>Seat Info Table</h2>
      <table className="train-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Ticket ID</th>
            <th>Update & Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formData.paymentID}</td>
            <td>{formData.amount}</td>
            <td>{formData.paymentDate}</td>
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
