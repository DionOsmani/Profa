
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

//===========================================================================================================
//                                          STAFF
//===========================================================================================================

app.MapGet("/get-all-staffs", async () => await StaffController.Get());

app.MapGet("/get-staff-by-id/{postId}", async (int staffId) =>
{
    staff staffToReturn = await StaffController.GetStaffById(staffId);

    if (staffToReturn != null)
    {
        return Results.Ok(staffToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-staff", [Authorize(Roles = "Admin")] async (staff staffToCreate) =>
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


app.MapPut("/update-staff", [Authorize(Roles = "Admin")] async (staff staffToUpdate) =>
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

app.MapDelete("/delete-staff-by-id/{staffId}", [Authorize(Roles = "Admin")] async (int staffId) =>
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

//===========================================================================================================
//                                          PRODUCTS
//===========================================================================================================
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

app.MapPost("/create-product", [Authorize(Roles = "Admin")] async (Product productToCreate) =>
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

app.MapPut("/update-product", [Authorize(Roles = "Admin")] async (Product productToUpdate) =>
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

app.MapDelete("/delete-product-by-id/{productId}", [Authorize(Roles = "Admin")] async (int productId) =>
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

//===========================================================================================================
//                                          DEPARTMENTS
//===========================================================================================================
app.MapGet("/get-all-departments", [Authorize(Roles = "Admin")] async () => await DepartmentController.Get());

app.MapGet("/get-department-by-id/{DepartmentId}", [Authorize(Roles = "Admin")] async (int departmentId) =>
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

app.MapPost("/create-department", [Authorize(Roles = "Admin")] async (Department departmentToCreate) =>
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

app.MapPut("/update-department", [Authorize(Roles = "Admin")] async (Department departmentToUpdate) =>
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

app.MapDelete("/delete-department-by-id/{departmentId}", [Authorize(Roles = "Admin")] async (int departmentId) =>
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

//===========================================================================================================
//                                          BRANCHES
//===========================================================================================================
app.MapGet("/get-all-branches", [Authorize(Roles = "Admin")] async () => await BranchController.Get());

app.MapGet("/get-branch-by-id/{BranchId}", [Authorize(Roles = "Admin")] async (int branchId) =>
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

app.MapPost("/create-branch", [Authorize(Roles = "Admin")] async (Branch branchToCreate) =>
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

app.MapPut("/update-branch", [Authorize(Roles = "Admin")] async (Branch branchToUpdate) =>
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

app.MapDelete("/delete-branch-by-id/{branchId}", [Authorize(Roles = "Admin")] async (int branchId) =>
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

//===========================================================================================================
//                                          ISSUES
//===========================================================================================================

app.MapGet("/get-all-issues", [Authorize(Roles = "Admin")] async () => await IssueController.Get());

app.MapGet("/get-issue-by-id/{IssueId}", [Authorize(Roles = "Admin")] async (int issueId) =>
{
    Issue issueToReturn = await IssueController.GetIssueById(issueId);

    if (issueToReturn != null)
    {
        return Results.Ok(issueToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-issue", [Authorize(Roles = "Admin")] async (Issue issueToCreate) =>
{
    bool createSuccessful = await IssueController.AddIssue(issueToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-issue", [Authorize(Roles = "Admin")] async (Issue issueToUpdate) =>
{
    bool updateSuccessful = await IssueController.UpdateIssue(issueToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-issue-by-id/{issueId}", [Authorize(Roles = "Admin")] async (int issueId) =>
{
    bool deleteSuccessful = await IssueController.DeleteIssue(issueId);
    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

//===========================================================================================================
//                                          EXTRA HOURS
//===========================================================================================================
app.MapGet("/get-all-extraHours", [Authorize(Roles = "Admin")] async () => await ExtraHourController.Get());

app.MapGet("/get-extraHour-by-id/{HoursId}", [Authorize(Roles = "Admin")] async (int HoursId) =>
{
    ExtraHour extraHourToReturn = await ExtraHourController.GetExtraHourById(HoursId);

    if (extraHourToReturn != null)
    {
        return Results.Ok(extraHourToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-extraHour", [Authorize(Roles = "Admin")] async (ExtraHour extraHourToCreate) =>
{
    bool createSuccessful = await ExtraHourController.AddExtraHour(extraHourToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-extraHour", [Authorize(Roles = "Admin")] async (ExtraHour extraHourToUpdate) =>
{
    bool updateSuccessful = await ExtraHourController.UpdateExtraHour(extraHourToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-extraHour-by-id/{HoursId}", [Authorize(Roles = "Admin")] async (int extraHourId) =>
{
    bool deleteSuccessful = await ExtraHourController.DeleteExtraHour(extraHourId);
    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

//===========================================================================================================
//                                          CUSTOMERS
//===========================================================================================================
app.MapGet("/get-all-customers", [Authorize(Roles = "Admin")] async () => await CustomerController.Get());

app.MapGet("/get-customer-by-id/{customerId}", [Authorize(Roles = "Admin")] async (int customerId) =>
{
    Customer customerToReturn = await CustomerController.GetCustomerById(customerId);

    if (customerToReturn != null)
    {
        return Results.Ok(customerToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-customer", [Authorize(Roles = "Admin")] async (Customer customerToCreate) =>
{
    bool createSuccessful = await CustomerController.AddCustomer(customerToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-customer", [Authorize(Roles = "Admin")] async (Customer customerToUpdate) =>
{
    bool updateSuccessful = await CustomerController.UpdateCustomer(customerToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-customer-by-id/{customerId}", [Authorize(Roles = "Admin")] async (int customerId) =>
{
    bool deleteSuccessful = await CustomerController.DeleteCustomer(customerId);
    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

//===========================================================================================================
//                                          BILLS
//===========================================================================================================
app.MapGet("/get-all-bills", [Authorize(Roles = "Admin")] async () => await BillController.Get());

app.MapGet("/get-bill-by-id/{billId}", [Authorize(Roles = "Admin")] async (int billId) =>
{
    Bill billToReturn = await BillController.GetBillById(billId);

    if (billToReturn != null)
    {
        return Results.Ok(billToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-bill", [Authorize(Roles = "Admin")] async (Bill  billToCreate) =>
{
    bool createSuccessful = await BillController.AddBill(billToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-bill", [Authorize(Roles = "Admin")] async (Bill billToUpdate) =>
{
    bool updateSuccessful = await BillController.UpdateBill(billToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-bill-by-id/{billId}", [Authorize(Roles = "Admin")] async (int billId) =>
{
    bool deleteSuccessful = await BillController.DeleteBill(billId);
    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});


//===========================================================================================================
//                                          MACHINERY
//===========================================================================================================
app.MapGet("/get-all-machineries", [Authorize(Roles = "Admin")] async () => await MachineryController.Get());

app.MapGet("/get-machinery-by-id/{machineryId}", [Authorize(Roles = "Admin")] async (int machineryId) =>
{
    Machinery machineryToReturn = await MachineryController.GetMachineryById(machineryId);

    if (machineryToReturn != null)
    {
        return Results.Ok(machineryToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-machinery", [Authorize(Roles = "Admin")] async (Machinery machineryToCreate) =>
{
    bool createSuccessful = await MachineryController.AddMachinery(machineryToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-machinery", [Authorize(Roles = "Admin")] async (Machinery machineryToUpdate) =>
{
    bool updateSuccessful = await MachineryController.UpdateMachinery(machineryToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-machinery-by-id/{machineryId}", [Authorize(Roles = "Admin")] async (int machineryId) =>
{
    bool deleteSuccessful = await MachineryController.DeleteMachinery(machineryId);
    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

//===========================================================================================================
//                                          MATERIAL
//===========================================================================================================
app.MapGet("/get-all-materials", [Authorize(Roles = "Admin")] async () => await MaterialController.Get());

app.MapGet("/get-material-by-id/{materialId}", [Authorize(Roles = "Admin")] async (int materialId) =>
{
    Material materialToReturn = await MaterialController.GetMaterialById(materialId);

    if (materialToReturn != null)
    {
        return Results.Ok(materialToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-material", [Authorize(Roles = "Admin")] async (Material materialToCreate) =>
{
    bool createSuccessful = await MaterialController.AddMaterial(materialToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-material", [Authorize(Roles = "Admin")] async (Material materialToUpdate) =>
{
    bool updateSuccessful = await MaterialController.UpdateMaterial(materialToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-material-by-id/{materialId}", [Authorize(Roles = "Admin")] async (int materialId) =>
{
    bool deleteSuccessful = await MaterialController.DeleteMaterial(materialId);
    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

//===========================================================================================================
//                                          REPORT
//===========================================================================================================
app.MapGet("/get-all-reports", [Authorize(Roles = "Admin")] async () => await ReportController.Get());

app.MapGet("/get-report-by-id/{reportId}", [Authorize(Roles = "Admin")] async (int reportId) =>
{
    Report reportToReturn = await ReportController.GetReportById(reportId);

    if (reportToReturn != null)
    {
        return Results.Ok(reportToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-report", [Authorize(Roles = "Admin")] async (Report reportToCreate) =>
{
    bool createSuccessful = await ReportController.AddReport(reportToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-report", [Authorize(Roles = "Admin")] async (Report reportToUpdate) =>
{
    bool updateSuccessful = await ReportController.UpdateReport(reportToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-report-by-id/{reportId}", [Authorize(Roles = "Admin")] async (int reportId) =>
{
    bool deleteSuccessful = await ReportController.DeleteReport(reportId);
    if (deleteSuccessful)
    {
        return Results.Ok("Delete Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

//===========================================================================================================
//                                          StaffPayment
//===========================================================================================================
app.MapGet("/get-all-staffPayments", [Authorize(Roles = "Admin")] async () => await StaffPaymentController.Get());

app.MapGet("/get-staffPayment-by-id/{staffPaymentId}", [Authorize(Roles = "Admin")] async (int staffPaymentId) =>
{
    StaffPayment staffPaymentToReturn = await StaffPaymentController.GetStaffPaymentById(staffPaymentId);

    if (staffPaymentToReturn != null)
    {
        return Results.Ok(staffPaymentToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-staffPayment", [Authorize(Roles = "Admin")] async (StaffPayment staffPaymentToCreate) =>
{
    bool createSuccessful = await StaffPaymentController.AddStaffPayment(staffPaymentToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-staffPayment", [Authorize(Roles = "Admin")] async (StaffPayment staffPaymentToUpdate) =>
{
    bool updateSuccessful = await StaffPaymentController.UpdateStaffPayment(staffPaymentToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-staffPayment-by-id/{staffPaymentId}", [Authorize(Roles = "Admin")] async (int staffPaymentId) =>
{
    bool deleteSuccessful = await StaffPaymentController.DeleteStaffPayment(staffPaymentId);
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
