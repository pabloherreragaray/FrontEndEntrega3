﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace FrontEndE3.Models;

public partial class Producto
{
    public int Id { get; set; }

    public string Nombre { get; set; }

    public int IdCategoria { get; set; }

    public decimal Precio { get; set; }

    public string Imagen { get; set; }

    public bool Destacado { get; set; }
}