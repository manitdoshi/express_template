import { pool } from "./db.js";


export const query= (text: string, params?:any[])=>{
    return pool.query(text,params);
};