using InventarioApi.Data;
using InventarioApi.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventarioApi.Controllers;

[ApiController]
[Route("productos")]
[Authorize] // todos los endpoints de este controller requieren JWT válido
public class ProductosController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProductosController(AppDbContext db)
    {
        _db = db;
    }

    // POST /productos/movimiento
    [HttpPost("movimiento")]
    public async Task<IActionResult> RegistrarMovimiento([FromBody] MovimientoRequest request)
    {
        var producto = await _db.Productos.FindAsync(request.ProductoId);
        if (producto is null)
        {
            return NotFound(new { message = $"Producto {request.ProductoId} no encontrado" });
        }

        if (request.Tipo == TipoMovimiento.Salida && producto.Cantidad < request.Cantidad)
        {
            return BadRequest(new { message = "Stock insuficiente para esta salida" });
        }

        producto.Cantidad += request.Tipo == TipoMovimiento.Entrada
            ? request.Cantidad
            : -request.Cantidad;

        await _db.SaveChangesAsync();

        return Ok(new
        {
            message = "Movimiento registrado correctamente",
            productoId = producto.Id,
            cantidadActual = producto.Cantidad
        });
    }

    // GET /productos/inventario
    [HttpGet("inventario")]
    public async Task<ActionResult<List<InventarioResponse>>> ConsultarInventario()
    {
        var inventario = await _db.Productos
            .Select(p => new InventarioResponse
            {
                ProductoId = p.Id,
                Nombre = p.Nombre,
                Cantidad = p.Cantidad
            })
            .ToListAsync();

        return Ok(inventario);
    }
}
