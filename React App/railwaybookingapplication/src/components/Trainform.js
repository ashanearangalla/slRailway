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

const [trainID,setID] = useState('');
const [name,setName] = useState('');
const [origin,setOrigin] = useState('');
const [destination,setDestination] = useState('');
const [departureTime,setDepTime] = useState('');
const [arrivalTime,setArrTime] = useState('');


const [editID,setEditId] = useState('');
const [editName,setEditName] = useState('');
const [editOrigin,setEditOrigin] = useState('');
const [editDestination,setEditDestination] = useState('');
const [editDepartureTime,setEditDepTime] = useState('');
const [editArrivalTime,setEditArrTime] = useState('');


  

  
  const [data,setData] = useState ([]);

  useEffect(()=>{
    getData();
  },[])

  const getData = () => {
    axios.get('https://localhost:7265/api/Train')
      .then((result)=>{
      setData(result.data);
      }).catch((error)=>{
      console.log(error);
    })
  }

  const handleEdit = (id) =>{
      handleShow();
      axios.get(`https://localhost:7265/api/Train/${id}`)
      .then((result)=>{
        setEditName(result.data.name);
        setEditOrigin(result.data.origin);
        setEditDestination(result.data.destination);
        setEditDepTime(result.data.departureTime);
        setEditArrTime(result.data.arrivalTime);
        setEditId(id);
      }).catch((error)=>{
        toast.error(error);
      })
    
  }

  const handleUpdate = () =>{
    const url = `https://localhost:7265/api/Train/${editID}`;
    const data = {
        "trainID": editID,
        "name": editName,
        "origin": editOrigin,
        "destination": editDestination,
        "departureTime": editDepartureTime,
        "arrivalTime": editArrivalTime
    }

    axios.put(url,data).then((result)=>{
        handleClose();
        getData();
        clear();
        toast.success('Train has been updated');
    }).catch((error)=>{
        toast.error(error);
    })
}
const handleSave = () => {
  const url = 'https://localhost:7265/api/Train';
  const data = {
      "name": name,
      "origin": origin,
      "destination": destination,
      "departureTime": departureTime,
      "arrivalTime": arrivalTime
  }

  axios.post(url,data)
  .then((result)=>{
    if(result.status=== 204) {
      
      getData();  
      clear();  
      toast.success('Train has been added'); 
  }

  }).catch((error)=>{
      toast.error(error); // Check if error toast is triggered in case of an error
  })
}

const handleDelete = (id) =>{
  if(window.confirm("Are you sure to delete this Train")== true) {
      axios.delete(`https://localhost:7265/api/Train/${id}`)
      .then((result)=>{
          if(result.status=== 204) {
              getData();
              toast.success('Train has been deleted'); // Ensure success toast is triggered
          }
      }).catch((error)=>{
          toast.error(error); // Check if error toast is triggered in case of an error
      })
  }
}
        
  const clear = () =>{
    setName('');
    setOrigin('');
    setDestination('');
    setDepTime('');
    setArrTime('');
    setEditName('');
    setEditOrigin('');
    setEditDestination('');
    setEditDepTime('');
    setEditArrTime('');

  }
  
    return (
      <Fragment>
    <ToastContainer/>
        <div className='form-section'>
        
        <Container>
        <h2 className="heading-top">Trains</h2>
        <form>
          <div>
            <label>Train Name</label>
            <input
              type="text"
              name="trainName"
              placeholder='Train Name'
              value={name} onChange={(e)=> setName(e.target.value)}
            />
            
          </div>
          <div>
            <label>Origin</label>
            <input
              type="text"
              name="origin"
              placeholder='Origin'
              value={origin} onChange={(e)=> setOrigin(e.target.value)}
            />
           
          </div>
          <div>
            <label>Destination</label>
            <input
              type="text"
              name="destination"
              placeholder='Destination'
              value={destination} onChange={(e)=> setDestination(e.target.value)}
            />
            
          </div>
          <div>
            <label>Departure Time</label>
            <input
              type="text"
              name="departureTime"
              placeholder='HH:MM:SS'
              value={departureTime} onChange={(e)=> setDepTime(e.target.value)}
            />
            
          </div>
          <div>
            <label>Arrival Time</label>
            <input
              type="text"
              name="arrivalTime"
              placeholder='HH:MM:SS'
              value={arrivalTime} onChange={(e)=> setArrTime(e.target.value)}
            />
            
          </div>
         
          <div className="btn-sec">
            <button className='button-class' type="submit" onClick={()=>handleSave()}>Submit</button>
            
           
          </div>
          </form>
          </Container>
          
        {/* Pass formData as props to Traintable component */}
        <div className='train-section'>
      <h2 className="heading-top-2">Train Details Table</h2>
      <Table striped bordered hover>
      <table className="train-table">
        <thead>
          <tr>
          <th>#</th>
          <th>Train ID</th>
            <th>Train Name</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
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
                                <td>{item.trainID}</td>
                                <td>{item.name}</td>
                                <td>{item.origin}</td>
                                <td>{item.destination}</td>
                                <td>{item.departureTime}</td>
                                <td>{item.arrivalTime}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={()=> handleEdit(item.trainID)}>Edit</button>
                                    
                                </td>
                                <td>
                                <button className="btn btn-danger" onClick={()=> handleDelete(item.trainID)}>Delete</button>
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
          <Modal.Title>Update Train</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
          <div>
            <label>Train Name</label>
            <input
              type="text"
              name="trainName"

              value={editName} onChange={(e)=> setEditName(e.target.value)}
            />
            
          </div>
          <div>
            <label>Origin</label>
            <input
              type="text"
              name="origin"

              value={editOrigin} onChange={(e)=> setEditOrigin(e.target.value)}
            />
           
          </div>
          <div>
            <label>Destination</label>
            <input
              type="text"
              name="destination"

              value={editDestination} onChange={(e)=> setEditDestination(e.target.value)}
            />
            
          </div>
          <div>
            <label>Departure Time</label>
            <input
              type="text"
              name="departureTime"
      
              value={editDepartureTime} onChange={(e)=> setEditDepTime(e.target.value)}
            />
            
          </div>
          <div>
            <label>Arrival Time</label>
            <input
              type="text"
              name="arrivalTime"
         
              value={editArrivalTime} onChange={(e)=> setEditArrTime(e.target.value)}
            />
            
          </div>
         
          
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className='blue-btn' onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </Fragment>
  )
}

export default CRUD;