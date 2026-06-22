using System.ComponentModel.DataAnnotations;

namespace InventarioApi.DTOs;

public enum TipoMovimiento
{
    Entrada,
    Salida
}

public class MovimientoRequest
{
    [Required]
    public int ProductoId { get; set; }

    [Required]
    public TipoMovimiento Tipo { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "La cantidad debe ser mayor a 0")]
    public int Cantidad { get; set; }
}
