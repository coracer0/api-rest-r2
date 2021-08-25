import {Router} from 'express'
import {userController} from '../controllers/userController'
import {checkJwt} from '../middleware/jwt'
import {checkRol} from '../middleware/rols'

class UserRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/',[checkJwt,checkRol(["Admin"])],userController.lista);
        this.router.put('/',userController.insert);
        
    }


}

const userRoutes = new UserRoutes();
export default userRoutes.router;