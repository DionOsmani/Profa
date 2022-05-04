using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profa.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        public StaffController(ProfaContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<staff>>> Get()
        {
            return Ok(await dataContext.Staffs.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<staff>> Get(int id)
        {
            var staff = await dataContext.Staffs.FindAsync(id);
            if (staff == null) return BadRequest("Staff not found!");
            return Ok(staff);
        }
        [HttpPost]
        public async Task<ActionResult<List<staff>>> AddStaff(staff s)
        {
            dataContext.Staffs.Add(s);
            await dataContext.SaveChangesAsync();

            return Ok(await dataContext.Staffs.ToListAsync());
        }
        [HttpPut]
        public async Task<ActionResult<List<staff>>> UpdateStaff(staff request)
        {
            var dbStaff = await dataContext.Staffs.FindAsync(request.StaffId);
            if (dbStaff == null)
                return BadRequest("Staff not found!");

            dbStaff.StaffId = request.StaffId;
            dbStaff.Firstname = IsNullOrEmpty(request.Firstname) ? dbStaff.Firstname : request.Firstname;
            dbStaff.Surname = IsNullOrEmpty(request.Surname) ? dbStaff.Surname : request.Surname;
            dbStaff.Email = IsNullOrEmpty(request.Email) ? dbStaff.Email : request.Email;
            dbStaff.Age = (request.Age > 18) ? dbStaff.Age : request.Age;
            dbStaff.Gjinia = IsNullOrEmpty(request.Gjinia) ? dbStaff.Gjinia : request.Gjinia;
            dbStaff.Pass = IsNullOrEmpty(request.Pass) ? dbStaff.Pass : request.Pass;
            dbStaff.PhoneNumber = IsNullOrEmpty(request.PhoneNumber) ? dbStaff.PhoneNumber : request.PhoneNumber;
            dbStaff.Wage = (request.Wage > 350) ? dbStaff.Wage : request.Wage;
            dbStaff.BranchId = (request.BranchId != 0) ? dbStaff.BranchId : request.BranchId;



            await dataContext.SaveChangesAsync();

            return Ok(await dataContext.Staffs.ToListAsync());
        }
        private bool IsNullOrEmpty(string name)
        {
            return name == null || name == String.Empty;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<staff>>> Delete(int id)
        {
            var dbStaff = await dataContext.Staffs.FindAsync(id);
            if (dbStaff == null)
                return BadRequest("Staff not found!");

            dataContext.Staffs.Remove(dbStaff);
            await dataContext.SaveChangesAsync();

            return Ok(await dataContext.Staffs.ToListAsync());
        }
    }
}