import { Request, Response } from "express";
import { dao } from "../dao/productDAO";

class ProductController {
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
      const { nombre, descripcion, precioUnitario, cantidad } = req.body;

      // verificar parametros
      if (
        descripcion == null ||
        precioUnitario == null ||
        nombre == null ||
        cantidad == null
      ) {
        return res.status(409).json({ message: "Los campos son requeridos" });
      }
      // Verificar longitud de caracteres

      if (nombre.length > 150) {
        return res.status(500).json({
          message:
            "La longitud maxima del nombre del producto es de 150 caracteres",
        });
      }
      // Verificar nombre de usuario
      const verify = await dao.verifyProduct(nombre);
      if (verify.length > 0) {
        return res.status(500).json({ message: "El producto ya existe" });
      }
      // Verificar Rol
      if (cantidad <= 0) {
        return res
          .status(500)
          .json({ message: "Asegurate que el producto tenga almenos un slot" });
      }
      if (precioUnitario <= 0 || precioUnitario >= 10000) {
        return res.status(500).json({
          message:
            "Rango de precios no valido. Rango valido  de $0.01 a $9999.99",
        });
      }
      const { cveUsuario } = res.locals.jwtPayLoad;
      // Llenar objetos
      const productObject = {
        nombre,
        descripcion,
        precioUnitario,
        cantidad,
        fechaRegistro: new Date(),
        cveUsuario: cveUsuario,
      };

      const result = await dao.insert(productObject);

      if (result.affectedRows > 0) {
        return res.json({ message: "Datos guardados exitosamente" });
      } else {
        return res.status(409).json({ message: result.message });
      }
    } catch (ex) {
      res.status(500).json({ message: ex.message });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const product = req.body;
      if (product.cveProducto == null) {
        return res.status(500).json({ message: "No se puede actualizar" });
      }
      const result = await dao.update(product);

      if (result.affectedRows > 0) {
        res.json({ message: "Actualizado Correctamente" });
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { cveProducto } = req.params;

      if (cveProducto === null) {
        return res.status(500).json({ message: "No se puede Eliminar" });
      }
      const result = await dao.delete(parseInt(cveProducto));

      if (result.affectedRows > 0) {
        res.json({ message: "Eliminado Correctamente" });
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const productController = new ProductController();
