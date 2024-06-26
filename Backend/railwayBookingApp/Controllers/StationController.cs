using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using railwayBookingApp.Dto;
using railwayBookingApp.Interfaces;
using railwayBookingApp.Models;
using railwayBookingApp.Repository;

namespace railwayBookingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class StationController : Controller
    {
        private readonly iStationRepository _stationRepository;
        private readonly IMapper _mapper;

        public StationController(iStationRepository stationRepository, IMapper mapper)
        {
            _stationRepository = stationRepository;
            _mapper = mapper;
        }


        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Station>))]

        public IActionResult GetSchedules()
        {
            var stations = _mapper.Map<List<StationDto>>(_stationRepository.GetStations());


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(stations);
        }


        [HttpGet("{stationID}")]
        [ProducesResponseType(200, Type = typeof(Station))]
        [ProducesResponseType(400)]

        public IActionResult GetTrain(int stationID)
        {
            if (!_stationRepository.StationExists(stationID))
                return NotFound();

            var station = _mapper.Map<StationDto>(_stationRepository.GetStation(stationID));

            if (!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(station);


        }

        [HttpGet("stations/{trainID}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Station>))]

        public IActionResult GetStationByTrain(int trainID)
        {
            if (!_stationRepository.TrainExists(trainID))
                return NotFound();

            var stations = _mapper.Map<List<StationDto>>(_stationRepository.GetStationByTrain(trainID));

            if (!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(stations);


        }


        [HttpGet("trains/{stationID}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Train>))]

        public IActionResult GetTrainByStation(int stationID)
        {
            if (!_stationRepository.StationExists(stationID))
                return NotFound();

            var trains = _mapper.Map<List<TrainDto>>(_stationRepository.GetTrainByStation(stationID));

            if (!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(trains);


        }
        

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateStation([FromBody] StationDto stationCreate)
        {
            if(stationCreate == null)
                return BadRequest(ModelState);

            var station = _stationRepository.GetStations()
                .Where(s => s.name.Trim().ToUpper() == stationCreate.name.TrimEnd().ToUpper())
                .FirstOrDefault(); 

            if(station != null)
            {
                ModelState.AddModelError("", "Station already exists");
                return StatusCode(422, ModelState);
            }

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var stationMap = _mapper.Map<Station>(stationCreate);

            if(!_stationRepository.CreateStation(stationMap))
            {
                ModelState.AddModelError("", "Something went wrong while savin");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully Created");
        }


        [HttpPost("trainStation")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateTrain([FromQuery] int stationID, [FromQuery] int trainID)
        {
            // Check if stationID or trainID is missing
            if (stationID == 0 || trainID == 0)
            {
                ModelState.AddModelError("", "stationID and trainID are required");
                return BadRequest(ModelState);
            }

            // Check if the train already exists
            var existingTrain = _stationRepository.GetTrainStations().FirstOrDefault(s => s.stationID == stationID && s.trainID == trainID);
            if (existingTrain != null)
            {
                ModelState.AddModelError("", "Train already exists");
                return StatusCode(422, ModelState);
            }

            // Create train station
            if (!_stationRepository.CreateTrainStation(stationID, trainID))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully Created"); // 204 - Success, no content to return
        }


        [HttpPut("{stationID}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateStation(int stationID, [FromBody] StationDto updatedStation)
        {
            if (updatedStation == null)
            {
                return BadRequest(ModelState);
            }

            if (stationID != updatedStation.stationID)
            {
                return BadRequest(ModelState);
            }

            if (!_stationRepository.StationExists(stationID))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var stationmap = _mapper.Map<Station>(updatedStation);

            if (!_stationRepository.UpdateStation(stationmap))
            {
                ModelState.AddModelError("", "Something went wrong updating station");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }


        [HttpGet("trains/{fromStationID}/{toStationID}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<TrainDto>))]
        [ProducesResponseType(404)]
        public IActionResult GetTrainBetweenStations(int fromStationID, int toStationID)
        {
            // Check if both stations exist
            if (!_stationRepository.StationExists(fromStationID) || !_stationRepository.StationExists(toStationID))
                return NotFound();

            var trains = _mapper.Map<List<TrainDto>>(_stationRepository.GetTrainBetweenStations(fromStationID, toStationID));

       
            

            if (trains == null || trains.Count == 0)
                return NotFound();



            return Ok(trains);
        }

        [HttpPut("update/{trainID}/{stationID}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateTrainStation(int trainID, int stationID, [FromQuery] int newStationID)
        {
            // Check if stationID or trainID is missing
            if (stationID == 0 || trainID == 0 ||newStationID == 0)
            {
                ModelState.AddModelError("", "stationID and trainID and newStationID are required");
                return BadRequest(ModelState);
            }

            
            var existingTrain = _stationRepository.GetTrainStations().FirstOrDefault(s => s.stationID == stationID && s.trainID == trainID);

            if (existingTrain == null)
            {
                return NotFound();
            }
            

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }


            // Create train station
            if (!_stationRepository.UpdateTrainStation(trainID, newStationID))
            {
                ModelState.AddModelError("", "Something went wrong updating Train Station");
                return StatusCode(500, ModelState);
            }

            return NoContent();

            

            
        }


        [HttpDelete("{stationID}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult DeleteStation(int stationID)
        {
            if (!_stationRepository.StationExists(stationID))
            {
                return NotFound();
            }

            var stationToDelete = _stationRepository.GetStation(stationID);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_stationRepository.DeleteStation(stationToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting Station");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }



    }
}
