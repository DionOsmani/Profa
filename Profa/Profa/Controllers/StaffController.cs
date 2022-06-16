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
        public async static Task<ActionResult<List<staff>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.Staffs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<staff> GetStaffById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.Staffs.FirstOrDefaultAsync( staff => staff.StaffId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddStaff(staff s)
        {
            using (var dataContext = new ProfaContext())
                try{
                    await dataContext.Staffs.AddAsync(s);
                    return await dataContext.SaveChangesAsync() >=1;
                }catch(Exception e){
                    return false;
                }

            
        }
        [HttpPut]
        public async static Task<bool> UpdateStaff(staff s)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.Staffs.Update(s);
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
        public async static Task<bool> DeleteStaff(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    staff staffToDeleted = await GetStaffById(ID);
                    dataContext.Remove(staffToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}