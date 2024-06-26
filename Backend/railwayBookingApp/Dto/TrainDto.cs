using railwayBookingApp.Models;

namespace railwayBookingApp.Dto
{
    public class TrainDto
    {
        public int trainID { get; set; }
        public string name { get; set; }
        public string origin { get; set; }
        public string destination { get; set; }
        public TimeOnly departureTime { get; set; }
        public TimeOnly arrivalTime { get; set; }
        
    }
}
