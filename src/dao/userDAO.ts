import pool from "../database/database";

class UserDAO {
  public async lista() {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "SELECT cveUsuario,username,rol FROM usuario"
      );
    });

    return result;
  }

  public async verifyUser(usuario: string) {
    const result = await pool.then(async (connection) => {
      return await connection.query(
        "SELECT * FROM usuario WHERE username = ?",
        [usuario]
      );
    });
    return result;
  }

  public async insert(usuario: any) {
    const result = await pool.then(async (connection) => {
      return await connection.query("INSERT INTO usuario set ?", [usuario]);
    });
    return result;
  }
}
export const dao = new UserDAO();
