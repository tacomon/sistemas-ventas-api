"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRules = exports.insertRules = void 0;
const express_validator_1 = require("express-validator");
const insertRules = () => {
    return [
        (0, express_validator_1.body)("nombre").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 350 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("apellidos").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 450 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("username").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 150 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("password").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 100 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("cveRol").isInt({ min: 1 }).withMessage("campo requerido"),
    ];
};
exports.insertRules = insertRules;
const updateRules = () => {
    return [
        (0, express_validator_1.body)("cveUsuario").isInt({ min: 1 }).withMessage("campo requerido"),
        (0, express_validator_1.body)("nombre").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 350 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("apellidos").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 450 }).withMessage("Rango Incorrecto"),
        (0, express_validator_1.body)("cveRol").isInt({ min: 1 }).withMessage("campo requerido"),
    ];
};
exports.updateRules = updateRules;
