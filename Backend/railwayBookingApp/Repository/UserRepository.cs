using railwayBookingApp.DAL;
using railwayBookingApp.Interfaces;
using railwayBookingApp.Models;
using System.Diagnostics;

namespace railwayBookingApp.Repository
{
    public class UserRepository : iUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateUser(User user)
        {
            
            _context.Add(user);
            return Save();
                
        }

        public bool DeleteUser(User user)
        {
            _context.Remove(user);
            return Save();
        }

        public User GetUser(int id)
        {
            return _context.Users.Where(u => u.userID == id).SingleOrDefault();
        }

        public User GetUser(string username)
        {
            return _context.Users.Where(u => u.username == username).SingleOrDefault();
        }

       

        public ICollection<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateUser(User user)
        {
            _context.Update(user);
            return Save();
        }

        public bool UserExists(int id)
        {
            return _context.Users.Any(u => u.userID == id);
        }

        public bool UserExists(string username)
        {
            try
            {
                // Convert the provided username to lowercase and trim whitespace
                

                // Check if any user matches the normalized username
                bool userExists = _context.Users.Any(u => u.username.Trim().ToLower() == username);

                return userExists;
            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                // For now, just logging the exception and returning false
                Console.WriteLine($"An error occurred while checking if user '{username}' exists: {ex.Message}");
                return false;
            }
        }



    }
}
