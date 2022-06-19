using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profa.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BranchController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        public BranchController(ProfaContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Branch>>> Get()
        {
            return Ok(await dataContext.Branches.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Branch>> Get(int id)
        {
            var Branch = await dataContext.Branches.FindAsync(id);
            if (Branch == null) return BadRequest("Branch not found!");
            return Ok(Branch);
        }
        [HttpPost]
        public async Task<ActionResult<List<Branch>>> AddBranch(Branch b)
        {
            dataContext.Branches.Add(b);
            await dataContext.SaveChangesAsync();

            return Ok(await dataContext.Branches.ToListAsync());
        }
        [HttpPut]
        public async Task<ActionResult<List<Branch>>> UpdateBranch(Branch request)
        {
            var dbBranch = await dataContext.Branches.FindAsync(request.BranchId);
            if (dbBranch == null)
                return BadRequest("Branch not found!");

            dbBranch.BranchId = request.BranchId;
            dbBranch.BranchAddress = IsNullOrEmpty(request.BranchAddress) ? dbBranch.BranchAddress : request.BranchAddress;



            await dataContext.SaveChangesAsync();

            return Ok(await dataContext.Branches.ToListAsync());
        }
        private bool IsNullOrEmpty(string name)
        {
            return name == null || name == String.Empty;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Branch>>> Delete(int id)
        {
            var dbBranch = await dataContext.Branches.FindAsync(id);
            if (dbBranch == null)
                return BadRequest("Branch not found!");

            dataContext.Branches.Remove(dbBranch);
            await dataContext.SaveChangesAsync();

            return Ok(await dataContext.Branches.ToListAsync());
        }
    }
}