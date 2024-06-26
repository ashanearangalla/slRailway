using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using railwayBookingApp.Dto;
using railwayBookingApp.Interfaces;
using railwayBookingApp.Models;
using railwayBookingApp.Repository;

namespace railwayBookingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TicketController : Controller
    {
        private readonly iTicketRepository _ticketRepository;
        private readonly iTrainRepository _trainRepository;
        private readonly iScheduleRepository _scheduleRepository;
        private readonly iUserRepository _userRepository;
        private readonly iPaymentRepository _paymentRepository;
        private readonly iSeatRepository _seatRepository;
        private readonly IMapper _mapper;

        public TicketController(iTicketRepository ticketRepository,iTrainRepository trainRepository, iScheduleRepository scheduleRepository, iUserRepository userRepository,iPaymentRepository paymentRepository,
            iSeatRepository seatRepository, IMapper mapper)
        {
            _ticketRepository = ticketRepository;
            _trainRepository = trainRepository;
            _scheduleRepository = scheduleRepository;
            _userRepository = userRepository;
            _paymentRepository = paymentRepository;
            _seatRepository = seatRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Ticket>))]

        public IActionResult GetTickets()
        {
            var tickets = _mapper.Map<List<TicketDto>>(_ticketRepository.GetTickets());


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(tickets);
        }



        [HttpGet("{ticketID}")]
        [ProducesResponseType(200, Type = typeof(Ticket))]
        [ProducesResponseType(400)]

        public IActionResult GetTicket(int ticketID)
        {
            if (!_ticketRepository.TicketExists(ticketID))
                return NotFound();

            var ticket = _mapper.Map<TicketDto>(_ticketRepository.GetTicket(ticketID));

            if (!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(ticket);


        }


        [HttpGet("schedule/{scheduleID}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Ticket>))]

        public IActionResult GetTicketsFromASchedule(int scheduleID)
        {
            if (!_ticketRepository.ScheduleTicketExists(scheduleID))
                return NotFound();

            var tickets = _mapper.Map<List<TicketDto>>(_ticketRepository.GetTicketsFromASchedule(scheduleID));

            if (!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(tickets);


        }


        [HttpGet("users/{userID}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Ticket>))]

        public IActionResult GetTicketsFromAUser(int userID)
        {
            if (!_ticketRepository.UserTicketExists(userID))
                return NotFound();

            var tickets = _mapper.Map<List<TicketDto>>(_ticketRepository.GetTicketsFromAUser(userID));

            if (!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(tickets);


        }

        [HttpGet("last-inserted")]
        public IActionResult GetLastInsertedTicketID()
        {
            var lastTicketID = _ticketRepository.GetLastInsertedTicketID();
            return Ok(new { ticketID = lastTicketID });
        }


        [HttpGet("last-inserted/{scheduleID}")]
        public IActionResult GetLastInsertedTicketBySchedule(int scheduleID)
        {
            var lastTicketID = _ticketRepository.GetLastInsertedTicketIDBySchedule(scheduleID);
            return Ok(new { ticketID = lastTicketID });
        }


        [HttpGet("payment/{paymentID}")]
        [ProducesResponseType(200, Type = typeof(Ticket))]
        [ProducesResponseType(400)]

        public IActionResult GetTicketByPayment(int paymentID)
        {
            if (!_ticketRepository.PaymentTicketExists(paymentID))
                return NotFound();

            var ticket = _mapper.Map<TicketDto>(_ticketRepository.GetTicketByPayment(paymentID));

            if (!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(ticket);


        }


        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateTicket([FromQuery] int scheduleID, [FromQuery] int userID, [FromQuery] int paymentID,  [FromBody] TicketDto ticketCreate)
        {
            if (ticketCreate == null  )
            {
                return BadRequest("Ticket data is null.");
            }



            // Map UserDto to User entity
            var ticketMap = _mapper.Map<Ticket>(ticketCreate);
            
            
            


            ticketMap.Schedule = _scheduleRepository.GetSchedule(scheduleID);
            ticketMap.User = _userRepository.GetUser(userID);
            ticketMap.Payment = _paymentRepository.GetPayment(paymentID);



            // Create user in the repository
            if (!_ticketRepository.CreateTicket(ticketMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            

           
            

            return Ok("Successfullly created");

        }


        [HttpPut("{ticketID}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateSchedule([FromQuery] int trainID, [FromQuery] int userID, [FromQuery] int paymentID, int ticketID, [FromBody] TicketDto updatedTicket)
        {
            if (updatedTicket == null)
            {
                return BadRequest(ModelState);
            }

            if (ticketID != updatedTicket.ticketID)
            {
                return BadRequest(ModelState);
            }

            if (!_ticketRepository.TicketExists(ticketID))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var ticketMap = _mapper.Map<Ticket>(updatedTicket);


            ticketMap.Schedule = _scheduleRepository.GetSchedule(trainID);
            ticketMap.User = _userRepository.GetUser(userID);
            ticketMap.Payment = _paymentRepository.GetPayment(paymentID);

            if (!_ticketRepository.UpdateTicket(ticketMap))
            {
                ModelState.AddModelError("", "Something went wrong updating ticket");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }


        [HttpDelete("{ticketID}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult DeleteTicket(int ticketID)
        {
            if (!_ticketRepository.TicketExists(ticketID))
            {
                return NotFound();
            }


            var ticketToDelete = _ticketRepository.GetTicket(ticketID);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_ticketRepository.DeleteTicket(ticketToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting Payment");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

    }

    
}
