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
        public async static Task<ActionResult<List<Branch>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.Branches.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Branch> GetBranchById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.Branches.FirstOrDefaultAsync(Branch => Branch.BranchId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddBranch(Branch b)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    await dataContext.Branches.AddAsync(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateBranch(Branch b)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.Branches.Update(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
      

        [HttpDelete("{id}")]
        public async static Task<bool> DeleteBranch(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    Branch branchToDeleted = await GetBranchById(ID);
                    dataContext.Remove(branchToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}