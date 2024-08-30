"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const database_1 = __importDefault(require("../database/database"));
const utils_1 = require("../utils/utils");
class AuthController {
    iniciarSecion(req, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Test
                var temp = yield utils_1.utils.hashPassword("admin");
                console.log(temp);
                // obtener los datos del body
                const { username, password } = req.body;
                // Verificar si el usuario exciste
                const usuario = yield database_1.default.usuario.findFirst({
                    where: {
                        username: username
                    }
                });
                if (!usuario) {
                    return response.status(400).json({ message: "El usuario y/o contraseña es incorrecto" });
                }
                // Verificar la constraseña del usuario
                if (yield utils_1.utils.checkPassword(password, usuario.password)) {
                    // Si la contrseña es correcta, generar el payload con la informacion del usuario
                    const { password, fechaRegistro } = usuario, newUser = __rest(usuario, ["password", "fechaRegistro"]);
                    // Generar el JWT
                    const token = utils_1.utils.generateJWT(newUser);
                    // TODO: Enviar el JWT
                    response.json({ message: "Autentificación correcta", token: token });
                }
                else {
                    return response.status(400).json({ message: "El usuario y/o contraseña es incorrecto" });
                }
            }
            catch (error) {
                console.log(error);
                return response.status(500).json({ message: "Error interno" });
            }
        });
    }
}
exports.authController = new AuthController();
