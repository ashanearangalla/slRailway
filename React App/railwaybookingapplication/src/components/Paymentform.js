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
  
  const [paymentID,setPaymentID] = useState('');
  const [amount,setAmount] = useState('');
  const [paymentDate,setPaymentdate] = useState('');
  
  
  const [editPaymentID,setEditPaymentID] = useState('');
  const [editAmount,setEditAmount] = useState('');
  const [editPaymentDate,setEditPaymentdate] = useState('');
  
    
    const [data,setData] = useState ([]);
  
    useEffect(()=>{
      getData();
    },[])
  
    const getData = () => {
      axios.get('https://localhost:7265/api/Payment')
        .then((result)=>{
        setData(result.data);
        }).catch((error)=>{
        console.log(error);
      })
    }
  
    
  
    const handleDelete = (id) =>{
        if(window.confirm("Are you sure to delete this Payment")== true) {
          axios.delete(`https://localhost:7265/api/Payment/${id}`)
          .then((result)=>{
            if(result.status=== 204) {
              getData();
              toast.success('Payment has been deleted');
              
             
            }
          }).catch((error)=>{
            toast.error(error);
          })
        }
  
        
    }
  
    

  return (
    <Fragment>
        <ToastContainer/>
        <div className='form-section'>
        

        <div className='train-section'>
      <h2 className='heading-top-2'>Payment Details Table</h2>
      <Table striped bordered hover>
      <table className="train-table">
        <thead>
          <tr>
          <th>#</th>
          
          <th>Payment ID</th>
            <th>Amount</th>
            <th>Payment Date</th>
            
           
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
                                <td>{item.paymentID}</td>
                                <td>{item.amount}</td>
                                <td>{item.paymentDate}</td>
                                
                                
                                
                                <td>
                                <button className="btn btn-danger" onClick={()=> handleDelete(item.paymentID)}>Delete</button>
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

      
      </Fragment>
  )
}

export default CRUD;