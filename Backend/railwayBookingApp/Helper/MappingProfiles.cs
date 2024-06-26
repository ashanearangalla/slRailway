using AutoMapper;
using railwayBookingApp.Dto;
using railwayBookingApp.Models;

namespace railwayBookingApp.Helper
{
    public class MappingProfiles :Profile
    {
        public MappingProfiles()
        {
            CreateMap<Train, TrainDto>().ReverseMap();

            CreateMap<Station, StationDto>().ReverseMap();
            CreateMap<Schedule, ScheduleDto>().ReverseMap();
            CreateMap<Ticket, TicketDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();

            CreateMap<Seat, SeatDto>().ReverseMap();
            CreateMap<Payment, PaymentDto>().ReverseMap();
        }
    }
}
