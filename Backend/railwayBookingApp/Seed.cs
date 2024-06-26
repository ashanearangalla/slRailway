using railwayBookingApp.DAL;
using railwayBookingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace railwayBookingApp
{
    public class Seed
    {
        private readonly DataContext dataContext;
        public Seed(DataContext context)
        {
            this.dataContext = context;
        }
        public void SeedDataContext()
        {
            if (!dataContext.TrainStations.Any())
            {
                var user = new User()
                {
                    username = "sam",
                    password = "123",
                    contactNo = "0776521122",
                    role = "customer"
                };
                var payment = new Payment() { amount = 1000.00, paymentDate = new DateTime(2024, 04, 08) };
                var colombo = new Station { name = "Colombo" };

                var Trains = new List<Train>()
                {
                    new Train()
                    {
                        name = "Yaal Devi",
                        origin = "Colombo Fort",
                        destination = "Jaffna",
                        departureTime = new TimeOnly(02, 00, 00),
                        arrivalTime = new TimeOnly(14, 30, 00),
                        Schedules = new List<Schedule>()
                        { new Schedule {departureDate = new DateOnly(2024,04,20), arrivalDate = new DateOnly(2024,04,20), noOfSeats=100, avaSeats=97, bookedSeats=3,
                        Tickets = new List<Ticket>()
                        {
                            new Ticket { name = "Saman", nic = "200234321222", date = new DateOnly(2024,04,20),
                            board = "Colombo Fort", dropping = "Jaffna", status= "active",
                            User = user,
                            Payment=  new Payment(){ amount = 500.00, paymentDate = new DateTime(2024,04,07)},
                            seatCount = 1,
                            Seats = new List<Seat>(){ new Seat { seatNo = 1, status = "active" }, }, },

                            new Ticket { name = "Nimal", nic = "200034121112", date = new DateOnly(2024,04,20),
                            board = "Ragama", dropping = "Jaffna", status= "active",
                            User = new User(){ username = "nimz", password = "123", contactNo="0773421144", role="customer"},
                            Payment=  new Payment(){ amount = 500.00, paymentDate = new DateTime(2024,04,08)},
                             seatCount = 1,
                            Seats = new List<Seat>(){ new Seat { seatNo = 2, status = "active" }, }, },

                            new Ticket { name = "Kamal", nic = "200776322202", date = new DateOnly(2024,04,20),
                            board = "Wennappuwa", dropping = "Jaffna", status= "active",
                            User = new User(){ username = "kam", password = "123", contactNo="0773268122", role="customer"},
                            Payment=  new Payment(){ amount = 500.00, paymentDate = new DateTime(2024,04,09)},
                             seatCount = 1,
                            Seats = new List<Seat>(){ new Seat { seatNo = 3, status = "active" }, }, },
                        } } },
                        
                        TrainStations= new List<TrainStation>()
                        {
                            new TrainStation { Station = colombo},
                            new TrainStation { Station = new Station() {name="Maradana"}},
                            new TrainStation { Station = new Station() {name="Ragama"}},
                            new TrainStation { Station = new Station() {name="Wennappuwa"}},
                            new TrainStation { Station = new Station() {name="Kalpitiya"}},
                            new TrainStation { Station = new Station() {name="Mannar"}},
                            new TrainStation { Station = new Station() {name="Jaffna"}}
                        }
                    },
                    new Train()
                    {
                        name = "Udarata Manike",
                        origin = "Colombo Fort",
                        destination = "Kandy",
                        departureTime = new TimeOnly(06,00,00),
                        arrivalTime = new TimeOnly(17,30,00),
                        Schedules = new List<Schedule>()
                        { new Schedule {departureDate = new DateOnly(2024,04,21), arrivalDate = new DateOnly(2024,04,21), noOfSeats=120, avaSeats=116, bookedSeats=4,
                        Tickets = new List<Ticket>()
                        {
                            new Ticket { name = "Ashane", nic = "200234334802", date = new DateOnly(2024,04,21),
                            board = "Colombo Fort", dropping = "Kadugannawa", status= "active",
                            User = new User(){ username = "ash", password = "123", contactNo="0776523422", role="customer"},
                            Payment=  new Payment(){ amount = 500.00, paymentDate = new DateTime(2024,04,07)},
                            seatCount = 1,
                            Seats = new List<Seat>(){ new Seat { seatNo = 1, status = "active" }, }, },

                            new Ticket { name = "Saman", nic = "200234321222", date = new DateOnly(2024,04,21),
                            board = "Ragama", dropping = "Kandy", status= "active",
                            User = user,
                            Payment=  payment,
                            seatCount = 1,
                            Seats = new List<Seat>(){ new Seat { seatNo = 2, status = "active" }, }, },

                            new Ticket { name = "Saman", nic = "200234321222", date = new DateOnly(2024,04,21),
                            board = "Ragama", dropping = "Kandy", status= "active",
                            User = user,
                            Payment=  payment,
                            seatCount = 2,
                            Seats = new List<Seat>(){ new Seat { seatNo = 3, status = "active" }, new Seat { seatNo = 4, status = "active" },}, },


                        },}, },
                        
                        TrainStations= new List<TrainStation>()
                        {
                            new TrainStation { Station = colombo},
                            new TrainStation { Station = new Station() {name="Maradana"}},
                            new TrainStation { Station = new Station() {name="Ragama"}},
                            new TrainStation { Station = new Station() {name="Kadugannawa"}},
                            new TrainStation { Station = new Station() {name="Peradeniya"}},
                            new TrainStation { Station = new Station() {name="Kandy"}}
                        }
                    }
                };
                dataContext.Trains.AddRange(Trains);
                dataContext.SaveChanges();
            }
        }
    }
}