namespace railwayBookingApp.Models
{
    public class Seat
    {
        public int seatID { get; set; }
        public int seatNo { get; set;}
        public string status { get; set;}

        public int ticketID { get; set; }

        public Ticket Ticket { get; set; }


        
    }
}
