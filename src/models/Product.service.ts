import Errors, { Message } from "../libs/Errors";
import { ProductInput , Product } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { HttpCode } from "../libs/Errors";

class ProductService{
 private readonly productModel;
 constructor(){
    this.productModel = ProductModel ;
 }

/* >-----< SPA >-----< */
/* >-----< BSSR  started>-----< */
public async createNewProduct(input:ProductInput): Promise<any>{ // Promise<Product>

try{
 return await this.productModel.create(input);
}catch(err){
   console.error("Error , model : createNewProduct :" , err);
throw new Errors(HttpCode.BAD_REQUEST , Message.CREATED_FAILED);
}


}
/* >-----< BSSR  finished>-----< */




}
export default ProductService;