using railwayBookingApp.Models;

namespace railwayBookingApp.Interfaces
{
    public interface iStationRepository
    {
        ICollection<Station> GetStations();

        Station GetStation(int id);

        ICollection<Station> GetStationByTrain(int trainID);

        ICollection<Train> GetTrainByStation(int stationID);

        ICollection<TrainStation> GetTrainStations();

        bool StationExists(int id);

        bool TrainExists(int id);
        public List<Train> GetTrainBetweenStations(int fromStationID, int toStationID);

        bool CreateStation(Station station);
        bool CreateTrainStation(int stationID, int trainID);

        bool UpdateStation(Station station);
        bool DeleteStation(Station station);

        bool UpdateTrainStation(int stationID, int trainID);

        bool Save();
    }
}
