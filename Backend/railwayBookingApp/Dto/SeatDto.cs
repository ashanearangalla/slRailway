using railwayBookingApp.Models;

namespace railwayBookingApp.Dto
{
    public class SeatDto
    {
        public int seatID { get; set; }
        public int seatNo { get; set; }
        public string status { get; set; }

        public int ticketID { get; set; }
        
    }
}
