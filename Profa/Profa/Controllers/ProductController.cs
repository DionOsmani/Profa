using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Profa.Models;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        public ProductController(ProfaContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async static Task<ActionResult<List<Product>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.Products.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<Product> GetProductById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.Products.FirstOrDefaultAsync(staff => staff.ProductId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddProduct(Product p)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    await dataContext.Products.AddAsync(p);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        [HttpPut]
        public async static Task<bool> UpdateProduct(Product p)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.Products.Update(p);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        

        [HttpDelete("{id}")]
        public async static Task<bool> DeleteProduct(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    Product productToDeleted = await GetProductById(ID);
                    dataContext.Remove(productToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
    }
}