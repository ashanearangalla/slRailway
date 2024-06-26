using railwayBookingApp.DAL;
using railwayBookingApp.Interfaces;
using railwayBookingApp.Models;
using System.Reflection.Metadata.Ecma335;
using System.Linq;

namespace railwayBookingApp.Repository
{
    public class PaymentRepository : iPaymentRepository
    {
        private readonly DataContext _context;

        public PaymentRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreatePayment(Payment payment)
        {
            _context.Add(payment);

            return Save();
        }

        public int GetLastInsertedPaymentID()
        {
            var lastPayment = _context.Payments.OrderByDescending(p => p.paymentID).FirstOrDefault();
            return lastPayment?.paymentID ?? 0;
        }

        public Payment GetPayment(int id)
        {
            return _context.Payments.Where(p => p.paymentID == id).FirstOrDefault();
        }

        public ICollection<Payment> GetPayments()
        {
            return _context.Payments.ToList();
        }

        public bool PaymentExists(int id)
        {
            return _context.Payments.Any(p => p.paymentID == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdatePayment(Payment payment)
        {
            _context.Update(payment);
            return Save();
        }

        public bool DeletePayment(Payment payment)
        {
            _context.Remove(payment);
            return Save();
        }

    }
}
