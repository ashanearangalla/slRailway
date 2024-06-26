using railwayBookingApp.Models;

namespace railwayBookingApp.Interfaces
{
    public interface iPaymentRepository
    {
        ICollection<Payment> GetPayments();

        Payment GetPayment(int id);
        bool PaymentExists(int id);

        int GetLastInsertedPaymentID();

        bool CreatePayment(Payment payment);

        bool UpdatePayment(Payment payment);

        bool DeletePayment(Payment payment);

        bool Save();
    }
}
