using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profa.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MachineryController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        public MachineryController(ProfaContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Machinery>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.Machineries.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Machinery> GetMachineryById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.Machineries.FirstOrDefaultAsync(staff => staff.MachineryId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddMachinery(Machinery i)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    await dataContext.Machineries.AddAsync(i);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateMachinery(Machinery i)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.Machineries.Update(i);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpDelete("{id}")]
        public async static Task<bool> DeleteMachinery(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    Machinery machineryToDeleted = await GetMachineryById(ID);
                    dataContext.Remove(machineryToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}