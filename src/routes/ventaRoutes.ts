import {Router} from 'express'
import {ventaController} from '../controllers/ventaController'
import {checkJwt} from '../middleware/jwt'
import {checkRol} from '../middleware/rols'

class VentaRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/',[checkJwt,checkRol(["Ventas"])],ventaController.lista);
        this.router.put('/',[checkJwt,checkRol(["Ventas"])],ventaController.insert);
        this.router.get('/producto/',[checkJwt,checkRol(["Ventas"])],ventaController.verProductos);
        this.router.get('/producto/:cveProducto',[checkJwt,checkRol(["Ventas"])],ventaController.verCantidad);

    }


}

const ventaRoutes = new VentaRoutes();
export default ventaRoutes.router;