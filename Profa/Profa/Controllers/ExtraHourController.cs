using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profa.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ExtraHourController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        public ExtraHourController(ProfaContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<ExtraHour>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.ExtraHours.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<ExtraHour> GetExtraHourById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.ExtraHours.FirstOrDefaultAsync(ExtraHour => ExtraHour.HoursId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddExtraHour(ExtraHour b)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    await dataContext.ExtraHours.AddAsync(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateExtraHour(ExtraHour b)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.ExtraHours.Update(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpDelete("{id}")]
        public async static Task<bool> DeleteExtraHour(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    ExtraHour extraHourToDeleted = await GetExtraHourById(ID);
                    dataContext.Remove(extraHourToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}