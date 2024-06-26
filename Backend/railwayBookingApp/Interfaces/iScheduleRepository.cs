using railwayBookingApp.Models;

namespace railwayBookingApp.Interfaces
{
    public interface iScheduleRepository
    {
        ICollection<Schedule> GetSchedules();

        Schedule GetSchedule(int id);

        ICollection<Schedule> GetScheduleOfATrain(int trainID);

        bool ScheduleExists(int id);
        bool TrainSchedulesExists(int id);

        bool CreateSchedule(Schedule schedule);

        bool UpdateSchedule(Schedule schedule);

        bool DeleteSchedule(Schedule schedule);

        bool Save();

    }
}
