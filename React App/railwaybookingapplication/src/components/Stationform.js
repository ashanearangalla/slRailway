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
  
  const [stationID,setStationID] = useState('');
  const [name,setName] = useState('');
  
  const [editStationID,setEditStationID] = useState('');
  const [editName,setEditName] = useState('');
  
  
    const [data,setData] = useState ([]);
  
    useEffect(()=>{
      getData();
    },[])

    
  
    const getData = () => {
      axios.get('https://localhost:7265/api/Station')
        .then((result)=>{
        setData(result.data);
        }).catch((error)=>{
        console.log(error);
      })
    }
  
    const handleEdit = (id) =>{
        handleShow();
        axios.get(`https://localhost:7265/api/Station/${id}`)
        .then((result)=>{
          setEditStationID(id);
          setEditName(result.data.name);
          
        }).catch((error)=>{
          toast.error(error);
        })
      
    }
  
    const handleUpdate = () =>{
      const url = `https://localhost:7265/api/Station/${editStationID}`;
      const data = {
        "stationID": editStationID,
        "name": editName
        
      }
  
      axios.put(url,data).then((result)=>{
          handleClose();
          getData();
          clear();
          toast.success('Station has been updated');
      }).catch((error)=>{
          toast.error(error);
      })
  }

  const handleSave = () => {
  const url = `https://localhost:7265/api/Station`;
  const data = {
    "name": name
  }

  axios.post(url, data)
    .then((result) => {
      
        getData();  
        clear();  
        toast.success('Station has been added'); 
      
    }).catch((error) => {
      toast.error(error); 
    })
}
  
  const handleDelete = (id) =>{
    if(window.confirm("Are you sure to delete this Station")== true) {
        axios.delete(`https://localhost:7265/api/Station/${id}`)
        .then((result)=>{
            if(result.status=== 204) {
                getData();
                toast.success('Station has been deleted'); // Ensure success toast is triggered
            }
        }).catch((error)=>{
            toast.error(error); // Check if error toast is triggered in case of an error
        })
    }
  }
          
    const clear = () =>{

      setStationID('');
      setName('');
      
      setEditStationID('');
      setEditName('');
  
    }

  return (
    <Fragment>
    <ToastContainer/>
        <div className='form-section'>
        <Container>
        <h2 className="heading-top" >Stations</h2>
        <form>
          
          <div>
            <label>Station Name</label>
            <input
              type="text"
              name="name"
              value={name} onChange={(e)=> setName(e.target.value)}
            />
            
          </div>
          
          
          
          <div className="btn-sec">
            <button className='button-class' type="submit" onClick={()=>handleSave()}>Submit</button>
            
           
          </div>


          
        </form>
        </Container>

        <div className='train-section'>
      <h2 className="heading-top-2">Train Details Table</h2>
      <Table striped bordered hover>
      <table className="train-table">
        <thead>
          <tr>
          <th>#</th>
          <th>Station ID</th>
          <th>Name</th>
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
                                <td>{item.stationID}</td>
                                <td>{item.name}</td>
                                
                                
                                <td>
                                    <button className="btn btn-primary" onClick={()=> handleEdit(item.stationID)}>Edit</button>
                                    
                                </td>
                                <td>
                                <button className="btn btn-danger" onClick={()=> handleDelete(item.stationID)}>Delete</button>
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
          <Modal.Title>Update Station</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form >
        <div>
            <label>Station ID</label>
            <input
              type="text"
              name="name"
              value={editStationID} onChange={(e)=> setEditStationID(e.target.value)}
            />
            
          </div>

          <div>
            <label>Station Name</label>
            <input
              type="text"
              name="name"
              value={editName} onChange={(e)=> setEditName(e.target.value)}
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