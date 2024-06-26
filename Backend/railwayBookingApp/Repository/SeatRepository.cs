using railwayBookingApp.DAL;
using railwayBookingApp.Interfaces;
using railwayBookingApp.Models;

namespace railwayBookingApp.Repository
{
    public class SeatRepository: iSeatRepository
    {
        private readonly DataContext _context;

        public SeatRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateSeat(Seat seat)
        {

            
            _context.Add(seat);
            return Save();


        }

        public Seat GetSeat(int id)
        {
            return _context.Seats.Where(s => s.seatID == id).SingleOrDefault();
        }

        public Seat GetSeatByTicket(int ticketID)
        {
            return _context.Seats.Where(t => t.Ticket.ticketID == ticketID).SingleOrDefault();
        }

        public ICollection<Seat> GetSeats()
        {
            return _context.Seats.OrderBy(s => s.seatID).ToList();
        }

        


        public bool SeatExists(int id)
        {
            return _context.Seats.Any(s => s.seatID == id);
        }

        public bool SeatTicketExists(int ticketID)
        {
            return _context.Seats.Any(t => t.Ticket.ticketID == ticketID);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateSeat(Seat seat)
        {
            _context.Update(seat);
            return Save();
        }

        public bool DeleteSeat(Seat seat)
        {
            _context.Remove(seat);
            return Save();
        }

        public int GetLastInsertedSeatNoByTicketID(int ticketID)
        {
            var lastSeatNo= _context.Seats.Where(s => s.Ticket.ticketID == ticketID).OrderByDescending(s => s.seatNo).FirstOrDefault();
            return lastSeatNo?.seatNo ?? 0;
        }
    }
}
