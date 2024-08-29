import { body } from 'express-validator';

export const insertRules = () => {
    return [
        body("nombre").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 350 }).withMessage("Rango Incorrecto"),
        body("apellidos").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 450 }).withMessage("Rango Incorrecto"),
        body("username").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 150 }).withMessage("Rango Incorrecto"),
        body("password").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 100 }).withMessage("Rango Incorrecto"),
        body("cveRol").isInt({ min: 1}).withMessage("campo requerido"),
    ]
};

export const updateRules = () => {
    return [
        body("cveUsuario").isInt({ min: 1}).withMessage("campo requerido"),
        body("nombre").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 350 }).withMessage("Rango Incorrecto"),
        body("apellidos").trim()
            .not().isEmpty().withMessage("campo requerido")
            .isLength({ min: 3, max: 450 }).withMessage("Rango Incorrecto"),
        body("cveRol").isInt({ min: 1}).withMessage("campo requerido"),
    ]
};