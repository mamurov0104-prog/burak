import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import {Request, Response} from 'express';
import ProductService from "../models/Product.service";
import { AdminRequest, ExtendedRequest } from "../libs/types/members";
import { ProductInput, ProductInquiry } from "../libs/types/product";
import { ProductCollection } from "../libs/enums/product.enums";

const productService = new ProductService();

const productController: T =  {};
 /**
     * SPA
     */

    productController.getProducts = async (req: Request, res: Response) => {
        try {
            console.log("getProducts");
            const { page, limit, order, productCollection, search} = req.query;
            const inquiry: ProductInquiry= {
                order: String(order),
                page: Number(page),
                limit: Number(limit),
                productCollection: ProductCollection.DISH,
                search: ""
            };
            if(productCollection) {
                inquiry.productCollection = productCollection as ProductCollection;
            }
            if(search) inquiry.search = String(search);
            const result = await productService.getProducts(inquiry);

            res.status(HttpCode.OK).json(result);
        } catch (error) {
                    console.log('Error, getProducts:', error);
        if(error instanceof Errors) res.status(error.code).json(error);
        else res.status(Errors.standard.code).json(Errors.standard);
        }
    }

    productController.getProduct = async (req: ExtendedRequest, res: Response) => {
        try {
            console.log('getProduct');
            const {id} =  req.params;
            const memberId = req.member?._id ?? null,
                  result = await productService.getProduct(memberId, id);
            res.status(HttpCode.OK).json(result)      
        } catch (error) {
                     console.log('Error, getProduct:', error);
        if(error instanceof Errors) res.status(error.code).json(error);
        else res.status(Errors.standard.code).json(Errors.standard);           
        }
    }

   /**
     * SSR
     */
productController.getAllProducts = async (req: AdminRequest, res: Response) => {
    try {
        console.log("getAllProducts");
        const data = await productService.getAllProducts();
       res.render('products', {products: data});
          
    } catch (error) {
        console.log('Error, getAllProducts:', error);
        if(error instanceof Errors) res.status(error.code).json(error);
        else res.status(Errors.standard.code).json(Errors.standard);
        
    }

};

productController.createNewProduct = async (req: AdminRequest, res: Response) => {
    try {
        console.log("createNewProduct");
        if(!req.files?.length) throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATED_FAILED);
       
        const data: ProductInput  = req.body; 
        data.productImages = req.files.map(ele => {
         return ele.path.replace(/\\/g, "/");
        })
        await productService.createNewProduct(data);
        res.send(`  <script>alert('Successfully created'); window.location.replace('/admin/product/all')</script>`)
          
    } catch (error) {
        console.log('Error, createNewProduct:', error);
        const message = error instanceof Errors ?  error.message : Message.SOMETHING_WENT_WRONG;
        res.send(`  <script>alert('${message}'); window.location.replace('/admin/product/all')</script>`)
       
    }

};

productController.updateChosenProduct = async (req: Request, res: Response) => {
    try {
        console.log("updateChosenProduct");
        const id = req.params.id;

        const result = await productService.updateChosenProduct(id, req.body);

        res.status(HttpCode.OK).json({data: result});
          
    } catch (error) {
        console.log('Error, updateChosenProduct:', error);
        if(error instanceof Errors) res.status(error.code).json(error);
        else res.status(Errors.standard.code).json(Errors.standard);
        
    }

};
export default productController