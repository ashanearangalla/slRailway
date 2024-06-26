namespace railwayBookingApp.Dto
{
    public class TicketDto
    {
        public int ticketID { get; set; }
        public string name { get; set; }
        public string nic { get; set; }
        public DateOnly date { get; set; }
        public string board { get; set; }
        public string dropping { get; set; }
        public string status { get; set; }
        public int seatCount { get; set; }

        public int scheduleID { get; set; }
        public int userID { get; set; }
        public int paymentID { get; set; }


    }
}
