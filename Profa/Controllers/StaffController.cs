using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Profa.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Profa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly ProfaContext dataContext;
        private readonly IConfiguration _configuration;
        public StaffController(ProfaContext dataContext, IConfiguration configuration)
        {
            this.dataContext = dataContext;
            _configuration = configuration;
        }


        [HttpGet]
        public async static Task<ActionResult<List<staff>>> Get()
        {
            using (var dataContext = new ProfaContext())
                return await dataContext.Staffs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async static Task<staff> GetStaffById(int id)
        {
            using (var dataContext = new ProfaContext())
            {
                return await dataContext.Staffs.FirstOrDefaultAsync( staff => staff.StaffId == id);
            }
        }
        [HttpPost]
        public async static Task<bool> AddStaff(staff s)
        {
            using (var dataContext = new ProfaContext())
                try{
                    s.Pass = hashPassword(s.Pass);
                    await dataContext.Staffs.AddAsync(s);
                    return await dataContext.SaveChangesAsync() >=1;
                }catch(Exception e){
                    return false;
                }

           
        }
        [HttpPut]
        public async static Task<bool> UpdateStaff(staff s)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    dataContext.Staffs.Update(s);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }
        

        [HttpDelete("{id}")]
        public async static Task<bool> DeleteStaff(int ID)
        {
            using (var dataContext = new ProfaContext())
                try
                {
                    staff staffToDeleted = await GetStaffById(ID);
                    dataContext.Remove(staffToDeleted);
                    return await dataContext.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }


        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> staffLogin([FromBody] StaffLogin staff) {

            try
            {
                String password = hashPassword(staff.Pass);
                var dbStaff = dataContext.Staffs.Where(s => s.Email == staff.Email && s.Pass == password).FirstOrDefault();
                if (dbStaff == null)
                {
                    return BadRequest("");
                }

                string token = CreateToken(dbStaff);
                return Ok(token);
            }
            catch (Exception e)
            {
                return BadRequest("");
            }


            
        }

        private string CreateToken(staff Staff) {
            List<Claim> claims = new List<Claim>
            {
                new Claim("UserID", Staff.StaffId.ToString()),
                new Claim("Firstname", Staff.Firstname),
                new Claim("Surname", Staff.Surname),
                new Claim("Email", Staff.Email),
                new Claim("Role", Staff.Role),
                new Claim(ClaimTypes.Role, Staff.Role)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);


            return jwt;
        }







        static string hashPassword(string password) {
            var sha = SHA256.Create();
            var asByteArray = Encoding.Default.GetBytes(password);
            var hashedPassword =sha.ComputeHash(asByteArray);
            return Convert.ToBase64String(hashedPassword);
        }


    }
}