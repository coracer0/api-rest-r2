import pool from "../database/database";
class AuthDAO {
  public async getUser(usuario: String) {
    
    const result = await pool.then(async (connection) => {
      return await connection.query("select cveUsuario, username, password, rol from usuario WHERE username = ?", [
        usuario,
      ]);
    });
    return result;
  }
  public async getUserById(idUsuario: number) {
    const result = await pool.then(async (connection) => {
      return await connection.query("SELECT * FROM usuario WHERE cveUsuario = ?", [
        idUsuario,
      ]);
    });
    return result;
  }
}
export const dao = new AuthDAO();
