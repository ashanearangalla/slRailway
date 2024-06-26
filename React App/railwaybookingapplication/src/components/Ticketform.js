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
  
  const [ticketID,setID] = useState('');
  const [name,setName] = useState('');
  const [nic,setNIC] = useState('');
  const [date,setDate] = useState('');
  const [board,setBoard] = useState('');
  const [dropping,setDrop] = useState('');
  const [status,setStatus] = useState('');
  const [userID,setUserID] = useState('');
  const [trainID,setTrainID] = useState('');
  const [paymentID,setPaymentID] = useState('');
  
  
  const [editTicketID,setEditTicketID] = useState('');
  const [editName,setEditName] = useState('');
  const [editNic,setEditNIC] = useState('');
  const [editDate,setEditDate] = useState('');
  const [editBoard,setEditBoard] = useState('');
  const [editDropping,setEditDrop] = useState('');
  const [editStatus,setEditStatus] = useState('');
  
  const [editUserID,setEditUserID] = useState('');
  const [editTrainID,setEditTrainID] = useState('');
  const [editPaymentID,setEditPaymentID] = useState('');
    
  
    
    const [data,setData] = useState ([]);
  
    useEffect(()=>{
      getData();
    },[])
  
    const getData = () => {
      axios.get('https://localhost:7265/api/Ticket')
        .then((result)=>{
        setData(result.data);
        }).catch((error)=>{
        console.log(error);
      })
    }
  
    const handleEdit = (id) =>{
        handleShow();
        axios.get(`https://localhost:7265/api/Ticket/${id}`)
        .then((result)=>{
          setEditName(result.data.name);
          setEditNIC(result.data.nic);
          setEditDate(result.data.date);
          setEditBoard(result.data.board);
          setEditDrop(result.data.dropping);
          setEditStatus(result.data.status);
          setEditTicketID(id);
          setEditUserID(result.data.userID);
          setEditTrainID(result.data.trainID);
          setEditPaymentID(result.data.paymentID);
        }).catch((error)=>{
          toast.error(error);
        })
      
    }
  
    const handleDelete = (id) =>{
        if(window.confirm("Are you sure to delete this Ticket")== true) {
          axios.delete(`https://localhost:7265/api/Ticket/${id}`)
          .then((result)=>{
            if(result.status=== 204) {
              getData();
              toast.success('Ticket has been deleted');
              
             
            }
          }).catch((error)=>{
            toast.error(error);
          })
        }
  
        
    }
  
    const handleUpdate = () =>{
      const url = `https://localhost:7265/api/Ticket/${editTicketID}?trainID=${editTrainID}&userID=${editUserID}&paymentID=${editPaymentID}`;
        
        const data = {
          "ticketID": editTicketID,
          "name": editName,
        "nic": editNic,
        "date": editDate,
        "board": editBoard,
        "dropping": editDropping,
        "status": editStatus,
        "userID": editUserID,
        "trainID": editTrainID,
        "paymentID": editPaymentID
        }
    
        axios.put(url,data).then((result)=>{
          handleClose();
          getData();
          clear();
          toast.success('Ticket has been updated');
  
        }).catch((error)=>{
          toast.error(error);
        })
    }
  
    const handleSave = () => {
      const url = 'https://localhost:7265/api/Ticket';
      const data = {
        
        "name": name,
        "nic": nic,
        "date": date,
        "board": board,
        "dropping": dropping,
        "status": status
      }
  
      axios.post(url,data).then((result)=>{
        getData();
        clear();
        toast.success('Ticket has been added')
        
      }).catch((error)=>{
        toast.error(error);
      })
    }
          
    const clear = () =>{
      setName('');
      setNIC('');
      setDate('');
      setBoard('');
      setDrop('');
      setStatus('');
      setEditName('');
      setEditNIC('');
      setEditDate('');
      setEditBoard('');
      setEditDrop('');
      setEditStatus('');
  
    }
        
  
  
    return (
      <Fragment>
        <ToastContainer/>
      <div className='form-section'>
      
        <div className='train-section'>
      <h2 className='heading-top-2'>Ticket Details Table</h2>
      <Table striped bordered hover>
      <table className="train-table">
        <thead>
          <tr>
          <th>#</th>
          <th>Ticket ID</th>
            <th>Passenger Name</th>
            <th>NIC</th>
            <th>Date</th>
            <th>Board</th>
            <th>Drop</th>
            <th>Status</th>
            <th>Seat Count</th>
            <th>User ID</th>
            <th>Schedule ID</th>
            <th>Payment ID</th>
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
                                <td>{item.ticketID}</td>
                                <td>{item.name}</td>
                                <td>{item.nic}</td>
                                <td>{item.date}</td>
                                <td>{item.board}</td>
                                <td>{item.dropping}</td>
                                <td>{item.status}</td>
                                <td>{item.seatCount}</td>
                                <td>{item.userID}</td>
                                <td>{item.scheduleID}</td>
                                <td>{item.paymentID}</td>
                                <td >
                                    <button className="btn btn-primary" onClick={()=> handleEdit(item.ticketID)}>Edit</button>
                                    
                                </td>
                                <td>
                                <button className="btn btn-danger" onClick={()=> handleDelete(item.ticketID)}>Delete</button>
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
          <Modal.Title>Update Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
        
          <div>
            <label>Passenger Name</label>
            <input
              type="text"
              name="name"
              placeholder='Passenger Name'
              value={editName} onChange={(e)=> setEditName(e.target.value)}
            />
            
          </div>
          <div>
            <label>NIC</label>
            <input
              type="text"
              name="nic"
              placeholder='NIC'
              value={editNic} onChange={(e)=> setEditNIC(e.target.value)}
            />
            
          </div>
          <div>
            <label>Date</label>
            <input
              type="text"
              name="date"
              placeholder='Date'
              value={editDate} onChange={(e)=> setEditDate(e.target.value)}
            />
            
          </div>
          <div>
            <label>Board</label>
            <input
              type="text"
              name="board"
              placeholder='Boarding Point'
              value={editBoard} onChange={(e)=> setEditBoard(e.target.value)}
            />
            
          </div>
          <div>
            <label>Drop</label>
            <input
              type="text"
              name="drop"
              placeholder='Dropping Point'
              value={editDropping} onChange={(e)=> setEditDrop(e.target.value)}
            />
             
          </div>
          <div>
            <label>Status</label>
            <input
              type="text"
              name="status"
              placeholder='Status'
              value={editStatus} onChange={(e)=> setEditStatus(e.target.value)}
            />
            
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