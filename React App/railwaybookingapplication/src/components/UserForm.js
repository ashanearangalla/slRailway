import './Form.css';
import React,{ useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CRUD = () => {

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [userID,setID] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [contactNo,setContactNo] = useState('');
  const [role,setRole] = useState('');
  
  

  const [editID,setEditID] = useState('');
  const [editUsername,setEditUsername] = useState('');
  const [editPassword,setEditPassword] = useState('');
  const [editContactNo,setEditContactNo] = useState('');
  const [editRole,setEditRole] = useState('');
  
  
    
  
    
    const [data,setData] = useState ([]);
  
    useEffect(()=>{
      getData();
    },[])
  
    const getData = () => {
      axios.get('https://localhost:7265/api/User')
        .then((result)=>{
        setData(result.data);
        }).catch((error)=>{
        console.log(error);
      })
    }
  
    const handleEdit = (id) =>{
        handleShow();
        axios.get(`https://localhost:7265/api/User/${id}`)
        .then((result)=>{
          setEditUsername(result.data.username);
          setEditPassword(result.data.password);
          setEditContactNo(result.data.contactNo);
          setEditRole(result.data.role);
          setEditID(id);
        }).catch((error)=>{
          toast.error(error);
        })
      
    }
  
    const handleDelete = (id) =>{
        if(window.confirm("Are you sure to delete this User")== true) {
          axios.delete(`https://localhost:7265/api/User/${id}`)
          .then((result)=>{
            if(result.status=== 204) {
              getData();
              toast.success('User has been deleted');
              
             
            }
          }).catch((error)=>{
            toast.error(error);
          })
        }
  
        
    }
  
    const handleUpdate = () =>{
        const url = `https://localhost:7265/api/User/${editID}`;
        const data = {
          "userID": editID,
          "username": editUsername,
        "password": editPassword,
        "contactNo": editContactNo,
        "role": editRole
        
        }
    
        axios.put(url,data).then((result)=>{
          handleClose();
          getData();
          clear();
          toast.success('User has been updated');
  
        }).catch((error)=>{
          toast.error(error);
        })
    }
  
    const handleSave = () => {
      if (validateInput(username, password, contactNo, role)) {
      const url = 'https://localhost:7265/api/User';
      const data = {
        
        "username": username,
        "password": password,
        "contactNo": contactNo,
        "role": role
      }
  
      axios.post(url,data).then((result)=>{
        getData();
        clear();
        toast.success('User has been added');
        
      }).catch((error)=>{
        toast.error(error);
      })
    }else {
        toast.error('Please fill in all fields.');
      }
    }
          
    const clear = () =>{
      setUsername('');
      setPassword('');
      setContactNo('');
      setRole('');
      
      setEditUsername('');
      setEditPassword('');
      setEditContactNo('');
      setEditRole('');
  
    }
    const validateInput = (username, password, contactNo, role) => {
      return username !== '' && password !== '' && contactNo !== '' && role !== '';
    }
        
  
  
    return (
      <Fragment>
        <ToastContainer/>
      <div className='form-section'>
      <Container>
        <h2 className='heading-top'>Users</h2>
        <form >
        
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder='Username'
              
              value={username} onChange={(e)=> setUsername(e.target.value)}
            />
            
          </div>
          <div>
            <label>Password</label>
            <input
              type="text"
              name="password"
              placeholder='Password'
              
              value={password} onChange={(e)=> setPassword(e.target.value)}
            />
            
          </div>
          <div>
            <label>Contact No</label>
            <input
              type="text"
              name="contactNo"
              placeholder='Contact No'
              
              value={contactNo} onChange={(e)=> setContactNo(e.target.value)}
            />
            
          </div>
          <div>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
    <option value="admin">Admin</option>
    <option value="customer">Customer</option>
          </select>
        </div>
          



          <div className="btn-sec">
            <button className='button-class' type="submit" onClick={()=>handleSave()}>Submit</button>
            
           
          </div>
          
        </form>
        </Container>

       <div className='train-section'>
      <h2 className='heading-top-2'>User Details Table</h2>
      <Table striped bordered hover>
      <table className="train-table">
        <thead>
          <tr>
          <th>#</th>
          
          <th>User ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Contact No</th>
            <th>Role</th>
            
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {
                data && data.length > 0 ?
                    data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+ 1}</td>
                                <td>{item.userID}</td>
                                <td>{item.username}</td>
                                <td>{item.password}</td>
                                <td>{item.contactNo}</td>
                                <td>{item.role}</td>
                                
                                <td >
                                    <button className="btn btn-primary" onClick={()=> handleEdit(item.userID)}>Edit</button>
                                    
                                </td>
                                <td>
                                <button className="btn btn-danger" onClick={()=> handleDelete(item.userID)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                    : 'Loading...'
            }
            

        </tbody>
        
      </table>
      </Table>

      </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form >
        
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder='Username'
            value={editUsername} onChange={(e)=> setEditUsername(e.target.value)}
          />
          
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            placeholder='Password'
            value={editPassword} onChange={(e)=> setEditPassword(e.target.value)}
          />
          
        </div>
        <div>
          <label>Contact No</label>
          <input
            type="text"
            name="contactNo"
            placeholder='Contact No'
            value={editContactNo} onChange={(e)=> setEditContactNo(e.target.value)}
          />
          
        </div>
        <div>
          <label>Role</label>
          <select value={editRole} onChange={(e) => setEditRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        

        
      </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </Fragment>
  )
}

export default CRUD;
