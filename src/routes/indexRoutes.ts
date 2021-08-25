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
    }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;