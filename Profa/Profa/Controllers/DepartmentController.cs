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
        public async static Task<ActionResult<List<Department>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.Departments.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Department> GetDepartmentById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.Departments.FirstOrDefaultAsync(Department => Department.DepartmentId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddDepartment(Department d)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    await dataContext.Departments.AddAsync(d);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateDepartment(Department d)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.Departments.Update(d);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        private bool IsNullOrEmpty(string name)
        {
            return name == null || name == String.Empty;
        }

        [HttpDelete("{id}")]
        public async static Task<bool> DeleteDepartment(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    Department departmentToDeleted = await GetDepartmentById(ID);
                    dataContext.Remove(departmentToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}