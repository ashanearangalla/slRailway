using railwayBookingApp.DAL;
using railwayBookingApp.Interfaces;
using railwayBookingApp.Models;
using System;
using System.Diagnostics;
using System.Security.Cryptography;

namespace railwayBookingApp.Repository
{
    public class TrainRepository : iTrainRepository
    {
        private readonly DataContext _context;

        public TrainRepository(DataContext context) {

            _context = context;
        }

        public Train GetTrain(int id)
        {
            return _context.Trains.Where(t => t.trainID == id).FirstOrDefault();
        }

        public Train GetTrain(string name)
        {
            return _context.Trains.Where(t => t.name == name).FirstOrDefault();
        }


      


        public ICollection<Train> GetTrains()
        {
            return _context.Trains.ToList();
        }

        public bool TrainExists(int tID)
        {
           return _context.Trains.Any(t => t.trainID == tID);
        }



        public string GetTrainOri(int id)
        {
            var train = _context.Trains.Where(t => t.trainID == id).FirstOrDefault();
            string origin = train.origin;


            return origin;
        }

        public string GetTrainDes(int id)
        {
            var train = _context.Trains.Where(t => t.trainID == id).FirstOrDefault();
            string destination = train.destination;


            return destination;
        }

        

        public bool CreateTrain( Train train)
        {


            _context.Add(train);

            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;

        }

        public bool UpdateTrain(Train train)
        {
            _context.Update(train);

            return Save();
        }

        public bool DeleteTrain(Train train)
        {
            _context.Remove(train);

            return Save();
        }
    }
}
