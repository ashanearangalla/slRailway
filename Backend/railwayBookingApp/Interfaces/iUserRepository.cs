using railwayBookingApp.Models;

namespace railwayBookingApp.Interfaces
{
    public interface iUserRepository
    {
        ICollection<User> GetUsers(); 

        User GetUser(int id);

        User GetUser(string username);

        

        bool UserExists(int id);
        bool UserExists(string username);

        bool CreateUser(User user);

        bool UpdateUser(User user);

        bool DeleteUser(User user);

        bool Save();
        
    }
}
