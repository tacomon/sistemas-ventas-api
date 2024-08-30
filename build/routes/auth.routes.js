"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validator_check_1 = require("../middlewares/validator.check");
const auth_rules_1 = require("../rules/auth.rules");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
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
    config() {
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
        this.router.post("/", (0, auth_rules_1.authRules)(), [validator_check_1.validate], auth_controller_1.authController.iniciarSecion);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
