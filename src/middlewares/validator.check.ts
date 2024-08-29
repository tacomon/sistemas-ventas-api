import { NextFunction, Request, Response} from 'express';
import { validationResult} from 'express-validator';

export const validate = (
    req: Request, res: Response, next: NextFunction) => {
        console.log("Init Middlewere :: validator.check")
        // Se obtienen los error a partir del request original de la pantalla
        const errors = validationResult(req);

        // Si no existen errores la pericion continua.
        if (errors.isEmpty()) return next();

        // Se devuelven los errores con un estado de peticion 400
        return res.status(400).json(errors.array());
    }