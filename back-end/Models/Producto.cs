using System.ComponentModel.DataAnnotations.Schema;

namespace InventarioApi.Models;

[Table("productos")]
public class Producto
{
    [Column("id")]
    public int Id { get; set; }

    [Column("nombre")]
    public string Nombre { get; set; } = string.Empty;

    [Column("cantidad")]
    public int Cantidad { get; set; }
}
