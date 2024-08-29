import { Request, Response } from 'express';
import prisma from '../database/database';

class IndexController {
    //* Método para registrar un nuevo usuario
    public async register(req: Request, res: Response) {
        try {
            // Obtener los datos del cuerpo de la solicitud
            const { nombre, apellidos, username, password, cveRol } = req.body;

            // Verificar si el nombre de usuario ya existe
            const existingUser = await prisma.usuario.findFirst({
                where: { username: username }
            });

            if (existingUser) {
                return res.status(400).json({ message: "El nombre de usuario ya está en uso." });
            }

            // Crear el nuevo usuario
            const newUser = await prisma.usuario.create({
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

        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ message: `Error interno: ${error.message}` });
        }
    }

    public async index(req: Request, res: Response) {
        try {
            const usuarios = await prisma.usuario.findMany();
            return res.json(usuarios);
        } catch (error: any) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }

    public insert(req: Request, res: Response) {
        try {
            return res.json({ message: "INSERT Works!" });
        } catch (error: any) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }

    public update(req: Request, res: Response) {
        try {
            return res.json({ message: "UPDATE Works!" });
        } catch (error: any) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }

    public delete(req: Request, res: Response) {
        try {
            return res.json({ message: "DELETE Works!" });
        } catch (error: any) {
            return res.status(500).json({ message: `Error: ${error.message}` });
        }
    }
}

export const indexController = new IndexController();
