namespace railwayBookingApp.Models
{
    public class Train
    {
        public int trainID { get; set; }
        public string name { get; set; }
        public string origin { get; set; }
        public string destination { get; set; }
        public TimeOnly departureTime { get; set; }
        public TimeOnly arrivalTime { get; set; }

        
        public ICollection<Schedule> Schedules { get; set; }
        public ICollection<TrainStation> TrainStations { get; set; }
    }
}
