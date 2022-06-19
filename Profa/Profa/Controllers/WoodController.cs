using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profa.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class WoodController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        public WoodController(ProfaContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Wood>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.Woods.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Wood> GetWoodById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.Woods.FirstOrDefaultAsync(Wood => Wood.WoodId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddWood(Wood b)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    await dataContext.Woods.AddAsync(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateWood(Wood b)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.Woods.Update(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpDelete("{id}")]
        public async static Task<bool> DeleteWood(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    Wood woodToDeleted = await GetWoodById(ID);
                    dataContext.Remove(woodToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}