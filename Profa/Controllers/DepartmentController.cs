using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profa.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        public DepartmentController(ProfaContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Department>>> Get()
        {
            return Ok(await dataContext.Departments.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> Get(int id)
        {
            var Department = await dataContext.Departments.FindAsync(id);
            if (Department == null) return BadRequest("Department not found!");
            return Ok(Department);
        }
        [HttpPost]
        public async Task<ActionResult<List<Department>>> AddDepartment(Department d)
        {
            dataContext.Departments.Add(d);
            await dataContext.SaveChangesAsync();

            return Ok(await dataContext.Departments.ToListAsync());
        }
        [HttpPut]
        public async Task<ActionResult<List<Department>>> UpdateDepartment(Department request)
        {
            var dbDepartment = await dataContext.Departments.FindAsync(request.DepartmentId);
            if (dbDepartment == null)
                return BadRequest("Department not found!");

            dbDepartment.DepartmentId = request.DepartmentId;
            dbDepartment.Specialisation = IsNullOrEmpty(request.Specialisation) ? dbDepartment.Specialisation : request.Specialisation;
            dbDepartment.BranchId =(request.BranchId==0) ? dbDepartment.BranchId : request.BranchId;
            


            await dataContext.SaveChangesAsync();

            return Ok(await dataContext.Departments.ToListAsync());
        }
        private bool IsNullOrEmpty(string name)
        {
            return name == null || name == String.Empty;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Department>>> Delete(int id)
        {
            var dbDepartment = await dataContext.Departments.FindAsync(id);
            if (dbDepartment == null)
                return BadRequest("Department not found!");

            dataContext.Departments.Remove(dbDepartment);
            await dataContext.SaveChangesAsync();

            return Ok(await dataContext.Departments.ToListAsync());
        }
    }
}