using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profa.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ComplaintController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        public ComplaintController(ProfaContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Complaint>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.Complaints.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Complaint> GetComplaintById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.Complaints.FirstOrDefaultAsync(Complaint => Complaint.ComplaintId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddComplaint(Complaint b)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    await dataContext.Complaints.AddAsync(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateComplaint(Complaint b)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.Complaints.Update(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpDelete("{id}")]
        public async static Task<bool> DeleteComplaint(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    Complaint complaintToDeleted = await GetComplaintById(ID);
                    dataContext.Remove(complaintToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}