"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controllers_1 = require("../controllers/index.controllers");
const validator_check_1 = require("../middlewares/validator.check");
const jwt_check_1 = require("../middlewares/jwt.check");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
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
        this.router.get('/', [validator_check_1.validate, jwt_check_1.jwtCheck], index_controllers_1.indexController.index);
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
        this.router.post('/', index_controllers_1.indexController.insert);
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
        this.router.put('/', index_controllers_1.indexController.update);
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
        this.router.delete('/', index_controllers_1.indexController.delete);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
