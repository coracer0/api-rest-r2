import pool from "../database/database";

class ProductDAO {
  public async lista() {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "SELECT cveProducto,nombre, descripcion, precioUnitario,cantidad  FROM producto"
      );
    });
    return result;
  }

  public async insert(producto: any) {
    const result = await pool.then(async (connection) => {
      return await connection.query("INSERT INTO producto set ?", [producto]);
    });
    return result;
  }

  public async verifyProduct(nombre: string){
      const result = await pool.then(async (connection) =>{
          return await connection.query("SELECT * FROM producto where nombre = ? ",nombre)
      });
      return result;
  }
}

export const dao = new ProductDAO();