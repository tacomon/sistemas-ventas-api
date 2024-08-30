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
exports.indexController = void 0;
const database_1 = __importDefault(require("../database/database"));
class IndexController {
    //* Método para registrar un nuevo usuario
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtener los datos del cuerpo de la solicitud
                const { nombre, apellidos, username, password, cveRol } = req.body;
                // Verificar si el nombre de usuario ya existe
                const existingUser = yield database_1.default.usuario.findFirst({
                    where: { username: username }
                });
                if (existingUser) {
                    return res.status(400).json({ message: "El nombre de usuario ya está en uso." });
                }
                // Crear el nuevo usuario
                const newUser = yield database_1.default.usuario.create({
                    data: {
                        nombre: nombre,
                        apellidos: apellidos,
                        username: username,
                        password: password,
                        fechaRegistro: new Date(),
                        cveRol: cveRol
                    }
                });
                // Enviar una respuesta exitosa
                return res.status(201).json({ message: "Usuario registrado exitosamente.", usuario: newUser });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: `Error interno: ${error.message}` });
            }
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield database_1.default.usuario.findMany();
                return res.json(usuarios);
            }
            catch (error) {
                return res.status(500).json({ message: `Error: ${error.message}` });
            }
        });
    }
    insert(req, res) {
        try {
            return res.json({ message: "INSERT Works!" });
        }
        catch (error) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
    update(req, res) {
        try {
            return res.json({ message: "UPDATE Works!" });
        }
        catch (error) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
    delete(req, res) {
        try {
            return res.json({ message: "DELETE Works!" });
        }
        catch (error) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
}
exports.indexController = new IndexController();
