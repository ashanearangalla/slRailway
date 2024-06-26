import React, { useState, useEffect, Fragment } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Form.css";
import Navigationbar from "./Navigationbar";
import { Container } from "react-bootstrap";
import NavigationbarP from "./NavigationbarP";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CRUD = () => {
  const location = useLocation();
  const userID = location.state?.userID;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [fromStationID, setFromStationID] = useState("");
  const [toStationID, setToStationID] = useState("");
  const [date, setDate] = useState("");

  const [editTicketID, setEditTicketID] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [nic, setNIC] = useState("");
  const [tripDate, setTripDate] = useState("");
  const [board, setBoard] = useState("");
  const [dropping, setDrop] = useState("");
  const [status, setStatus] = useState("");
  const [seatCount, setSeatCount] = useState("");

  const [lastTicketID, setLastInsertedTicketID] = useState("");
  const [lastSeatNo, setLastInsertedSeatNo] = useState("");
  const [amount, setAmount] = useState("");

  const [scheduleID, setScheduleID] = useState("");
  const [trainID, setTrainID] = useState("");
  const [lastPaymentID, setLastPaymentID] = useState("");
  const [stations, setStations] = useState([]);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7265/api/Station")
      .then((result) => {
        setStations(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    // Make requests to fetch trains based on fromStation and toStation
    const trainUrl = `https://localhost:7265/api/Station/trains/${fromStationID}/${toStationID}`;
    const scheduleUrl = `https://localhost:7265/api/Schedule`;

    // Fetch trains
    axios
      .get(trainUrl)
      .then((trainResponse) => {
        const trains = trainResponse.data;

        // Fetch schedules
        axios
          .get(scheduleUrl)
          .then((scheduleResponse) => {
            const schedules = scheduleResponse.data;

            // Connect schedules with trains using foreign key trainID
            const connectedTrains = trains.map((train) => {
              const trainSchedules = schedules.filter(
                (schedule) => schedule.trainID === train.trainID
              );
              return { ...train, schedules: trainSchedules };
            });

            // Filter schedules based on the departureDate column matching the inserted date
            const filteredSchedules = schedules.filter((schedule) => {
              return schedule.departureDate === date;
            });

            // Extract relevant train IDs from the filtered schedules
            const relevantTrainIDs = filteredSchedules.map(
              (schedule) => schedule.trainID
            );

            // Filter trains based on the common train IDs obtained from the filtered schedules
            const filteredTrains = connectedTrains.filter((train) =>
              relevantTrainIDs.includes(train.trainID)
            );

            // Update the state with filtered trains
            const filteredTrainsWithSchedule = filteredTrains.map((train) => {
              const schedulesForTrain = train.schedules.filter((schedule) =>
                relevantTrainIDs.includes(schedule.trainID)
              );
              // Assuming each train may have multiple schedules for different dates
              const scheduleIDs = schedulesForTrain.map(
                (schedule) => schedule.scheduleID
              );
              // Assuming you want to include all schedule IDs associated with the train
              return { ...train, scheduleIDs: scheduleIDs };
            });

            // Update the state with filtered trains including schedule IDs
            setData(filteredTrainsWithSchedule);

            // Clear the form inputs
            clear();

            // Show success message
            toast.success("Trains have been loaded");
          })
          .catch((scheduleError) => {
            // Handle errors related to fetching schedules
            toast.error(scheduleError.message);
          });
      })
      .catch((trainError) => {
        // Handle errors related to fetching trains
        toast.error(trainError.message);
      });
  };

  const handleModelShow = (scheduleID, trainID, date) => {
    if (!userID) {
      // Redirect to login page if userID is null
      navigate("/login");
    } else {
      handleShow();
      setScheduleID(scheduleID[0]);
      setTrainID(trainID);
      setTripDate(date);

      const amt = parseInt(seatCount)*200;
      setAmount(amt);
      setStatus("active");
    }
    
  };

  const handleBooking = () => {
    
    const paymentUrl = `https://localhost:7265/api/Payment`;
    
    console.log("Last Inserted Payment ID:", amount);
    
  
    const amountData = {
      amount: 200,
      paymentDate: new Date().toISOString()
    };
  
    // Make payment request
    axios.post(paymentUrl, amountData)
      .then((paymentResult) => {
        // Retrieve last inserted payment ID
        axios.get("https://localhost:7265/api/Payment/last-inserted")
          .then((lastPaymentResult) => {
            const lastInsertedPaymentID = lastPaymentResult.data.paymentID;
            console.log("Last Inserted Payment ID:", lastInsertedPaymentID);
            setLastPaymentID(lastInsertedPaymentID);

            console.log("Schedule ID:", scheduleID);
  
            // Retrieve last inserted ticket ID
            axios.get(`https://localhost:7265/api/Ticket/last-inserted/${scheduleID}`)
              .then((ticketResult) => {
                const lastInsertedTicketID = ticketResult.data.ticketID;
                console.log("Last Inserted Ticket ID:", lastInsertedTicketID);
  
                // Retrieve last inserted seat number
                axios.get(`https://localhost:7265/api/Seat/last-inserted/${lastInsertedTicketID}`)
                  .then((seatResult) => {
                    const lastInsertedSeatNo = seatResult.data.seatNo;
                   const lastSeatNumber= parseInt(lastInsertedSeatNo);
                    console.log("Last Inserted Seat No:", lastSeatNumber);
                    console.log("Last Inserted Payment ID for this:",lastInsertedPaymentID);

                    const bookingUrl = `https://localhost:7265/api/Ticket?scheduleID=${scheduleID}&userID=${userID}&paymentID=${lastInsertedPaymentID}`;

                    const bookingData = {
                      "name": passengerName,
                      "nic": nic,
                      "date": date,
                      "board": board,
                      "dropping": dropping,
                      "status": status,
                      "seatCount": seatCount,
                      "scheduleID": scheduleID,
                      "userID": userID,
                      "paymentID": lastInsertedPaymentID
                    };

                    console.log("Booking Data:", bookingData);
                   
                    axios.post(bookingUrl, bookingData)
                      .then((bookingResult) => {

                        axios.get('https://localhost:7265/api/Ticket/last-inserted')
                        .then((ticketLastResult) => {

                          const thisTicket = ticketLastResult.data.ticketID;

                          const seatUrl = `https://localhost:7265/api/Seat?ticketID=${thisTicket}`;

                        for (let i = 1; i <= seatCount; i++) {
                              const seatData = {
                                "seatNo": lastSeatNumber + i,
                                "status": status,
                                "ticketID":thisTicket,
                              };
                              // Add seat data
                              axios
                                .post(seatUrl, seatData)
                                .then((seatResult) => {
                                  // Handle success
                                  toast.success("Seat added:", seatResult.data);
                                })
                                .catch((seatError) => {
                                  toast.error("Error adding seat:", seatError.message);
                                });
                            }

                            handleClose();
                            getData();
                            clear();
                            toast.success("Ticket has been updated");
                          })
                          .catch((ticketLastError) => {
                            toast.error("Error searching Last Ticket:", ticketLastError.message);
                          });
                        
                      })
                      .catch((bookingError) => {
                        toast.error("Error making booking:", bookingError.message);
                      });
                  })
                  .catch((seatError) => {
                    toast.error("Error retrieving seat number:", seatError.message);
                  });
              })
              .catch((ticketError) => {
                toast.error("Error retrieving ticket ID:", ticketError.message);
              });
          })
          .catch((paymentError) => {
            toast.error("Error retrieving payment ID:", paymentError.message);
          });
      })
      .catch((paymentError) => {
        toast.error("Error making payment:", paymentError.message);
      });
  };

  const clear = () => {
    setFromStationID("");
    setToStationID("");
  };

  return (
    <Fragment>
      <ToastContainer />
      <NavigationbarP />
      <div className="form-container-1">
        <Container>
          <h2 className="heading-top">Search Trains</h2>
          <form>
            <div className="form-container">
              <div className="form-group">
                <label>From</label>
                <select
                  value={fromStationID}
                  onChange={(e) => setFromStationID(e.target.value)}
                >
                  <option value="">Select Station</option>
                  {stations.map((station) => (
                    <option key={station.stationID} value={station.stationID}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <Form.Label>To</Form.Label>
                <select
                  value={toStationID}
                  onChange={(e) => setToStationID(e.target.value)}
                >
                  <option value="">Select Station</option>
                  {stations.map((station) => (
                    <option key={station.stationID} value={station.stationID}>
                      {station.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <Form.Label>Date</Form.Label>
                <input
                  type="date"
                  placeholder="Enter date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="button-container">
                <button
                  type="button"
                  className="button-class"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Container>

        <div className="train-section-2">
          <h2 className="heading-top-2">Train Details Table</h2>
          <Table striped bordered hover>
            <table className="train-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Train Name</th>
                  <th>Date</th>
                  <th>Origin</th>
                  <th>Destination </th>
                  <th>Departure Time</th>
                  <th>Arrival Time </th>
                  <th>Book Seat</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0
                  ? data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>

                          <td>{item.name}</td>
                          <td>{date}</td>
                          <td>{item.origin}</td>
                          <td>{item.destination}</td>
                          <td>{item.departureTime}</td>
                          <td>{item.arrivalTime}</td>

                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() =>
                                handleModelShow(
                                  item.scheduleIDs,
                                  item.trainID,
                                  date
                                )
                              }
                            >
                              Book Seat
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : "Loading..."}
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
          <form>
            <div>
              <label>Passenger Name</label>
              <input
                type="text"
                name="name"
                placeholder="Passenger Name"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
              />
            </div>
            <div>
              <label>NIC</label>
              <input
                type="text"
                name="nic"
                placeholder="NIC"
                value={nic}
                onChange={(e) => setNIC(e.target.value)}
              />
            </div>

            <div>
              <label>Board</label>
              <input
                type="text"
                name="board"
                placeholder="Boarding Point"
                value={board}
                onChange={(e) => setBoard(e.target.value)}
              />
            </div>
            <div>
              <label>Drop</label>
              <input
                type="text"
                name="drop"
                placeholder="Dropping Point"
                value={dropping}
                onChange={(e) => setDrop(e.target.value)}
              />
            </div>

            <div>
              <label>No of Seats</label>
              <select
                value={seatCount}
                onChange={(e) => setSeatCount(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBooking}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CRUD;
