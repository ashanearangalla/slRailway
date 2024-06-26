using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using railwayBookingApp.Models;

namespace railwayBookingApp.DAL
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<Payment> Payments { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Station> Stations { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Train> Trains { get; set; }
        public DbSet<TrainStation> TrainStations { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define composite key for Seat
            

            

            modelBuilder.Entity<TrainStation>()
                .HasKey(ts => new { ts.trainID, ts.stationID });
            modelBuilder.Entity<TrainStation>()
                .HasOne(t => t.Train)
                .WithMany(ts => ts.TrainStations)
                .HasForeignKey(t => t.trainID);
            modelBuilder.Entity<TrainStation>()
                .HasOne(t => t.Station)
                .WithMany(ts => ts.TrainStations)
                .HasForeignKey(s => s.stationID);

        }

    }

    
}
