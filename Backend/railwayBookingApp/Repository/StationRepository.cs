using railwayBookingApp.DAL;
using railwayBookingApp.Interfaces;
using railwayBookingApp.Models;
using System.Collections.Generic;
using System.Linq;

namespace railwayBookingApp.Repository
{
    public class StationRepository: iStationRepository
    {
        private readonly DataContext _context;

        public StationRepository(DataContext context)
        {
            _context = context;
        }

        public Station GetStation(int id)
        {
            return _context.Stations.Where(s => s.stationID == id).FirstOrDefault();
        }

        public List<Train> GetTrainBetweenStations(int fromStationID, int toStationID)
        {
            // Retrieve schedules for trains running between the specified stations
            var trains = _context.Trains
                .Where(s => s.TrainStations.Any(ts => ts.stationID == fromStationID) &&
                            s.TrainStations.Any(ts => ts.stationID == toStationID))
                .ToList();

            return trains;
        }

        public ICollection<Station> GetStations()
        {
            return _context.Stations.ToList();
        }

        public bool StationExists(int id)
        {
            return _context.Stations.Any(t => t.stationID == id);
        }

        public ICollection<Station> GetStationByTrain(int trainID)
        {
            return _context.TrainStations.Where(t => t.trainID == trainID).Select(s => s.Station).ToList();
        }

        public ICollection<Train> GetTrainByStation(int stationID)
        {
            return _context.TrainStations.Where(t => t.stationID == stationID).Select(t => t.Train).ToList();
        }

        public bool TrainExists(int id)
        {
            return _context.Trains.Any(t => t.trainID == id);
        }

        public bool CreateStation(Station station)
        {
            _context.Add(station);
            return Save();        
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool CreateTrainStation(int stationID, int trainID)
        {
            var stationEntity = _context.Stations.Where(s => s.stationID == stationID).FirstOrDefault();
            var trainEntity = _context.Trains.Where(t => t.trainID == trainID).FirstOrDefault();

            var trainStation = new TrainStation()
            {
                Station = stationEntity,
                Train = trainEntity
            };


            _context.Add(trainStation);

            return Save();
        }

        public ICollection<TrainStation> GetTrainStations()
        {
            return _context.TrainStations.ToList();
        }

        public bool UpdateTrainStation(int trainID,  int stationID)
        {
            var stationEntity = _context.Stations.Where(s => s.stationID == stationID).FirstOrDefault();
            var trainEntity = _context.Trains.Where(t => t.trainID == trainID).FirstOrDefault();

            var trainStation = new TrainStation()
            {
                Station = stationEntity,
                Train = trainEntity
            };


            _context.Update(trainStation);

            return Save();
        }

        public bool UpdateStation(Station station)
        {
            _context.Update(station);
            return Save();
        }

        public bool DeleteStation(Station station)
        {
            _context.Remove(station);
            return Save();
        }
    }
}
