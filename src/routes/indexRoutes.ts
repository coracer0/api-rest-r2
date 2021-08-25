import { Router} from 'express';
import { indexController } from '../controllers/indexController'
import { checkJwt } from '../middleware/jwt'


class IndexRoutes {
    public router: Router =  Router();

    constructor() {
        this.config();
    }

    config(): void{
        this.router.get('/',indexController.list);
        this.router.post('/',[checkJwt],indexController.update);
        this.router.put('/',[checkJwt],indexController.insert);
        this.router.delete('/',[checkJwt],indexController.delete);
    }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;