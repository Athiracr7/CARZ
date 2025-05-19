using CarZ.Data;
using CarZ.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarZ.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserDashBoardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserDashBoardController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAvailableCars()
        {
            var cars = await _context.Cars.Where(x=>x.BookStatus==0).ToListAsync();
            return Ok(cars);
        }


        [HttpPost]
        public async Task<IActionResult> BookCar(Bookcar carss)
        {
            try
            {
                var car = await _context.Cars.FindAsync(carss.carid);
                if (car == null) return NotFound("Car not found!");

                if (car.BookStatus == 1) return BadRequest("Car is already booked!");

                car.BookStatus = 1;
                car.bookedcustid = carss.userid; // ✅ Update booking status
                await _context.SaveChangesAsync();

                return Ok(new { message = "Car booked successfully!", car });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error booking car: {ex.Message}");
                return StatusCode(500, "Error booking car. Please try again!");
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchCars([FromQuery] string name, [FromQuery] string location)
        {
            try
            {
                var query = _context.Cars.AsQueryable();

                if (!string.IsNullOrEmpty(name))
                    query = query.Where(c => c.Brand.Contains(name)); // ✅ Case-insensitive search in SQL

                if (!string.IsNullOrEmpty(location))
                    query = query.Where(c => c.Location.Contains(location));

                var searchedCars = await query.ToListAsync();

                if (!searchedCars.Any())
                    return NotFound("No cars found!");

                return Ok(searchedCars);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error searching cars: {ex.Message}");
                return StatusCode(500, "Error searching cars. Please try again!");
            }
        }

        [HttpGet("bookedCars/{userId}")]
        public async Task<IActionResult> GetBookedCarsByUser(int userId)
        {
            try
            {
                var bookedCars = await _context.Cars.Where(c => c.BookStatus == 1 && c.bookedcustid == userId).ToListAsync(); // ✅ Fetch user's booked cars
                return Ok(bookedCars);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching booked cars: {ex.Message}");
                return StatusCode(500, "Error fetching booked cars.");
            }
        }


    }
}
