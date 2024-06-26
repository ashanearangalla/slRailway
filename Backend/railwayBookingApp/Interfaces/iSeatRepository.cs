using railwayBookingApp.Models;

namespace railwayBookingApp.Interfaces
{
    public interface iSeatRepository
    {
        ICollection<Seat> GetSeats();

        Seat GetSeatByTicket(int ticketID);

        Seat GetSeat(int id);
        bool SeatExists(int id);

        bool SeatTicketExists(int ticketID);

        int GetLastInsertedSeatNoByTicketID(int ticketID);

        bool CreateSeat(Seat seat);

        bool UpdateSeat(Seat seat);

        bool DeleteSeat(Seat seat);

        bool Save();
    }
}
