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
  
  const [scheduleID,setScheduleID] = useState('');
  const [departureDate,setDepDate] = useState('');
  const [arrivalDate,setArrDate] = useState('');
  const [trainID,setTrainID] = useState('');
  
  
  const [editScheduleID,setEditScheduleID] = useState('');
  const [editDepartureDate,setEditDepDate] = useState('');
  const [editArrivalDate,setEditArrDate] = useState('');
  const [editTrainID,setEditTrainID] = useState('');
  
  
    const [data,setData] = useState ([]);
  
    useEffect(()=>{
      getData();
    },[])

    
  
    const getData = () => {
      axios.get('https://localhost:7265/api/Schedule')
        .then((result)=>{
        setData(result.data);
        }).catch((error)=>{
        console.log(error);
      })
    }
  
    const handleEdit = (id) =>{
        handleShow();
        axios.get(`https://localhost:7265/api/Schedule/${id}`)
        .then((result)=>{
          setEditDepDate(result.data.departureDate);
          setEditArrDate(result.data.arrivalDate);
          setEditTrainID(result.data.trainID);
          setEditScheduleID(id);
        }).catch((error)=>{
          toast.error(error);
        })
      
    }
  
    const handleUpdate = () =>{
      const url = `https://localhost:7265/api/Schedule/${editScheduleID}?trainID=${editTrainID}`;
      const data = {
        "scheduleID": editScheduleID,
        "departureDate": editDepartureDate,
        "arrivalDate": editArrivalDate,
        "trainID": editTrainID
      }
  
      axios.put(url,data).then((result)=>{
          handleClose();
          getData();
          clear();
          toast.success('Schedule has been updated');
      }).catch((error)=>{
          toast.error(error);
      })
  }

  const handleSave = () => {
  const url = `https://localhost:7265/api/Schedule`;
  const data = {
    "departureDate": departureDate,
    "arrivalDate": arrivalDate,
    "trainID": trainID // Include trainID in the data object
  }

  axios.post(url, data)
    .then((result) => {
      
        getData();  
        clear();  
        toast.success('Schedule has been added'); 
      
    }).catch((error) => {
      toast.error(error); 
    })
}
  
  const handleDelete = (id) =>{
    if(window.confirm("Are you sure to delete this Schedule")== true) {
        axios.delete(`https://localhost:7265/api/Schedule/${id}`)
        .then((result)=>{
            if(result.status=== 204) {
                getData();
                toast.success('Schedule has been deleted'); // Ensure success toast is triggered
            }
        }).catch((error)=>{
            toast.error(error); // Check if error toast is triggered in case of an error
        })
    }
  }
          
    const clear = () =>{

      setDepDate('');
      setArrDate('');
      
      setEditDepDate('');
      setEditArrDate('');
  
    }

  return (
    <Fragment>
    <ToastContainer/>
        <div className='form-section'>
        
        <Container>
        <h2 className="heading-top">Train Schedules</h2>
        <form >
          <div>
            <label>Departure Date</label>
            <input
              type="text"
              name="departureDate"
              placeholder='YYYY-MM-DD'
              value={departureDate} onChange={(e)=> setDepDate(e.target.value)}
            />
            
          </div>
          <div>
            <label>Arrival Date</label>
            <input
              type="text"
              name="arrivalDate"
              placeholder='YYYY-MM-DD'
              value={arrivalDate} onChange={(e)=> setArrDate(e.target.value)}
            />
            
          </div>
          <div>
            <label>Train ID</label>
            <input
              type="text"
              name="trainID"
              placeholder='Train ID'
              value={trainID} onChange={(e)=> setTrainID(e.target.value)}
            />
            
          </div>
          
          
          <div className="btn-sec">
            <button className='button-class' type="button" onClick={()=>handleSave()}>Submit</button>
            
           
          </div>
          
        </form>
        </Container>

        {/* Pass formData as props to Traintable component */}
        <div className='train-section'>
      <h2 className="heading-top-2">Schedule Details Table</h2>
      <Table striped bordered hover>
      <table className="train-table">
        <thead>
          <tr>
          <th>#</th>
          <th>Schedule ID</th>
            <th>Departure Date</th>
            <th>Arrival Date</th>
            <th>Train ID</th>
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
                                <td>{item.scheduleID}</td>
                                <td>{item.departureDate}</td>
                                <td>{item.arrivalDate}</td>
                                <td>{item.trainID}</td>
                                
                                <td>
                                    <button className="btn btn-primary" onClick={()=> handleEdit(item.scheduleID)}>Edit</button>
                                    
                                </td>
                                <td>
                                <button className="btn btn-danger" onClick={()=> handleDelete(item.scheduleID)}>Delete</button>
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
            <label>Departure Date</label>
            <input
              type="text"
              name="departureDate"
              value={editDepartureDate} onChange={(e)=> setEditDepDate(e.target.value)}
            />
            
          </div>
          <div>
            <label>Arrival Date</label>
            <input
              type="text"
              name="arrivalDate"
              value={editArrivalDate} onChange={(e)=> setEditArrDate(e.target.value)}
            />
            
          </div>
          <div>
            <label>Train ID</label>
            <input
              type="text"
              name="trainID"
              value={editTrainID} onChange={(e)=> setEditTrainID(e.target.value)}
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