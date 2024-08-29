import { Router } from "express";
import { indexController } from "../controllers/index.controllers";
import { validate } from "../middlewares/validator.check";
import { authRules } from "../rules/auth.rules";
import { jwtCheck } from "../middlewares/jwt.check";

class IndexRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        /**
         * @swagger
         * /api:
         *  get:
         *      tags: ["Index"]
         *      summary: Default Index
         *      description: Ruta por defecto de la API
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         */
        this.router.get('/', [validate, jwtCheck], indexController.index);
        /**
         * @swagger
         * /api:
         *  post:
         *      tags: ["Index"]
         *      summary: Default Index (Post)
         *      description: Ruta por defecto de la API (Post)
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         * 
         */
        this.router.post('/', indexController.insert);
        /**
         * @swagger
         * /api:
         *  put:
         *      tags: ["Index"]
         *      summary: Default Index (Put)
         *      description: Ruta por defecto de la API (Put)
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         * 
         */
        this.router.put('/', indexController.update);
        /**
         * @swagger
         * /api:
         *  delete:
         *      tags: ["Index"]
         *      summary: Default Index (Delete)
         *      description: Ruta por defecto de la API (Delete)
         *      produces:
         *          - application/json
         *      responses:
         *          200:
         *              description: Exitoso
         * 
         */
        this.router.delete('/', indexController.delete);
    }
    
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;