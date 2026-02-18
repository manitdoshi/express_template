import type {Request,Response} from "express";

import { AuthService } from "../services/auth.service.js";


const authService= new AuthService;
export class AuthController{
    async login(req:Request, res:Response){
        try{
            const{email,password}=req.body;


            if(!email||!password){
                return res.status(400).json({message:"Missing Fields"});
            }

            const token = await authService.login(email,password);
            res.json({token});




        }
        catch(err){
            res.status(401).json({message:"Invalid Credentials"})
        }
    }




    
}
