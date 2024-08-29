import { Router } from "express";
import { usuarioController } from "../controllers/usuarios.controller";
import { insertRules, updateRules } from "../rules/usuario.rules";
import { validate } from "../middlewares/validator.check";
import { jwtCheck } from "../middlewares/jwt.check";

class UsuarioRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    private config() {
        // listado
        this.router.get('/', [jwtCheck], usuarioController.listar);
        // insercion
        this.router.post('/', insertRules(), [validate], usuarioController.insertar);
        // actualizar
        this.router.put('/', updateRules(), [validate], usuarioController.actualizar);
        //eliminar
        this.router.delete('/:cveUsuario', usuarioController.eliminar);
    }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;