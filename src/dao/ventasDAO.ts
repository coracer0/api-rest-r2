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

}

export const dao = new VentasDAO();