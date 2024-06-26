import React,{ useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const CRUD = () => {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name,setName] = useState('');
  const [origin,setOrigin] = useState('');
  const [destination,setDestination] = useState('');
  const [depTime,setDepTime] = useState('');
  const [arrTime,setArrTime] = useState('');
  

  const [editID,setEditId] = useState('');
  const [editName,setEditName] = useState('');
  const [editOrigin,setEditOrigin] = useState('');
  const [editDestination,setEditDestination] = useState('');
  const [editDepTime,setEditDepTime] = useState('');
  const [editArrTime,setEditArrTime] = useState('');


    const trainData = [
        {
            trainID: 1,
            name: 'Udarata Manike',
            origin: 'Colombo Fort',
            destination:'Badulla',
            departureTime: '05:00:00',
            arrivalTime: '16:00:00'
        },
        {
            trainID: 2,
            name: 'Yaal Devi',
            origin: 'Colombo Fort',
            destination:'Jaffna',
            departureTime: '05:00:00',
            arrivalTime: '16:00:00'
        }
    ]

    const [data,setData] = useState ([]);

    useEffect(()=>{
        setData(trainData);
    },[])

    const handleEdit = (id) =>{
        handleShow();
    }

    const handleDelete = (id) =>{
        if(window.confirm("Are you sure to dlete this employee" == true)) {
            alert(id);
        }

        
    }

    const handleUpdate = () =>{
        
    }
    
    return (
        
        
        <Fragment>
            <Container>
      
      <Row>
        <Col>
            <input type="text" className="form-control" placeholder="Enter Name"
            value={name} onChange={(e)=> setName(e.target.value)}/>
        </Col>
        <Col><input type="text" className="form-control" placeholder="Enter Origin"
        value={origin} onChange={(e)=> setOrigin(e.target.value)}/></Col>
        <Col><input type="text" className="form-control" placeholder="Enter Destination"
        value={destination} onChange={(e)=> setDestination(e.target.value)}/></Col>
        <Col><input type="text" className="form-control" placeholder="Enter Departure Time"
        value={depTime} onChange={(e)=> setDepTime(e.target.value)}/></Col>
        <Col><input type="text" className="form-control" placeholder="Enter Arrival Time"
        value={arrTime} onChange={(e)=> setArrTime(e.target.value)}/></Col>
        <Col>
        <button className="btn btn-primary">Submit</button>
        </Col>
      </Row>
    </Container>
            <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Name</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                data && data.length > 0 ?
                    data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+ 1}</td>
                                <td>{item.name}</td>
                                <td>{item.origin}</td>
                                <td>{item.destination}</td>
                                <td>{item.departureTime}</td>
                                <td>{item.arrivalTime}</td>
                                <td colSpan={2}>
                                    <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}>Edit</button>&nbsp;
                                    <button className="btn btn-danger" onClick={()=> handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                    : 'Loading...'
            }
            

        </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
            <Col>
            <input type="text" className="form-control" placeholder="Enter Name"
            value={editName} onChange={(e)=> setEditName(e.target.value)}/>
        </Col>
        <Col><input type="text" className="form-control" placeholder="Enter Origin"
        value={editOrigin} onChange={(e)=> setEditOrigin(e.target.value)}/></Col>
        <Col><input type="text" className="form-control" placeholder="Enter Destination"
        value={editDestination} onChange={(e)=> setEditDestination(e.target.value)}/></Col>
        <Col><input type="text" className="form-control" placeholder="Enter Departure Time"
        value={editDepTime} onChange={(e)=> setEditDepTime(e.target.value)}/></Col>
        <Col><input type="text" className="form-control" placeholder="Enter Arrival Time"
        value={editArrTime} onChange={(e)=> setEditArrTime(e.target.value)}/></Col>
            
        
            
        </Row>
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