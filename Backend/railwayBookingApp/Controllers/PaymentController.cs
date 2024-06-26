using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using railwayBookingApp.DAL;
using railwayBookingApp.Dto;
using railwayBookingApp.Interfaces;
using railwayBookingApp.Models;
using railwayBookingApp.Repository;

namespace railwayBookingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class PaymentController : Controller
    {

        private readonly iPaymentRepository _paymentRepository;
        private readonly IMapper _mapper;

        public PaymentController(iPaymentRepository paymentRepository, IMapper mapper)
        {
            _paymentRepository = paymentRepository;
            _mapper = mapper;
        }



        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Payment>))]

        public IActionResult GetPayments()
        {
            var payments = _mapper.Map<List<PaymentDto>>(_paymentRepository.GetPayments());


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(payments);
        }


        [HttpGet("{paymentID}")]
        [ProducesResponseType(200, Type = typeof(Payment))]
        [ProducesResponseType(400)]

        public IActionResult GetPayment(int paymentID)
        {
            if (!_paymentRepository.PaymentExists(paymentID))
                return NotFound();

            var payment = _mapper.Map<PaymentDto>(_paymentRepository.GetPayment(paymentID));

            if (!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(payment);


        }

        [HttpGet("last-inserted")]
        public IActionResult GetLastInsertedPaymentID()
        {
            var lastPaymentID = _paymentRepository.GetLastInsertedPaymentID();
            return Ok(new { paymentID = lastPaymentID });
        }


        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateTicket([FromBody] PaymentDto paymentCreate)
        {
            if (paymentCreate == null)
            {
                return BadRequest("Ticket data is null.");
            }



            // Map UserDto to User entity

            var paymentMap = _mapper.Map<Payment>(paymentCreate);


            if (!_paymentRepository.CreatePayment(paymentMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }


            return Ok("Successfullly created");

        }



        [HttpPut("{paymentID}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdatePayment(int paymentID, [FromBody] PaymentDto updatedPayment)
        {
            if(updatedPayment==null)
            {
                return BadRequest(ModelState);
            }

            if(paymentID != updatedPayment.paymentID)
            {
                return BadRequest(ModelState);
            }

            if(!_paymentRepository.PaymentExists(paymentID))
            {
                return NotFound();
            }

            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var paymentmap = _mapper.Map<Payment>(updatedPayment);

            if(!_paymentRepository.UpdatePayment(paymentmap))
            {
                ModelState.AddModelError("", "Something went wrong updating paymany");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }


        [HttpDelete("{paymentID}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult DeletePayment(int paymentID)
        {
            if(!_paymentRepository.PaymentExists(paymentID) )
            {
                return NotFound();
            }

            var paymentToDelete = _paymentRepository.GetPayment(paymentID);

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(!_paymentRepository.DeletePayment(paymentToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting Payment");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

    }
}
