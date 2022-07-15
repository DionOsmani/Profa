
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

app.MapGet("/get-all-staffs", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async () => await StaffController.Get());

app.MapGet("/get-staff-by-id/{staffId}", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (int staffId) =>
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

app.MapPost("/create-staff", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (staff staffToCreate) =>
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

app.MapPut("/update-staff", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (staff staffToUpdate) =>
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

app.MapDelete("/delete-staff-by-id/{staffId}", [Authorize(Roles = "bHead, Admin, HeadAdmin")] async (int staffId) =>
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
app.MapGet("/get-all-products", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async () => await ProductController.Get());

app.MapGet("/get-product-by-id/{productId}", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (int productId) =>
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

app.MapPost("/create-product", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (Product productToCreate) =>
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

app.MapPut("/update-product", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (Product productToUpdate) =>
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

app.MapDelete("/delete-product-by-id/{productId}", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (int productId) =>
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
app.MapGet("/get-all-departments", [Authorize(Roles = "bHead, Admin, HeadAdmin")] async () => await DepartmentController.Get());

app.MapGet("/get-departments-by-branch-id/{branchId}", [Authorize(Roles = "bHead, Admin, HeadAdmin")] async (int branchId) =>
{
    List<Department> departmentsToReturn = await DepartmentController.GetDepartmentsByBranchId(branchId);

    if (departmentsToReturn != null)
    {
        return Results.Ok(departmentsToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});


app.MapGet("/get-department-by-id/{departmentId}", [Authorize(Roles = "bHead, Admin, HeadAdmin")] async (int departmentId) =>
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

app.MapPost("/create-department", [Authorize(Roles = "bHead, Admin, HeadAdmin")] async (Department departmentToCreate) =>
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

app.MapPut("/update-department", [Authorize(Roles = "bHead, Admin, HeadAdmin")] async (Department departmentToUpdate) =>
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

app.MapDelete("/delete-department-by-id/{departmentId}", [Authorize(Roles = "bHead, Admin, HeadAdmin")] async (int departmentId) =>
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
app.MapGet("/get-all-branches", [Authorize(Roles = "Admin, HeadAdmin")] async () => await BranchController.Get());

app.MapGet("/get-branch-by-id/{BranchId}", [Authorize(Roles = "Admin, HeadAdmin")] async (int branchId) =>
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

app.MapPost("/create-branch", [Authorize(Roles = "Admin, HeadAdmin")] async (Branch branchToCreate) =>
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

app.MapPut("/update-branch", [Authorize(Roles = "Admin, HeadAdmin")] async (Branch branchToUpdate) =>
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

app.MapDelete("/delete-branch-by-id/{branchId}", [Authorize(Roles = "Admin, HeadAdmin")] async (int branchId) =>
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

app.MapGet("/get-all-issues", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async () => await IssueController.Get());

app.MapGet("/get-issue-by-id/{IssueId}", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (int issueId) =>
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

app.MapPost("/create-issue", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (Issue issueToCreate) =>
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

app.MapPut("/update-issue", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (Issue issueToUpdate) =>
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

app.MapDelete("/delete-issue-by-id/{issueId}", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (int issueId) =>
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
app.MapGet("/get-all-extraHours", [Authorize(Roles = "secretary, worker, dHead, bHead, Admin, HeadAdmin")] async () => await ExtraHourController.Get());

app.MapGet("/get-extraHour-by-id/{HoursId}", [Authorize(Roles = "secretary, worker, dHead, bHead, Admin, HeadAdmin")] async (int HoursId) =>
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

app.MapPost("/create-extraHour", [Authorize(Roles = "secretary, worker, dHead, bHead, Admin, HeadAdmin")] async (ExtraHour extraHourToCreate) =>
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

app.MapPut("/update-extraHour", [Authorize(Roles = "secretary, worker, dHead, bHead, Admin, HeadAdmin")] async (ExtraHour extraHourToUpdate) =>
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

app.MapDelete("/delete-extraHour-by-id/{HoursId}", [Authorize(Roles = " Admin, HeadAdmin")] async (int extraHourId) =>
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
app.MapGet("/get-all-customers", [Authorize(Roles = "secretary, dHead, bHead, Admin, HeadAdmin")] async () => await CustomerController.Get());

app.MapGet("/get-customer-by-id/{customerId}", [Authorize(Roles = "secretary, dHead, bHead, Admin, HeadAdmin")] async (int customerId) =>
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

app.MapPost("/create-customer", [Authorize(Roles = "secretary, dHead, bHead, Admin, HeadAdmin")] async (Customer customerToCreate) =>
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

app.MapPut("/update-customer", [Authorize(Roles = "secretary, dHead, bHead, Admin, HeadAdmin")] async (Customer customerToUpdate) =>
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

app.MapDelete("/delete-customer-by-id/{customerId}", [Authorize(Roles = "secretary, dHead, bHead, Admin, HeadAdmin")] async (int customerId) =>
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
app.MapGet("/get-all-bills", [Authorize(Roles = "secretary, dHead, bHead, Admin, HeadAdmin")] async () => await BillController.Get());

app.MapGet("/get-bill-by-id/{billId}", [Authorize(Roles = "secretary, dHead, bHead, Admin, HeadAdmin")] async (int billId) =>
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

app.MapPost("/create-bill", [Authorize(Roles = "secretary, dHead, bHead, Admin, HeadAdmin")] async (Bill billToCreate) =>
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

app.MapPut("/update-bill", [Authorize(Roles = "secretary, dHead, bHead, Admin, HeadAdmin")] async (Bill billToUpdate) =>
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

app.MapDelete("/delete-bill-by-id/{billId}", [Authorize(Roles = "bHead, Admin, HeadAdmin")] async (int billId) =>
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
app.MapGet("/get-all-machineries", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async () => await MachineryController.Get());

app.MapGet("/get-machinery-by-id/{machineryId}", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (int machineryId) =>
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

app.MapPost("/create-machinery", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (Machinery machineryToCreate) =>
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

app.MapPut("/update-machinery", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (Machinery machineryToUpdate) =>
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

app.MapDelete("/delete-machinery-by-id/{machineryId}", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (int machineryId) =>
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
app.MapGet("/get-all-materials", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async () => await MaterialController.Get());

app.MapGet("/get-material-by-id/{materialId}", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (int materialId) =>
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

app.MapPost("/create-material", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (Material materialToCreate) =>
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

app.MapPut("/update-material", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (Material materialToUpdate) =>
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

app.MapDelete("/delete-material-by-id/{materialId}", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (int materialId) =>
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
app.MapGet("/get-all-reports", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async () => await ReportController.Get());

app.MapGet("/get-report-by-id/{reportId}", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (int reportId) =>
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

app.MapPost("/create-report", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (Report reportToCreate) =>
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

app.MapPut("/update-report", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (Report reportToUpdate) =>
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

app.MapDelete("/delete-report-by-id/{reportId}", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (int reportId) =>
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
app.MapGet("/get-all-staffPayments", [Authorize(Roles = "Admin, HeadAdmin")] async () => await StaffPaymentController.Get());

app.MapGet("/get-staffPayment-by-id/{staffPaymentId}", [Authorize(Roles = "Admin, HeadAdmin")] async (int staffPaymentId) =>
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

app.MapPost("/create-staffPayment", [Authorize(Roles = "Admin, HeadAdmin")] async (StaffPayment staffPaymentToCreate) =>
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

app.MapPut("/update-staffPayment", [Authorize(Roles = "Admin, HeadAdmin")] async (StaffPayment staffPaymentToUpdate) =>
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

app.MapDelete("/delete-staffPayment-by-id/{staffPaymentId}", [Authorize(Roles = "Admin, HeadAdmin")] async (int staffPaymentId) =>
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


//===========================================================================================================
//                                          TOOLS
//===========================================================================================================
app.MapGet("/get-all-tools", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async () => await ToolController.Get());

app.MapGet("/get-tool-by-id/{toolId}", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (int toolId) =>
{
    Tool toolToReturn = await ToolController.GetToolById(toolId);

    if (toolToReturn != null)
    {
        return Results.Ok(toolToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-tool", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (Tool toolToCreate) =>
{
    bool createSuccessful = await ToolController.AddTool(toolToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-tool", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (Tool toolToUpdate) =>
{
    bool updateSuccessful = await ToolController.UpdateTool(toolToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-tool-by-id/{toolId}", [Authorize(Roles = "dHead, bHead, Admin, HeadAdmin")] async (int toolId) =>
{
    bool deleteSuccessful = await ToolController.DeleteTool(toolId);
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
//                                          WOOD
//===========================================================================================================


app.MapGet("/get-all-woods", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async () => await WoodController.Get());

app.MapGet("/get-wood-by-id/{woodId}", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (int woodId) =>
{
    Wood woodToReturn = await WoodController.GetWoodById(woodId);

    if (woodToReturn != null)
    {
        return Results.Ok(woodToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-wood", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (Wood woodToCreate) =>
{
    bool createSuccessful = await WoodController.AddWood(woodToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-wood", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (Wood woodToUpdate) =>
{
    bool updateSuccessful = await WoodController.UpdateWood(woodToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-wood-by-id/{woodId}", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (int woodId) =>
{
    bool deleteSuccessful = await WoodController.DeleteWood(woodId);
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
//                                          COMPLAINT
//===========================================================================================================


app.MapGet("/get-all-complaints", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async () => await ComplaintController.Get());

app.MapGet("/get-complaint-by-id/{complaintId}", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (int complaintId) =>
{
    Complaint complaintToReturn = await ComplaintController.GetComplaintById(complaintId);

    if (complaintToReturn != null)
    {
        return Results.Ok(complaintToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPost("/create-complaint", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (Complaint complaintToCreate) =>
{
    bool createSuccessful = await ComplaintController.AddComplaint(complaintToCreate);
    if (createSuccessful)
    {
        return Results.Ok("Insert Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/update-complaint", [Authorize(Roles = "worker, dHead, bHead, Admin, HeadAdmin")] async (Complaint complaintToUpdate) =>
{
    bool updateSuccessful = await ComplaintController.UpdateComplaint(complaintToUpdate);
    if (updateSuccessful)
    {
        return Results.Ok("Update Successful");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapDelete("/delete-complaint-by-id/{complaintId}", [Authorize(Roles = "Admin, HeadAdmin")] async (int complaintId) =>
{
    bool deleteSuccessful = await ComplaintController.DeleteComplaint(complaintId);
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
