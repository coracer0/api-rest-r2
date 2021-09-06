import pool from "../database/database";

class ProductDAO {
  public async lista() {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "select p.cveProducto,p.nombre,p.descripcion, p.cantidad,p.precioUnitario, p.fechaRegistro ,concat(u.nombre,' ',u.apellidos) as nombrePersona from producto p INNER JOIN usuario u on p.cveUsuario = u.cveUsuario"
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
