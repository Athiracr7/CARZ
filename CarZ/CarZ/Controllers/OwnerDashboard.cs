using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarZ.Data;
using CarZ.Model;

[ApiController]
[Route("api/[controller]")]
public class OwnerDashboardController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public OwnerDashboardController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: Retrieve all cars for a specific owner
    [HttpGet("{ownerId}")]
    public async Task<IActionResult> GetOwnerCars(int ownerId)
    {
        var cars = await _context.Cars.Where(c => c.OwnerId == ownerId).ToListAsync();
        return Ok(cars);
    }


    [HttpGet("car/{searchTerm}")]
    public async Task<IActionResult> GetCarById(int searchTerm)
    {
        if (searchTerm <= 0)
            return BadRequest("Invalid car ID!");

        try
        {
            var car = await _context.Cars.FindAsync(searchTerm);
            if (car == null)
                return NotFound(new { message = "Car not found!" });

            return Ok(car);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching car: {ex.Message}"); // ✅ Logs error
            return StatusCode(500, "An internal server error occurred.");
        }
    }

    // POST: Add a new car
    [HttpPost("{ownerId}")]
    public async Task<IActionResult> AddCar([FromBody] AddCarRequest car,int ownerId)
    {
        if (car == null)
            return BadRequest("Car details are required");

        var cars = new Car
        {
            Brand = car.brand,
            Model = car.Model,
            Location = car.location,
            OwnerId = ownerId
        };

        _context.Cars.Add(cars);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Car added successfully", car });
    }

    // PUT: Edit an existing car
    [HttpPut("{carid}")]
    public async Task<IActionResult> UpdateCar([FromBody] Updatecar updatedCar,int carid)
    {
        var car = await _context.Cars.FindAsync(carid);
        if (updatedCar == null)
            return NotFound("Enter edit details");

        car.Brand = updatedCar.brand;
        car.Model = updatedCar.model;
        car.Location = updatedCar.location;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Car updated successfully", car });
    }

    // DELETE: Remove a car
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCar(int id)
    {
        var car = await _context.Cars.FindAsync(id);
        if (car == null)
            return NotFound("Car not found");

        _context.Cars.Remove(car);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Car deleted successfully" });
    }
}
