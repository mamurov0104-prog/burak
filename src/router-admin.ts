// import  express, {Request,Response} from "express";
console.log(" ROUTER ADMIN LOADED");
 
import  express from "express";

const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controller";
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
.post('/signup', restaurantController.processSignup)
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

routerAdmin.get('/product/all', productController.getAllProducts)
routerAdmin.post('/product/create', productController.createNewProduct)
routerAdmin.post('/product/:id', productController.updateChoseProduct)

/*User Endpoints*/


export default routerAdmin;



