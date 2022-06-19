using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profa.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        public CustomerController(ProfaContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Customer>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.Customers.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Customer> GetCustomerById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.Customers.FirstOrDefaultAsync(Customer => Customer.CustomerId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddCustomer(Customer b)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    await dataContext.Customers.AddAsync(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateCustomer(Customer b)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.Customers.Update(b);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpDelete("{id}")]
        public async static Task<bool> DeleteCustomer(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    Customer customerToDeleted = await GetCustomerById(ID);
                    dataContext.Remove(customerToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}