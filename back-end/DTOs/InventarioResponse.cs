namespace InventarioApi.DTOs;

public class InventarioResponse
{
    public int ProductoId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public int Cantidad { get; set; }
}
