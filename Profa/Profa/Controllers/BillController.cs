using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profa.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        public BillController(ProfaContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Bill>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.Bills.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Bill> GetBillById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.Bills.FirstOrDefaultAsync(Bill => Bill.BillId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddBill(Bill b)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    await dataContext.Bills.AddAsync(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateBill(Bill b)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.Bills.Update(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpDelete("{id}")]
        public async static Task<bool> DeleteBill(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    Bill billToDeleted = await GetBillById(ID);
                    dataContext.Remove(billToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}