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
productController.getProducts = async (req: Request, res: Response) => {
  try {
    // Frontenddan kelgan request shu yerga keladi
    console.log("Coming getProducts Page!");

    // URL query parameterlarini ajratib olyapmiz
    // Masalan: /product/all?page=1&limit=3&order=productPrice
    const { page, limit, order, productCollection, search } = req.query;

    // Frontenddan kelgan query ma’lumotlarini 
    // service qatlamiga uzatish uchun maxsus object tayyorlayapmiz
    const inquiry: ProductInquiry = {
      order: String(order),   // qaysi field bo‘yicha sort qilish
      page: Number(page),     // pagination uchun page
      limit: Number(limit),   // nechta product chiqarish
    };

    // Agar product collection bo‘lsa (masalan: DRINK, Salad)
    if (productCollection)
      inquiry.productCollection = productCollection as ProductCollection;

    // Agar search kelgan bo‘lsa (masalan: cola)
    if (search)
      inquiry.search = String(search);

    //  MUHIM QISM:
    // ProductService objectining getProducts metodini chaqirdik
    // va unga argument sifatida inquiry objectini yubordik
    const result = await productService.getProducts(inquiry);

    // Service dan kelgan natijani frontendga json ko‘rinishda qaytardik
    res.status(HttpCode.OK).json({ result: result });

  } catch (err) {

    console.log("Error, getProducts :", err);

    // Agar custom error bo‘lsa shuni qaytaramiz
    if (err instanceof Errors)
      res.status(err.code).json(err);
    else
      res.status(Errors.standard.code).json(Errors.standard);
  }
}
// -------------------------------- > getProducts get end < -----------------------------------

// -------------------------------- > getProduct get started < -----------------------------------
/**
 * @function getProduct
 * @description
 * Bu controller metodi frontenddan kelgan "bitta product" so'rovini qabul qiladi,
 * service layerga yuboradi va natijani JSON ko'rinishida frontendga qaytaradi.
 * Shu bilan birga, agar foydalanuvchi login qilgan bo'lsa,
 * productni kim ko'rganini view logging orqali saqlaydi.
 */
productController.getProduct = async (req: ExtendedRequest, res: Response) => {
  try {
    // --- Qadam 1: Log console
    console.log("Coming getProduct Page!");

    // --- Qadam 2: URL paramsdan product IDni olish
    const { id } = req.params;

    // --- Qadam 3: Agar member login qilgan bo'lsa, ularning ID sini olish
    const memberId = req.member?._id ?? null;

    // --- Qadam 4: ProductService objectining getProduct metodini chaqiramiz
    // va unga argument sifatida "memberId" va "product id" ni yuboramiz
    // Bu metod service layerda productni DBdan olib keladi
    const result = await productService.getProduct(memberId, id);

    // --- Qadam 5: Natijani frontendga qaytarish
    res.status(HttpCode.OK).json({ result: result });

  } catch (err) {
    // --- Qadam 6: Xatolikni consolega chiqarish
    console.log("Error, getProduct :", err);

    // --- Qadam 7: Agar xatolik bizning custom Errors classidan bo'lsa
    // shunchaki uning code va message bilan qaytamiz
    if (err instanceof Errors)
      res.status(err.code).json(err);
    else
      // --- Aks holda standard xatolik qaytamiz
      res.status(Errors.standard.code).json(Errors.standard);
  }
};
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