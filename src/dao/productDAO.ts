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

  public async verifyProduct(nombre: string) {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "SELECT * FROM producto where nombre = ? ",
        nombre
      );
    });
    return result;
  }

  public async update(producto: any) {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "UPDATE producto SET ? WHERE cveProducto = ?",
        [producto, producto.cveProducto]
      );
    });
    return result;
  }

  public async delete(cveProducto: number) {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "DELETE FROM producto WHERE cveProducto = ?",
        cveProducto
      );
    });
    return result;
  }
}

export const dao = new ProductDAO();
