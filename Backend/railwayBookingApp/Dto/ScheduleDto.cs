using railwayBookingApp.Models;

namespace railwayBookingApp.Dto
{
    public class ScheduleDto
    {
        public int scheduleID { get; set; }
        public DateOnly departureDate { get; set; }
        public DateOnly arrivalDate { get; set; }
        
        public int noOfSeats { get; set; }
        public int avaSeats { get; set; }
        public int bookedSeats { get; set; }
        

        public int trainID { get; set; }
        
    }
}
