import {Router} from 'express'
import {productController} from '../controllers/productController'
import {checkJwt} from '../middleware/jwt'
import {checkRol} from '../middleware/rols'

class ProductRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/',[checkJwt,checkRol(["Admin"])],productController.lista);
        this.router.put('/',[checkJwt,checkRol(["Admin"])],productController.insert);
        this.router.post('/',[checkJwt,checkRol(["Admin"])],productController.update);
        this.router.delete('/:cveProducto',[checkJwt,checkRol(["Admin"])],productController.delete);
    }


}

const productRoutes = new ProductRoutes();
export default productRoutes.router;