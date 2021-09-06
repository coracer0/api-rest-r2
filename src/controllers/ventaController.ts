import { Request, Response } from "express";
import { dao } from "../dao/ventasDAO";

class VentaController {
  /**
   *  Nombre: lista
   *  Descripcion: lista de users de la base de datos
   *  Resultado: json con informacion de  users registrados.
   */
  public async lista(req: Request, res: Response) {
    const result = await dao.lista();
    res.json(result);
  }
  /**
   *  Nombre: insert
   *  Descripcion: insertar datos de un nuevo usuario
   *  Resultado: json con mensaje.
   */
  public async insert(req: Request, res: Response) {
    try {
        
      const { cveUsuario } = res.locals.jwtPayLoad;
      
      const ventaObject = {
        fechaRegistro: new Date(),
        cveUsuario: cveUsuario
      };

      const result = await dao.insertVenta(ventaObject);

          
      if (result.affectedRows > 0) {
        return res.json({ message: "Datos guardados exitosamente" });
      } else {
        return res.status(409).json({ message: result.message });
      }
    } catch (ex) {
      res.status(500).json({ message: ex.message });
    }
  }
}

export const ventaController = new VentaController();
