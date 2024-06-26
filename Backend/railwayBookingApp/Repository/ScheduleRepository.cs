using railwayBookingApp.DAL;
using railwayBookingApp.Interfaces;
using railwayBookingApp.Models;



namespace railwayBookingApp.Repository
{
    public class ScheduleRepository : iScheduleRepository
    {
        private readonly DataContext _context;

        public ScheduleRepository(DataContext context)
        {
            _context = context;
        }

        public Schedule GetSchedule(int id)
        {
            return _context.Schedules.Where(s => s.scheduleID == id).FirstOrDefault();
        }

        public ICollection<Schedule> GetSchedules()
        {
            return _context.Schedules.OrderBy(s => s.scheduleID).ToList();
        }

        public ICollection<Schedule> GetScheduleOfATrain(int trainID)
        {
            return _context.Schedules.Where(t => t.Train.trainID == trainID).ToList();
        }

        public bool ScheduleExists(int id)
        {
            return _context.Schedules.Any(s => s.scheduleID == id);
        }

        public bool TrainSchedulesExists(int id)
        {
            return _context.Schedules.Any(t => t.Train.trainID == id);
        }

        public bool CreateSchedule(Schedule schedule)
        {

            _context.Add(schedule); ;
            return Save();
        }
        

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateSchedule(Schedule schedule)
        {
            _context.Update(schedule); 
            return Save();
        }

        public bool DeleteSchedule(Schedule schedule)
        {
            _context.Remove(schedule);
            return Save();
        }
    }
}
