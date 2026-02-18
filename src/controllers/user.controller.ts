import type { Request,Response } from "express";
import { UserService } from "../services/user.service.js";
import { error } from "node:console";

const userService= new UserService();


export class  UserController{
    async getUsers(req:Request,res:Response){
        try{
            const users = await userService.getAllUsers();
            res.json(users);
            console.log("Users Retrieved");
        }

        catch(error){
            res.status(500).json({message:'Internal Server Error'});
            console.log("User retrieval Error");
        }

    }

    async createUser(req:Request,res:Response){
        try{
            const {email,password,roleId}= req.body;
            const user= await userService.createUser(email,password,roleId);
            res.status(201).json(user);
            console.log("User added");
        }
        catch(error){
            res.status(500).json({message:"Internal Server Error"});
            console.log("User creation error")
        }
    }

    async getUserPermission(req:Request, res:Response){
        try{
                const userId = Number(req.params.id);
                
                const permissions = await userService.getUserPermission(userId);
                res.json(permissions);
                console.log("User permissions fetched");

        }

        catch (error) {
            console.error(error);
            res.status(500).json({message:"Internal Server Error at getUserPermission"})
            console.log("GET USER PERMISSIONS ERROR");

        }
    }


    async updateUserRole(req:Request,res:Response){
        try{
            const userId= Number(req.params.id);
            const {roleId}= req.body;

            if(!roleId){
                return res.status(401).json({message: "role id required"})
            }
            const updatedUser= await userService.updateUserRole(roleId,userId);

            res.json(updatedUser);
        }

        catch (error){
            console.error(error);
            res.status(500).json({
                message: "Internal Server error at update User Role"
            })

        }

        

    }

    async deleteUser(req:Request,res:Response){
        try{
            const userId= Number(req.params.id);
            
            await userService.deleteUser(userId);

            res.json({message:"User Deleted"});
        }
        catch (error){
            console.error(error);
            res.status(500).json({message:"Server error in user deletion"});
        }
    }




}
