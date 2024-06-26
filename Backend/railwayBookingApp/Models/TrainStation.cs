namespace railwayBookingApp.Models
{
    public class TrainStation
    {
        public int trainID { get; set; }
        public int stationID { get; set; }
        public Train Train { get; set; }
        public Station Station { get; set; }

    }
}
