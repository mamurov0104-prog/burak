// import  express, {Request,Response} from "express";
console.log(" ROUTER ADMIN LOADED");
 
import  express from "express";

const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controller";
import makeUploader  from "./libs/utils/uploader";
 /*Restaurant Endpoints */
routerAdmin.get('/', restaurantController.goHome);

routerAdmin
.get('/login', restaurantController.getLogin)
.post('/login', restaurantController.processLogin);
/*
login degan API imizga metodi post bolgan request kelganda  u
 restaurantController objectning processLogin metodini chaqiradi (ishlatadi)
*/

routerAdmin
.get('/signup', restaurantController.getSignup)
.post('/signup',
    makeUploader("members").single("memberImage"),
    restaurantController.processSignup)
/*
sign up degab API imizga metodi post bolgan request kelganda  u
 restaurantController objectning processSignup metodini chaqiradi (ishlatadi)
*/
// --------------------------- / LOGOUT / --------------------------


routerAdmin
.get('/logout', restaurantController.logout)
// ---------------------- for Test ------------------

routerAdmin.get('/check-me', restaurantController.checkAuthSession);


/*Product Endpoints */

routerAdmin.get('/product/all', 
    restaurantController.verifyRestaurant ,
    productController.getAllProducts)
    /*
product/all degan API imizga metodi get bolgan request kelganda  u
 restaurantController objectning verifyRestaurant metodi va  productController.getAllProducts ni chaqiradi (ishlatadi)
*/
routerAdmin.post('/product/create',
    restaurantController.verifyRestaurant ,
    // uploadProductImage.single('productImage'),
    makeUploader("products").single("productImage"),
    // makeUploader("products").array("productImages" , 5),

    productController.createNewProduct)

       /*
product/create degan API imizga metodi post bolgan request kelganda  u
 restaurantController objectning verifyRestaurant metodini va u tasdiqlansa productController objectimi
 mizning createNewProduct metodini  chaqiradi (ishlatadi)
*/
routerAdmin.post('/product/:id', 
    restaurantController.verifyRestaurant ,
    productController.updateChosenProduct)
      /*
product/:id degan API imizga metodi post bolgan request kelganda  u
 restaurantController objectning verifyRestaurant metodini va u tasdiqlansa productController objectimi
 mizning updatechosenproduct metodini  chaqiradi (ishlatadi)
*/
/*User Endpoints*/


export default routerAdmin;



