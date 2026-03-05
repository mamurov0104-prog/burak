import express, { Request, Response } from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";
import orderControllor from "./controllers/order.controller";
//** MEMBER */
router.get("/member/restaurant", memberController.getRestaurant);
router.post("/member/signup", memberController.signup);
router.post("/member/login", memberController.login);
router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout,
);
// router.post(
//   "/member/update",
//   memberController.verifyAuth,
//   uploader("members").single("memberImage"),
//   memberController.updateMember,
// );
router.post(
  "/member/update",
  memberController.verifyAuth,
  uploader("members").single("memberImage"),
  (req, res, next) => {
    console.log("Middleware orqali routega keldi "); 
    next();
  },
  memberController.updateMember
);
router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail,
);
router.get("/member/top-users", memberController.getTopUsers);

//** PRODUCT */

router.get("/product/all" , productController.getProducts);

router.get("/product/:id" ,
   memberController.retrieveAuth ,
    productController.getProduct);


//** ORDERS */
router.post(
  "/order/create",
  memberController.verifyAuth,
  orderControllor.createOrder,
);
router.get(
  "/order/all",
  memberController.verifyAuth,
  orderControllor.getMyOrders,
);

router.post(
  "/order/update",
  memberController.verifyAuth,
  orderControllor.updateOrder,
);

export default router;