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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const database_1 = __importDefault(require("../database/database"));
const utils_1 = require("../utils/utils");
class UsuarioController {
    /**
     * @description Lista los usuarios disponibles
     * @param req
     * @param res
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers["auth"];
                const currentUser = utils_1.utils.getPayload(token);
                const result = yield database_1.default.usuario.findMany({
                    select: {
                        cveUsuario: true,
                        nombre: true,
                        apellidos: true,
                        username: true,
                        fechaRegistro: true,
                        cveRol: true,
                        rol: true
                    },
                    where: {
                        cveUsuario: {
                            not: currentUser.cveUsuario
                        }
                    }
                });
                res.json(result);
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    /**
     *  @description Inserción de usuarios a la bd
     * @param req
     * @param res
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    insertar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtén los datos del body
                const usuario = req.body;
                // Encriptar la contraseña
                const encryptedText = yield utils_1.utils.hashPassword(usuario.password);
                usuario.password = encryptedText;
                // Verificar si el rol existe
                const rol = yield database_1.default.rol.findUnique({
                    where: {
                        cveRol: usuario.cveRol
                    }
                });
                if (!rol) {
                    return res.status(404).json({ message: "El rol no existe" });
                }
                // Verificar si el usuario ya existe
                const verifyUsername = yield database_1.default.usuario.findUnique({
                    where: {
                        username: usuario.username // Asegúrate de que 'username' está definido como único en el modelo
                    }
                });
                if (verifyUsername) {
                    return res.status(404).json({ message: "El usuario ya existe" });
                }
                // Inserción de los datos
                const result = yield database_1.default.usuario.create({
                    data: {
                        nombre: usuario.nombre.trim(),
                        apellidos: usuario.apellidos.trim(),
                        username: usuario.username.trim(),
                        password: usuario.password.trim(),
                        fechaRegistro: new Date(),
                        rol: {
                            connect: {
                                cveRol: usuario.cveRol
                            }
                        }
                    }
                });
                return res.json(result);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // se obtienen los datos del body
                var usuario = req.body;
                const updateUser = {
                    nombre: usuario.nombre.trim(),
                    apellidos: usuario.apellidos.trim(),
                    cveRol: usuario.cveRol
                };
                // Verificar si existe usuario
                const verifyUser = yield database_1.default.usuario.findMany({
                    where: {
                        cveUsuario: usuario.cveUsuario
                    }
                });
                if (verifyUser.length <= 0) {
                    return res.status(404).json({ message: "El usuario no existe" });
                }
                // Verificar rol
                const rol = yield database_1.default.rol.findMany({
                    where: {
                        cveRol: updateUser.cveRol
                    }
                });
                if (rol.length <= 0) {
                    return res.status(404).json({ message: "El rol no existe" });
                }
                // actualización de los datos
                const result = yield database_1.default.usuario.update({
                    where: {
                        cveUsuario: usuario.cveUsuario
                    },
                    data: updateUser
                });
                return res.json(result);
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // se obtienen los datos del body
                var { cveUsuario } = req.params;
                // Verificar si existe usuario
                const verifyUser = yield database_1.default.usuario.findMany({
                    where: {
                        cveUsuario: parseInt(cveUsuario)
                    }
                });
                if (verifyUser.length <= 0) {
                    return res.status(404).json({ message: "El usuario no existe" });
                }
                const result = yield database_1.default.usuario.delete({
                    where: {
                        cveUsuario: parseInt(cveUsuario)
                    }
                });
                return res.json(result);
            }
            catch (error) {
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
