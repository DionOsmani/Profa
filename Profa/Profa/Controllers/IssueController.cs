using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profa.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class IssueController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        public IssueController(ProfaContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Issue>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.Issues.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Issue> GetIssueById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.Issues.FirstOrDefaultAsync(staff => staff.IssuesId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddIssue(Issue i)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    await dataContext.Issues.AddAsync(i);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateIssue(Issue i)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.Issues.Update(i);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
       

        [HttpDelete("{id}")]
        public async static Task<bool> DeleteIssue(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    Issue issueToDeleted = await GetIssueById(ID);
                    dataContext.Remove(issueToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}