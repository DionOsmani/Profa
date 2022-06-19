using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profa.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        public MaterialController(ProfaContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Material>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.Materials.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Material> GetMaterialById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.Materials.FirstOrDefaultAsync(staff => staff.MaterialId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddMaterial(Material i)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    await dataContext.Materials.AddAsync(i);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateMaterial(Material i)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.Materials.Update(i);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpDelete("{id}")]
        public async static Task<bool> DeleteMaterial(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    Material materialToDeleted = await GetMaterialById(ID);
                    dataContext.Remove(materialToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}