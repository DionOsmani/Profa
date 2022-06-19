using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profa.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ToolController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        public ToolController(ProfaContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Tool>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.Tools.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Tool> GetToolById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.Tools.FirstOrDefaultAsync(Tool => Tool.ToolId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddTool(Tool b)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    await dataContext.Tools.AddAsync(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateTool(Tool b)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.Tools.Update(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpDelete("{id}")]
        public async static Task<bool> DeleteTool(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    Tool toolToDeleted = await GetToolById(ID);
                    dataContext.Remove(toolToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}