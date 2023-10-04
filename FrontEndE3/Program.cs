var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();

//app.MapGet("/", () => "Hello World!");

app.MapDefaultControllerRoute();
app.MapRazorPages();

app.Run();
