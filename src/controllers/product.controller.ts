import {T} from "../libs/types/common";
import Errors from "../libs/Errors";
import { Request,Response} from "express";
import ProductService from "../models/Product.service";
import { AdminRequest } from "../libs/types/member";
const productService = new ProductService();


const productController:T={};

// ------------------------------------------------------- < getAllProduct get started  > --------------------------------------------


        productController.getAllProducts = async (req:Request,res:Response)=>{

            try{

            console.log("Coming  product Page!");
        

           res.render("products")
            }catch(err){
            
            console.log("Error, getAllProduct :",err);
            if(err instanceof Errors) res.status(err.code).json(err)
                else res.status(Errors.standard.code).json(Errors.standard);

            }

        }
// ------------------------------------------------------- < getAllProduct get Finished  > --------------------------------------------

// ------------------------------------------------------- < createNewProduct post started  > --------------------------------------------


        productController.createNewProduct = async (req:Request,res:Response)=>{

            try{
            console.log("Coming  createNewProduct Page!");
             res.send("Done! ")

            }catch(err){
            
            console.log("Error, createNewProduct :",err);
            if(err instanceof Errors) res.status(err.code).json(err)
                else res.status(Errors.standard.code).json(Errors.standard);

            }

        }
// ------------------------------------------------------- < createNewProduct post Finished  > --------------------------------------------

// ------------------------------------------------------- < updateChoseProduct post started  > --------------------------------------------


        productController.updateChoseProduct = async (req:Request,res:Response)=>{

            try{
            console.log("Coming  updateChoseProduct Page!");


            }catch(err){
            
            console.log("Error, updateChoseProduct :",err);
            if(err instanceof Errors) res.status(err.code).json(err)
                else res.status(Errors.standard.code).json(Errors.standard);

            }

        }
// ------------------------------------------------------- < updateChoseProduct post Finished  > --------------------------------------------


export default productController;