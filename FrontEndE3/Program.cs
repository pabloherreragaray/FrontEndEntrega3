using FrontEndE3.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<BaseDeDatosContext>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("db")));

var app = builder.Build();

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();

app.MapGet("/Api/Producto", async (BaseDeDatosContext con, [FromQuery] int? idCategoria, [FromQuery] string? buscar, [FromQuery] decimal? desdePrecio, [FromQuery] decimal? hastaPrecio, [FromQuery] bool? soloDestacados) =>
{
    var productos = await con.Producto.Where(p =>
        (idCategoria == null || idCategoria == 0 || p.IdCategoria == idCategoria)
        && (buscar == null || buscar == "" || p.Nombre.Contains(buscar))
        && (desdePrecio == null || desdePrecio == 0 || p.Precio >= desdePrecio)
        && (hastaPrecio == null || hastaPrecio == 0 || p.Precio <= hastaPrecio)
        && (soloDestacados == null || soloDestacados == false || p.Destacado)
    ).ToListAsync();
    return productos;
});

app.MapGet("/Api/Categoria", async (BaseDeDatosContext con) =>
{
    var categorias = await con.Categoria.ToListAsync();
    return categorias;
});

app.MapDefaultControllerRoute();
app.MapRazorPages();

app.Run();
