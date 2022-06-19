using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profa.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        public ReportController(ProfaContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Report>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.Reports.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Report> GetReportById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.Reports.FirstOrDefaultAsync(staff => staff.ReportId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddReport(Report i)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    await dataContext.Reports.AddAsync(i);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateReport(Report i)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.Reports.Update(i);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpDelete("{id}")]
        public async static Task<bool> DeleteReport(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    Report reportToDeleted = await GetReportById(ID);
                    dataContext.Remove(reportToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}