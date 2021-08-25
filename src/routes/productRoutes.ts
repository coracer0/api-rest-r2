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
    }


}

const productRoutes = new ProductRoutes();
export default productRoutes.router;