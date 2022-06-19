
global using Microsoft.EntityFrameworkCore;
global using Profa.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Profa.Controllers;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy", 
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000", "https://appname.azurestaticapps.net");
        });
});
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<ProfaContext>(options =>
   {
       options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the bearer scheme(\"bearer {token}\") ",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => 
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CORSPolicy");



app.MapGet("/get-all-staffs",[Authorize(Roles = "Admin")] async () => await StaffController.Get());

app.MapGet("/get-staff-by-id/{postId}", async (int staffId) =>
{ 
    staff staffToReturn = await StaffController.GetStaffById(staffId);

    if (staffToReturn != null)
    {
        return Results.Ok(staffToReturn);
    }
    else {
        return Results.BadRequest();
    }
});

app.MapPost("/create-staff", async (staff staffToCreate) =>
{
    bool createSuccessfull = await StaffController.AddStaff(staffToCreate);
    if (createSuccessfull)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-staff", async (staff staffToUpdate) =>
{
    bool updateSuccessful = await StaffController.UpdateStaff(staffToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-staff-by-id/{staffId}", async (int staffId) =>
{
    bool deleteSuccessfull = await StaffController.DeleteStaff(staffId);
    if (deleteSuccessfull)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});


app.MapGet("/get-all-products", async () => await ProductController.Get());

app.MapGet("/get-product-by-id/{ProductId}", async (int productId) =>
{
    Product productToReturn = await ProductController.GetProductById(productId);

    if (productToReturn != null)
    {
        return Results.Ok(productToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-product", async (Product productToCreate) =>
{
    bool createSuccessful = await ProductController.AddProduct(productToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-product", async (Product productToUpdate) =>
{
    bool updateSuccessful = await ProductController.UpdateProduct(productToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-product-by-id/{productId}", async (int productId) =>
{
    bool deleteSuccessful = await ProductController.DeleteProduct(productId);
    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});




app.MapGet("/get-all-departments", async () => await DepartmentController.Get());

app.MapGet("/get-department-by-id/{DepartmentId}", async (int departmentId) =>
{
    Department departmentToReturn = await DepartmentController.GetDepartmentById(departmentId);

    if (departmentToReturn != null)
    {
        return Results.Ok(departmentToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-department", async (Department departmentToCreate) =>
{
    bool createSuccessful = await DepartmentController.AddDepartment(departmentToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-department", async (Department departmentToUpdate) =>
{
    bool updateSuccessful = await DepartmentController.UpdateDepartment(departmentToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-department-by-id/{departmentId}", async (int departmentId) =>
{
    bool deleteSuccessful = await DepartmentController.DeleteDepartment(departmentId);
    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});


app.MapGet("/get-all-branches", async () => await BranchController.Get());

app.MapGet("/get-branch-by-id/{BranchId}", async (int branchId) =>
{
    Branch branchToReturn = await BranchController.GetBranchById(branchId);

    if (branchToReturn != null)
    {
        return Results.Ok(branchToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-branch", async (Branch branchToCreate) =>
{
    bool createSuccessful = await BranchController.AddBranch(branchToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-branch", async (Branch branchToUpdate) =>
{
    bool updateSuccessful = await BranchController.UpdateBranch(branchToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-branch-by-id/{branchId}", async (int branchId) =>
{
    bool deleteSuccessful = await BranchController.DeleteBranch(branchId);
    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
