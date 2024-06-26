using Microsoft.EntityFrameworkCore;
using railwayBookingApp;
using railwayBookingApp.DAL;
using railwayBookingApp.Interfaces;
using railwayBookingApp.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddTransient<Seed>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<iTrainRepository, TrainRepository>();
builder.Services.AddScoped<iScheduleRepository, ScheduleRepository>();
builder.Services.AddScoped<iStationRepository, StationRepository>();
builder.Services.AddScoped<iTicketRepository, TicketRepository>();
builder.Services.AddScoped<iUserRepository, UserRepository>();
builder.Services.AddScoped<iSeatRepository, SeatRepository>();
builder.Services.AddScoped<iPaymentRepository, PaymentRepository>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

var app = builder.Build();

if (args.Length == 1 && args[0].ToLower() == "seeddata")
    SeedData(app);

void SeedData(IHost app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();

    using (var scope = scopedFactory.CreateScope())
    {
        var service = scope.ServiceProvider.GetService<Seed>();
        service.SeedDataContext();
    }
}



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(builder =>
{
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();

});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
