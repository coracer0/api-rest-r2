import { Request,Response } from "express";
import jwt from 'jsonwebtoken';
import secretKey from '../config/jwtKeys';
import { dao } from "../dao/authDAO";
import {utils} from '../utils/utils';

class AuthController{

    public async login(req:Request, res:Response){
        const{username,password} = req.body;
        

        if(username == null || password == null ){
            return res.status(400).json({message: "Usuario y Contraseña incorrecta"});
        }

        const usuarios = await dao.getUser(username);

        

        if (usuarios.length <=0){
            return res.status(400).json({message:'El usuario no existe'});
        }

        for (const usuario of usuarios) {
            if(await utils.checkPassword(password, usuario.password)){
                const token = jwt.sign({cveUsuario: usuario.cveUsuario ,rol: usuario.rol, username:usuario.username},secretKey.jwtSecret,{expiresIn: '1h'});
                return res.json({message:'OK',token,cveUsuario: usuario.cveUsuario, rol: usuario.rol,username: usuario.username});
            }else{
                return res.status(400).json({message:"La contraseña es incorrecta"});
            }
        }

    }
}
export const authController =new AuthController();
