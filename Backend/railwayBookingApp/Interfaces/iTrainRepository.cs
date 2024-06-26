using railwayBookingApp.Models;

namespace railwayBookingApp.Interfaces
{
    public interface iTrainRepository
    {
        ICollection<Train> GetTrains();
       
        Train GetTrain(int id);
        Train GetTrain(string name);
        string GetTrainOri(int id);
        string GetTrainDes(int id);  
        bool TrainExists(int tID);

        

        bool CreateTrain( Train train);

        bool UpdateTrain(Train train);

        bool DeleteTrain(Train train);

        bool Save();
    }
}
