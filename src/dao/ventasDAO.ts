import pool from "../database/database";

class VentasDAO {
  public async lista() {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "SELECT * FROM Venta"
      );
    });
    return result;
  }

  public async insertVenta(venta: any) {
    const result = await pool.then(async (connection) => {
      return await connection.query("INSERT INTO venta set ?", [venta]);
    });
    return result;
  }

  public async selectedVenta(){
    const result = await pool.then(async (connection)=>{
      return await connection.query("Select MAX(cveVenta) cveVenta from Venta");
    });

    return result
  }

  public async verProductos(){
    const result = await pool.then(async (connection) => {
      return await connection.query("Select cveProducto,nombre from producto where cantidad > 0");
    });
    return result;
  }

  public async verCantidad(cveProducto: number){
    const result = await pool.then(async (connection) => {
      return await connection.query("Select cantidad from producto where cveProducto = ?",[cveProducto]);
    });
    return result;
  }

  public async agregarProductos(Productos:any){
    const result = await pool.then(async (connection) => {
      return await connection.query("INSERT INTO venta set ?",[Productos]);
    });
    return result;
  }

}

export const dao = new VentasDAO();