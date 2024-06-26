using railwayBookingApp.DAL;
using railwayBookingApp.Interfaces;
using railwayBookingApp.Models;
using System.Net.Sockets;
using System.Security.Cryptography;

namespace railwayBookingApp.Repository
{
    public class TicketRepository : iTicketRepository
    {
        private readonly DataContext _context;

        public TicketRepository(DataContext context)
        {
            _context = context;
        }

        public Ticket GetTicket(int id)
        {
            return _context.Tickets.Where(t => t.ticketID == id).FirstOrDefault();
        }

        

        public ICollection<Ticket> GetTickets()
        {
            return _context.Tickets.ToList();
        }

        public int GetLastInsertedTicketID()
        {
            var lastTicket = _context.Tickets.OrderByDescending(t => t.ticketID).FirstOrDefault();
            return lastTicket?.ticketID ?? 0;
        }


        public ICollection<Ticket> GetTicketsFromASchedule(int scheduleID)
        {
            return _context.Tickets.Where(s => s.Schedule.scheduleID == scheduleID).ToList();
        }

        public ICollection<Ticket> GetTicketsFromAUser(int userID)
        {
            return _context.Tickets.Where(u => u.User.userID == userID).ToList();
        }

        public bool TicketExists(int id)
        {
            return _context.Tickets.Any(t => t.ticketID == id);
        }

        public bool ScheduleTicketExists(int id)
        {
            return _context.Tickets.Any(s => s.Schedule.scheduleID == id);
        }

        public bool UserTicketExists(int id)
        {
            return _context.Tickets.Any(u => u.User.userID == id);
        }

        

        public bool CreateTicket(Ticket ticket)
        {
            _context.Add(ticket);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateTicket(Ticket ticket)
        {
            _context.Update(ticket);
            return Save();
        }

        public Ticket GetTicketByPayment(int paymentID)
        {
            return _context.Tickets.Where(p => p.Payment.paymentID == paymentID).FirstOrDefault();
        }

        public bool PaymentTicketExists(int id)
        {
            return _context.Tickets.Any(p => p.Payment.paymentID == id);
        }

        public bool DeleteTicket(Ticket ticket)
        {
            _context.Remove(ticket);
            return Save();
        }

        public bool DeleteTickets(List<Ticket> tickets)
        {
            _context.RemoveRange(tickets);
            return Save();
        }

        public int GetLastInsertedTicketIDBySchedule(int scheduleID)
        {
            var lastTicket = _context.Tickets.Where(s => s.Schedule.scheduleID == scheduleID).OrderByDescending(t => t.ticketID).FirstOrDefault();
            return lastTicket?.ticketID ?? 0;
        }
    }
}
