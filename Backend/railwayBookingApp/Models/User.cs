namespace railwayBookingApp.Models
{
    public class User
    {
        public int userID { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string contactNo { get; set; }
        public string role{ get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}
