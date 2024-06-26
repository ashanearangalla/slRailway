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

    public class SeatController: Controller
    {
        private readonly iSeatRepository _seatRepository;
        private readonly iTicketRepository _ticketRepository;
        private readonly IMapper _mapper;

        public SeatController(iSeatRepository seatRepository, iTicketRepository ticketRepository, IMapper mapper)
        {
            _seatRepository = seatRepository;
            _ticketRepository = ticketRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Seat>))]

        public IActionResult GetSeats()
        {
            var seats = _mapper.Map<List<SeatDto>>(_seatRepository.GetSeats());


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(seats);
        }


        [HttpGet("{seatID}")]
        [ProducesResponseType(200, Type = typeof(Seat))]
        [ProducesResponseType(400)]

        public IActionResult GetTrain(int seatID)
        {
            if (!_seatRepository.SeatExists(seatID))
                return NotFound();

            var seat = _mapper.Map<SeatDto>(_seatRepository.GetSeat(seatID));

            if (!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(seat);


        }

        [HttpGet("ticket/{ticketID}")]
        [ProducesResponseType(200, Type = typeof(Seat))]
        [ProducesResponseType(400)]

        public IActionResult GetSeatByTicket(int ticketID)
        {
            if (!_seatRepository.SeatTicketExists(ticketID))
                return NotFound();

            var seat = _mapper.Map<SeatDto>(_seatRepository.GetSeatByTicket(ticketID));

            if (!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(seat);


        }

        [HttpGet("last-inserted/{ticketID}")]
        public IActionResult GetLastInsertedSeatNoByTicket(int ticketID)
        {
            var lastSeatNo = _seatRepository.GetLastInsertedSeatNoByTicketID(ticketID);
            return Ok(new { seatNo = lastSeatNo });
        }



        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateSeat([FromQuery] int ticketID, [FromBody] SeatDto seatCreate)
        {
            if (seatCreate == null)
            {
                return BadRequest("Seat data is null.");
            }



            // Map UserDto to User entity
            var seatMap = _mapper.Map<Seat>(seatCreate);

            seatMap.Ticket = _ticketRepository.GetTicket(ticketID);

            // Create user in the repository
            if (!_seatRepository.CreateSeat(seatMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }


            return Ok("Successfullly created");

        }


        [HttpPut("{seatID}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateSchedule([FromQuery] int ticketID, int seatID, [FromBody] SeatDto updatedSeat)
        {
            if (updatedSeat == null)
            {
                return BadRequest(ModelState);
            }

            if (seatID != updatedSeat.seatID)
            {
                return BadRequest(ModelState);
            }

            if (!_seatRepository.SeatExists(seatID))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var seatMap = _mapper.Map<Seat>(updatedSeat);

            seatMap.Ticket = _ticketRepository.GetTicket(ticketID);

            if (!_seatRepository.UpdateSeat(seatMap))
            {
                ModelState.AddModelError("", "Something went wrong updating schedule");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }


        [HttpDelete("{seatID}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult DeleteSeat(int seatID)
        {
            if (!_seatRepository.SeatExists(seatID))
            {
                return NotFound();
            }

            var seatToDelete = _seatRepository.GetSeat(seatID);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_seatRepository.DeleteSeat(seatToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting Payment");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }


    }
}
