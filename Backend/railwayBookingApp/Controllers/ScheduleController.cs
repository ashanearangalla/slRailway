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

    public class ScheduleController : Controller
    {
        private readonly iScheduleRepository _scheduleRepository;
        private readonly iTrainRepository _trainRepository;
        private readonly IMapper _mapper;

        public ScheduleController(iScheduleRepository scheduleRepository, iTrainRepository trainRepository, IMapper mapper)
        {
            _scheduleRepository = scheduleRepository;
            _trainRepository = trainRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Schedule>))]

        public IActionResult GetSchedules()
        {
            var schedules = _mapper.Map<List<ScheduleDto>>(_scheduleRepository.GetSchedules());


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(schedules);
        }


        [HttpGet("{scheduleID}")]
        [ProducesResponseType(200, Type = typeof(Schedule))]
        [ProducesResponseType(400)]

        public IActionResult GetTrain(int scheduleID)
        {
            if (!_scheduleRepository.ScheduleExists(scheduleID))
                return NotFound();

            var schedule = _mapper.Map<ScheduleDto>(_scheduleRepository.GetSchedule(scheduleID));

            if (!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(schedule);


        }




        [HttpGet("schedules/{trainID}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Schedule>))]

        public IActionResult GetSchedulesOfATrain(int trainID)
        {
            if (!_scheduleRepository.TrainSchedulesExists(trainID))
                return NotFound();

            var schedules = _mapper.Map<List<ScheduleDto>>(_scheduleRepository.GetScheduleOfATrain(trainID));

            if (!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(schedules);


        }


        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]

        public IActionResult CreateSchedule([FromQuery] int trainID, [FromBody] ScheduleDto scheduleCreate)
        {
            if (scheduleCreate == null)
            {
                return BadRequest("User data is null.");
            }

            

            // Map UserDto to User entity
            var scheduleMap = _mapper.Map<Schedule>(scheduleCreate);

            scheduleMap.Train = _trainRepository.GetTrain(trainID);

            // Create user in the repository
            if (!_scheduleRepository.CreateSchedule(scheduleMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }


            return Ok("Successfullly created");

        }


        [HttpPut("{scheduleID}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateSchedule([FromQuery] int trainID, int scheduleID, [FromBody] ScheduleDto updatedSchedule)
        {
            if (updatedSchedule == null)
            {
                return BadRequest(ModelState);
            }

            if (scheduleID != updatedSchedule.scheduleID)
            {
                return BadRequest(ModelState);
            }

            if (!_scheduleRepository.ScheduleExists(scheduleID))
            {
                return NotFound();
            }

            if (!_trainRepository.TrainExists(trainID))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var scheduleMap = _mapper.Map<Schedule>(updatedSchedule);

            scheduleMap.Train = _trainRepository.GetTrain(trainID);

            if (!_scheduleRepository.UpdateSchedule(scheduleMap))
            {
                ModelState.AddModelError("", "Something went wrong updating schedule");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }



        [HttpDelete("{scheduleID}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult DeletePayment(int scheduleID)
        {
            if (!_scheduleRepository.ScheduleExists(scheduleID))
            {
                return NotFound();
            }

            var scheduleToDelete = _scheduleRepository.GetSchedule(scheduleID);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_scheduleRepository.DeleteSchedule(scheduleToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting Payment");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

    }
}
