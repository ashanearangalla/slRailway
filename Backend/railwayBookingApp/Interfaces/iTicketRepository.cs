using railwayBookingApp.Models;

namespace railwayBookingApp.Interfaces
{
    public interface iTicketRepository
    {
        ICollection<Ticket> GetTickets();

        Ticket GetTicket(int id);

        ICollection<Ticket> GetTicketsFromASchedule(int scheduleID);

        ICollection<Ticket> GetTicketsFromAUser(int userID);

        

        Ticket GetTicketByPayment(int paymentID);

        bool TicketExists(int id);
        bool ScheduleTicketExists(int id);
        bool UserTicketExists(int id);

        int GetLastInsertedTicketID();

        int GetLastInsertedTicketIDBySchedule(int scheduleID);

        bool PaymentTicketExists(int id);

        bool CreateTicket(Ticket ticket);

        bool UpdateTicket(Ticket ticket);

        bool DeleteTicket(Ticket ticket);

        bool DeleteTickets(List<Ticket> tickets);


        bool Save();

    }
}
