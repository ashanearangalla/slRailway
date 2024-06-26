import React from 'react'

export default function Usertable({formData}) {
  return (
    <div className='train-section'>
      <h2>User Details Table</h2>
      <table className="train-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Contact No</th>
            <th>Role</th>
            <th>Train ID</th>
            <th>Update & Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>{formData.userID}</td>
            <td>{formData.username}</td>
            <td>{formData.password}</td>
            <td>{formData.contactNo}</td>
            <td>{formData.role}</td>
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
