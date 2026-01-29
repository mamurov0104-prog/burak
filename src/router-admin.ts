// import  express, {Request,Response} from "express";
console.log(" ROUTER ADMIN LOADED");
 
import  express from "express";

const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";
 /*Restaurant Endpoints */
routerAdmin.get('/', restaurantController.goHome);

routerAdmin
.get('/login', restaurantController.getLogin)
.post('/login', restaurantController.processLogin);


routerAdmin
.get('/signup', restaurantController.getSignup)
.post('/signup', restaurantController.processSignup)

// --------------------------- / LOGOUT / --------------------------


routerAdmin
.get('/logout', restaurantController.logout)
// ---------------------- for Test ------------------

routerAdmin.get('/check-me', restaurantController.checkAuthSession);


/*Product Endpoints */
/*User Endpoints*/


export default routerAdmin;



