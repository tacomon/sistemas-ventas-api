import { Request, Response } from 'express';
import prisma from "../database/database";
import { utils } from '../utils/utils';

class UsuarioController {

    /**
     * @description Lista los usuarios disponibles
     * @param req 
     * @param res 
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    public async listar(req: Request, res: Response) {
        try {
            const token = <string>req.headers["auth"];
            const currentUser = utils.getPayload(token);

            const result = await prisma.usuario.findMany({
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
        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

    /**
     *  @description Inserción de usuarios a la bd
     * @param req 
     * @param res 
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    public async insertar(req: Request, res: Response) {
        try {
            // Obtén los datos del body
            const usuario = req.body;
    
            // Encriptar la contraseña
            const encryptedText = await utils.hashPassword(usuario.password);
            usuario.password = encryptedText;
    
            // Verificar si el rol existe
            const rol = await prisma.rol.findUnique({
                where: {
                    cveRol: usuario.cveRol
                }
            });
    
            if (!rol) {
                return res.status(404).json({ message: "El rol no existe" });
            }
    
            // Verificar si el usuario ya existe
            const verifyUsername = await prisma.usuario.findUnique({
                where: {
                    username: usuario.username // Asegúrate de que 'username' está definido como único en el modelo
                }
            });
    
            if (verifyUsername) {
                return res.status(404).json({ message: "El usuario ya existe" });
            }
    
            // Inserción de los datos
            const result = await prisma.usuario.create({
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
    
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ message: `${error.message}` });
        }
    }
    
    
    
    public async actualizar(req: Request, res: Response) {
        try {
            // se obtienen los datos del body
            var usuario = req.body;

            const updateUser = {
                nombre: usuario.nombre.trim(),
                apellidos: usuario.apellidos.trim(),
                cveRol: usuario.cveRol
            }

            // Verificar si existe usuario
            const verifyUser = await prisma.usuario.findMany({
                where: {
                    cveUsuario: usuario.cveUsuario
                }
            });

            if (verifyUser.length <= 0) {
                return res.status(404).json({ message : "El usuario no existe"});
            }

            // Verificar rol
            const rol = await prisma.rol.findMany({
                where : {
                    cveRol: updateUser.cveRol
                }
            });

            if (rol.length <= 0) {
                return res.status(404).json({ message : "El rol no existe"});
            }

            // actualización de los datos
            const result = await prisma.usuario.update({
                where: {
                    cveUsuario: usuario.cveUsuario
                },
                data: updateUser
            });

            return res.json(result);

        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

    public async eliminar(req: Request, res: Response) {
        try {
            // se obtienen los datos del body
            var { cveUsuario } = req.params;

            

            // Verificar si existe usuario
            const verifyUser = await prisma.usuario.findMany({
                where: {
                    cveUsuario: parseInt(cveUsuario)
                }
            });

            if (verifyUser.length <= 0) {
                return res.status(404).json({ message : "El usuario no existe"});
            }

            const result = await prisma.usuario.delete({
                where: {
                    cveUsuario : parseInt(cveUsuario)
                }
            });

            return res.json(result);

        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

}

export const usuarioController = new UsuarioController();