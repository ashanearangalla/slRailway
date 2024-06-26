using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using railwayBookingApp.DAL;
using railwayBookingApp.Dto;
using railwayBookingApp.Interfaces;
using railwayBookingApp.Models;
using railwayBookingApp.Repository;

namespace railwayBookingApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class UserController: Controller
    {
        private readonly iUserRepository _userRepository;
        private readonly iTicketRepository _ticketRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public UserController(iUserRepository userRepository, iTicketRepository ticketRepository, IMapper mapper, DataContext context)
        {
            _userRepository = userRepository;
            _ticketRepository = ticketRepository;
            _mapper = mapper;
            _context = context;
        }


        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]

        public IActionResult GetUsers()
        {
            var users = _mapper.Map<List<UserDto>>(_userRepository.GetUsers());


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(users);
        }


        [HttpGet("{userID}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]

        public IActionResult GetUser(int userID)
        {
            if (!_userRepository.UserExists(userID))
                return NotFound();

            var user = _mapper.Map<UserDto>(_userRepository.GetUser(userID));

            if (!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(user);


        }

        [HttpGet("users/{username}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]

        public IActionResult GetUserByUsernamer(string username)
        {
            if (!_userRepository.UserExists(username))
                return NotFound();

            var user = _mapper.Map<UserDto>(_userRepository.GetUser(username));

            if (!ModelState.IsValid)
            { return BadRequest(ModelState); }

            return Ok(user);


        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateUser([FromBody] UserDto userCreate)
        {
            if (userCreate == null)
            {
                return BadRequest("User data is null.");
            }

            var user = _userRepository.GetUsers().Where(u => u.username.Trim().ToUpper() == userCreate.username.TrimEnd().ToUpper()).FirstOrDefault();

            if (user != null)
            {
                ModelState.AddModelError("", "User already exists");
                return StatusCode(422, ModelState);
            }

            // Model state validation after duplicate user check
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Map UserDto to User entity
            var userMap = _mapper.Map<User>(userCreate);

            // Create user in the repository
            if (!_userRepository.CreateUser(userMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }


            return Ok("Successfullly created");

        }


        [HttpPut("{userID}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdatePayment(int userID, [FromBody] UserDto updatedUser)
        {
            if (updatedUser == null)
            {
                return BadRequest(ModelState);
            }

            if (userID != updatedUser.userID)
            {
                return BadRequest(ModelState);
            }

            if (!_userRepository.UserExists(userID))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var usermap = _mapper.Map<User>(updatedUser);

            if (!_userRepository.UpdateUser(usermap))
            {
                ModelState.AddModelError("", "Something went wrong updating paymany");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{userID}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult DeleteUser(int userID)
        {
            if (!_userRepository.UserExists(userID))
            {
                return NotFound();
            }

           

            var userToDelete = _userRepository.GetUser(userID);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            

            if (!_userRepository.DeleteUser(userToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting Payment");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

    }


    
}
