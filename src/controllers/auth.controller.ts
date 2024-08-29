import { Request, Response } from "express";
import prisma from "../database/database";
import { utils } from "../utils/utils";


class AuthController {
    public async iniciarSecion(req: Request, response: Response){
        try{

            //Test

            var temp = await  utils.hashPassword("admin");
            console.log(temp);

            // obtener los datos del body
            const {username, password} = req.body;

            // Verificar si el usuario exciste
            const usuario = await prisma.usuario.findFirst({
                where: {
                    username: username
                }
            });

            if (!usuario){
                return response.status(400).json(
                    {message: "El usuario y/o contraseña es incorrecto"}
                );
            }

            // Verificar la constraseña del usuario
            if (await utils.checkPassword(password, usuario.password)){
            // Si la contrseña es correcta, generar el payload con la informacion del usuario
            const {password, fechaRegistro, ...newUser} = usuario;

            // Generar el JWT
            const token = utils.generateJWT(newUser);

            // TODO: Enviar el JWT
            response.json({ message: "Autentificación correcta", token: token})

            }else{
                return response.status(400).json(
                    {message: "El usuario y/o contraseña es incorrecto"}
                );
            }

        } catch (error: any){
            console.log(error);
            return response.status(500).json({message: "Error interno"});

        }
    }
}

export const authController = new AuthController();