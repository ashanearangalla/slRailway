namespace railwayBookingApp.Models
{
    public class Payment
    {
        public int paymentID { get; set; }
        public double amount { get; set; }
        public DateTime paymentDate { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}
