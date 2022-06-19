using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profa.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class StaffPaymentController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        public StaffPaymentController(ProfaContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<StaffPayment>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.StaffPayments.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<StaffPayment> GetStaffPaymentById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.StaffPayments.FirstOrDefaultAsync(staff => staff.PaymentId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddStaffPayment(StaffPayment i)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    await dataContext.StaffPayments.AddAsync(i);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateStaffPayment(StaffPayment i)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.StaffPayments.Update(i);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpDelete("{id}")]
        public async static Task<bool> DeleteStaffPayment(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    StaffPayment staffPaymentToDeleted = await GetStaffPaymentById(ID);
                    dataContext.Remove(staffPaymentToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}