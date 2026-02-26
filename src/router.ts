// import  express, {Request,Response} from "express";
console.log(" ROUTER LOADED");

import  express from "express";

const router = express.Router();
import memberController from "./controllers/member.controller";
/* --- member --- */
router.post('/member/login', memberController.login);

router.post('/member/signup', memberController.signup);

router.get('/member/detail', memberController.verifyAuth);


/* --- product --- */



/* --- orders --- */


export default router;






