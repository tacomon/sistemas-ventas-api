"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_check_1 = require("../middlewares/jwt.check");
const general_controllers_1 = require("../controllers/general.controllers");
class GeneralRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/roles', [jwt_check_1.jwtCheck], general_controllers_1.generalController.listarRoles);
    }
}
const generalRoutes = new GeneralRoutes();
exports.default = generalRoutes.router;
