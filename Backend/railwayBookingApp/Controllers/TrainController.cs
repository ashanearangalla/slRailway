using AutoMapper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using railwayBookingApp.Dto;
using railwayBookingApp.Interfaces;
using railwayBookingApp.Models;
using railwayBookingApp.Repository;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;


namespace railwayBookingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TrainController : Controller
    {
        private readonly iTrainRepository _trainRepository;
        private readonly IMapper _mapper;

        public TrainController(iTrainRepository trainRepository, IMapper mapper)
        {
            _trainRepository = trainRepository;
            _mapper = mapper;
        }


        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Train>))]

        public IActionResult GetTrains()
        {
            var trains = _mapper.Map<List<TrainDto>>(_trainRepository.GetTrains());


            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(trains);
        }

        [HttpGet("{trainID}")]
        [ProducesResponseType(200, Type = typeof(Train))]
        [ProducesResponseType(400)]

        public IActionResult GetTrain(int trainID)
        {
            if(!_trainRepository.TrainExists(trainID))
                return NotFound();

            var train = _mapper.Map<TrainDto>(_trainRepository.GetTrain(trainID));

            if(!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(train);


        }


        [HttpGet("{trainID}/destination")]
        [ProducesResponseType(200, Type = typeof(string))]
        [ProducesResponseType(400)]

        public IActionResult GetTrainDes(int trainID)
        {
            if (!_trainRepository.TrainExists(trainID))
                return NotFound();

            var train = _trainRepository.GetTrainDes(trainID);

            if (!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(train);


        }


        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateTrain([FromBody] TrainDto trainCreate)
        {
            if (trainCreate == null)
            {
                return BadRequest(ModelState);
            }

            var trains = _trainRepository.GetTrains().Where(t => t.name.Trim().ToUpper() == trainCreate.name.TrimEnd().ToUpper()).FirstOrDefault();

            if (trains != null)
            {
                ModelState.AddModelError("", "Train already exists");
                return StatusCode(422, ModelState);
            }

            // Model state validation after duplicate user check
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Map UserDto to User entity
            var trainMap = _mapper.Map<Train>(trainCreate);

            
            // Create user in the repository
            if (!_trainRepository.CreateTrain( trainMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }


            return Ok("Successfullly created");

        }


        [HttpPut("{trainID}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdatePayment(int trainID, [FromBody] TrainDto updatedTrain)
        {
            if (updatedTrain == null)
            {
                return BadRequest(ModelState);
            }

            if (trainID != updatedTrain.trainID)
            {
                return BadRequest(ModelState);
            }

            if (!_trainRepository.TrainExists(trainID))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var trainmap = _mapper.Map<Train>(updatedTrain);

            if (!_trainRepository.UpdateTrain(trainmap))
            {
                ModelState.AddModelError("", "Something went wrong updating paymany");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }


        [HttpDelete("{trainID}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult DeleteTrain(int trainID)
        {
            if (!_trainRepository.TrainExists(trainID))
            {
                return NotFound();
            }


            var trainToDelete = _trainRepository.GetTrain(trainID);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_trainRepository.DeleteTrain(trainToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting Payment");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

    }
}
