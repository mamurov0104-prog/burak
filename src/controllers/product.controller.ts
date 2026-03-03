import {T} from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Request,Response} from "express";
import ProductService from "../models/Product.service";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import { ProductInput, ProductInquiry } from "../libs/types/product";
import { ProductCollection } from "../libs/enums/product.enum";
const productService = new ProductService();


const productController:T={};
/* >-----< SPA >-----< */

// -------------------------------- > getProducts get started < -----------------------------------
       productController.getProducts = async (req:Request,res:Response) =>{
             try{

            console.log("Coming  getProducts Page!");
            const{page, limit, order, productCollection, search} = req.query;
            const inquiry:ProductInquiry ={
                order: String(order),
                page: Number(page),
                limit: Number(limit),
            };
            if(productCollection) inquiry.productCollection = productCollection as ProductCollection;
            if(search) inquiry.search = String(search)
            const result = await productService.getProducts(inquiry);
            res.status(HttpCode.OK).json({result:result})
            }catch(err){
            
            console.log("Error, getProducts :",err);
            if(err instanceof Errors) res.status(err.code).json(err)
                else res.status(Errors.standard.code).json(Errors.standard);

            }
}
// -------------------------------- > getProducts get end < -----------------------------------


// -------------------------------- > getProduct get started < -----------------------------------
       productController.getProduct = async (req:ExtendedRequest,res:Response) =>{
             try{

            console.log("Coming  getProduct Page!");
            const { id } = req.params;
            const memberId = req.member?._id ?? null;
            const result = await productService.getProduct(memberId,id);
            res.status(HttpCode.OK).json({result:result})

            }
            catch(err){
            
            console.log("Error, getProducts :",err);
            if(err instanceof Errors) res.status(err.code).json(err)
                else res.status(Errors.standard.code).json(Errors.standard);

            }
}
// -------------------------------- > getProduct get end < -----------------------------------


/* >-----< BSSR  started>-----< */

// ------------------------------------------------------- < getAllProduct get started  > --------------------------------------------


        productController.getAllProducts = async (req:Request,res:Response)=>{

              /*productControllerimi asinxron metodda shakllantirilgan , buning 2ta parametri bor ular 
    req:Request va res:response (typeni ozimiz belgilab olganmiz bularni )

    try catch error handling standardidan foydalandik maqsad errorni qolga 
    olish agar error bolsa
    */
            try{

            console.log("Coming  product Page!");
            const data = await productService.getAllProducts();
            console.log("DATA: ", data );

           res.render("products" , {products : data})
            }catch(err){
            
            console.log("Error, getAllProduct :",err);
            if(err instanceof Errors) res.status(err.code).json(err)
                else res.status(Errors.standard.code).json(Errors.standard);

            }

        }
// ------------------------------------------------------- < getAllProduct get Finished  > --------------------------------------------

// ------------------------------------------------------- < createNewProduct post started  > --------------------------------------------


        productController.createNewProduct = async (req:AdminRequest,res:Response)=>{
      /*productControllerimi asinxron metodda shakllantirilgan , buning 2ta parametri bor ular 
    req:Request va res:response (typeni ozimiz belgilab olganmiz bularni )

    try catch error handling standardidan foydalandik maqsad errorni qolga 
    olish agar error bolsa
    */
   console.log("CREATE CONTROLLER HIT");

            try{
            console.log("Coming  createNewProduct Page!");
            console.log("files", req.files);
            if(!req.files?.length) throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATED_FAILED)
             

                const data:ProductInput = req.body;
                data.productImages = req.files?.map(ele =>{
                    return ele.path.replace(/\\/g, '');// agar teskasi bolsa togirlab
                });
                console.log("data :" , data);
                await productService.createNewProduct(data);
                console.log("Product created successfully");
                    res.send(`
                    <script>
                        alert("Successful creation!");
                        window.location.replace('/admin/product/all');
                    </script>
                    `);


            }catch(err){
            
            console.log("Error, createNewProduct :",err); 
            const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
                                res.send(`
                <script>
                    alert("${message}!");
                    window.location.replace('/admin/product/all');
                </script>
                `);


            }

        }
// ------------------------------------------------------- < createNewProduct post Finished  > --------------------------------------------

// ------------------------------------------------------- < updateChosenProduct post started  > --------------------------------------------


        productController.updateChosenProduct = async (req:Request,res:Response)=>{
      /*productControllerimi asinxron metodda shakllantirilgan , buning 2ta parametri bor ular 
    req:Request va res:response (typeni ozimiz belgilab olganmiz bularni )

    try catch error handling standardidan foydalandik maqsad errorni qolga 
    olish agar error bolsa
    */
            try{
            console.log("Coming  updateChoseProduct Page!");
            const id = req.params.id;
            console.log("ID :" , id);

            const result = await productService.updateChosenProduct(id , req.body);
            // datani ichiga ozgarish bomedi shunga togridan togri req.body beriladi
           res.status(HttpCode.OK).json({data: result});
            // res.send(result);

            }catch(err){
            
            console.log("Error, updateChoseProduct :",err);
            if(err instanceof Errors) res.status(err.code).json(err)
                else res.status(Errors.standard.code).json(Errors.standard);

            }

        }
// ------------------------------------------------------- < updateChoseProduct post Finished  > --------------------------------------------


export default productController;