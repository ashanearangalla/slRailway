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
  
  const [seatID,setSeatID] = useState('');
  const [seatNo,setSeatNo] = useState('');
  const [ticketID,setTicketID] = useState('');
  const [status,setStatus] = useState('');

  
  const [editSeatID,setEditSeatID] = useState('');
  const [editSeatNo,setEditSeatNo] = useState('');
  const [editTicketID,setEditTicketID] = useState('');
  const [editStatus,setEditStatus] = useState('');
  
  
    const [data,setData] = useState ([]);
  
    useEffect(()=>{
      getData();
    },[])

    
  
    const getData = () => {
      axios.get('https://localhost:7265/api/Seat')
        .then((result)=>{
        setData(result.data);
        }).catch((error)=>{
        console.log(error);
      })
    }
  
    const handleEdit = (id) =>{
        handleShow();
        axios.get(`https://localhost:7265/api/Seat/${id}`)
        .then((result)=>{
          setEditSeatID(id);
          setEditSeatNo(result.data.seatNo);
          setEditTicketID(result.data.ticketID);

        }).catch((error)=>{
          toast.error(error);
        })
      
    }
  
    const handleUpdate = () =>{
      const url = `https://localhost:7265/api/Seat/${editSeatID}?ticketID=${editTicketID}`;
      const data = {
        "seatID": editSeatID,
        "seatNo": editSeatNo,
        "status": editStatus,
        "TicketID": editTicketID
      }
  
      axios.put(url,data).then((result)=>{
          handleClose();
          getData();
          clear();
          toast.success('Seat has been updated');
      }).catch((error)=>{
          toast.error(error);
      })
  }

  

  
  const handleDelete = (id) =>{
    if(window.confirm("Are you sure to delete this Seat")== true) {
        axios.delete(`https://localhost:7265/api/Seat/${id}`)
        .then((result)=>{
            if(result.status=== 204) {
                getData();
                toast.success('Seat has been deleted'); // Ensure success toast is triggered
            }
        }).catch((error)=>{
            toast.error(error); // Check if error toast is triggered in case of an error
        })
    }
  }
          
    const clear = () =>{

      setSeatNo('');
      setTicketID('');
      
      
  
    }

  return (
    <Fragment>
    <ToastContainer/>
        <div className='form-section'>
        

        <div className='train-section'>
      <h2 className='heading-top-2'>Seat Details Table</h2>
      <Table striped bordered hover>
      <table className="train-table">
        <thead>
          <tr>
          <th>#</th>
          <th>Seat ID</th>
            <th>Seat No</th>
            <th>Status</th>
            <th>Ticket ID</th>
            
            <th>Update </th>
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
                                <td>{item.seatID}</td>
                                <td>{item.seatNo}</td>
                                <td>{item.status}</td>
                                <td>{item.ticketID}</td>
                               
                                
                                <td>
                                    <button className="btn btn-primary" onClick={()=> handleEdit(item.seatID)}>Edit</button>
                                    
                                </td>
                                <td>
                                <button className="btn btn-danger" onClick={()=> handleDelete(item.seatID)}>Delete</button>
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
          <Modal.Title>Update Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form >
          <div>
            <label>Seat No</label>
            <input
              type="text"
              name="seat No"
              value={editSeatID} onChange={(e)=> setEditSeatNo(e.target.value)}
            />
            
          </div>
          <div>
            <label>Ticket ID</label>
            <input
              type="text"
              name="arrivalDate"
              value={editTicketID} onChange={(e)=> setEditTicketID(e.target.value)}
            />
            
          </div>
          
          <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
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