namespace railwayBookingApp.Models
{
    public class Station
    {
        public int stationID { get; set; }
        public string name { get; set; }
        public ICollection<TrainStation> TrainStations { get; set; }
    }
}
