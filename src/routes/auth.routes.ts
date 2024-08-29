import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validator.check";
import { authRules } from "../rules/auth.rules";

class AuthRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }
    /**
     * @swagger
     * definitions:
     *  User:
     *      type: object
     *      properties:
     *          username:
     *              type: string
     *          password:
     *              type: string
     */
    config(){
        /**
         * @swagger
         * /api/auth:
         *  post:
         *      tags: ["Credenciales"]
         *      summary: Log In 
         *      description: Inicio de sesion del usuario
         *      produces:
         *          - application/json
         *      parameters:
         *          - in: body
         *            name: Credentials
         *            descriptions: Usuario y contraseña del usuario
         *            schema:
         *              $ref: '#/definitions/User'
         *              required: true
         *      responses:
         *          200:
         *              description: Exito
         *  
         */
        this.router.post("/", authRules(), [validate], authController.iniciarSecion)
    }

}

const authRoutes = new AuthRoutes();
export default authRoutes.router;