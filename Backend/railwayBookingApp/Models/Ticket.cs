namespace railwayBookingApp.Models
{
    public class Ticket
    {
        public int ticketID { get; set; }
        public string name { get; set; }
        public string nic { get; set; }
        public DateOnly date { get; set; }
        public string board { get; set; }
        public string dropping { get; set; }
        public string status { get; set; }
        public int seatCount { get; set; }
        
        public ICollection<Seat> Seats { get; set; }

        public int scheduleID { get; set; }
        public int userID { get; set; }
        public int paymentID { get; set; }

        public Schedule Schedule { get; set; }

        public User User { get; set; }
        
        public Payment Payment { get; set; }

    }
}
