"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const usuario_rules_1 = require("../rules/usuario.rules");
const validator_check_1 = require("../middlewares/validator.check");
const jwt_check_1 = require("../middlewares/jwt.check");
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // listado
        this.router.get('/', [jwt_check_1.jwtCheck], usuarios_controller_1.usuarioController.listar);
        // insercion
        this.router.post('/', (0, usuario_rules_1.insertRules)(), [validator_check_1.validate], usuarios_controller_1.usuarioController.insertar);
        // actualizar
        this.router.put('/', (0, usuario_rules_1.updateRules)(), [validator_check_1.validate], usuarios_controller_1.usuarioController.actualizar);
        //eliminar
        this.router.delete('/:cveUsuario', usuarios_controller_1.usuarioController.eliminar);
    }
}
const usuarioRoutes = new UsuarioRoutes();
exports.default = usuarioRoutes.router;
