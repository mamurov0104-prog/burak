// import  express, {Request,Response} from "express";
 import  express from "express";

const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";
 
routerAdmin.get('/', restaurantController.goHome);

routerAdmin
.get('/login', restaurantController.getLogin)
.post('/login', restaurantController.processLogin);

// harakat amalga oshirish uchun post
// ---------------------- post ---------------------


routerAdmin
.get('/signup', restaurantController.getSignup)
.post('/signup', restaurantController.processSignup)
export default routerAdmin;



