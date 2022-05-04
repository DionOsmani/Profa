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
        public async Task<ActionResult<List<Product>>> Get()
        {
            return Ok(await dataContext.Products.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var Product = await dataContext.Products.FindAsync(id);
            if (Product == null) return BadRequest("Product not found!");
            return Ok(Product);
        }
        [HttpPost]
        public async Task<ActionResult<List<Product>>> AddProduct(Product p)
        {
            dataContext.Products.Add(p);
            await dataContext.SaveChangesAsync();

            return Ok(await dataContext.Products.ToListAsync());
        }
        [HttpPut]
        public async Task<ActionResult<List<Product>>> UpdateProduct(Product request)
        {
            var dbProduct = await dataContext.Products.FindAsync(request.ProductId);
            if (dbProduct == null)
                return BadRequest("Product not found!");

            dbProduct.ProductId = request.ProductId;
            dbProduct.ProductType = IsNullOrEmpty(request.ProductType) ? dbProduct.ProductType : request.ProductType;
            dbProduct.Amount = (request.Amount > 0) ? dbProduct.Amount : request.Amount;
            dbProduct.Price = (request.Price > 0) ? dbProduct.Price : request.Price;



            await dataContext.SaveChangesAsync();

            return Ok(await dataContext.Products.ToListAsync());
        }
        private bool IsNullOrEmpty(string name)
        {
            return name == null || name == String.Empty;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Product>>> Delete(int id)
        {
            var dbProduct = await dataContext.Products.FindAsync(id);
            if (dbProduct == null)
                return BadRequest("Product not found!");

            dataContext.Products.Remove(dbProduct);
            await dataContext.SaveChangesAsync();

            return Ok(await dataContext.Products.ToListAsync());
        }
    }
}