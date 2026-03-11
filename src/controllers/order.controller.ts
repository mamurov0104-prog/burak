import { Request, Response } from "express";
import { T } from "../libs/types/common";
import { ExtendedRequest } from "../libs/types/member";
import Errors, { HttpCode } from "../libs/Errors";
import OrderService from "../models/Order.service";
import { OrderInquiry, OrderUpdateInput } from "../libs/types/order";
import { OrderStatus } from "../libs/enums/order.enum";


const orderService = new OrderService(); 

const orderControllor: T = {}; 

orderControllor.createOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("createOrder"); 

 
    const result = await orderService.createOrder(req.member, req.body);

 
    res.status(HttpCode.CREATED).json(result);
  } catch (err) {
    console.log("ERROR createOrder:", err);

    // Agar error custom Errors classidan bo‘lsa
    if (err instanceof Errors) res.status(err.code).json(err);
    // Aks holda standart errorni qaytaramiz
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};


orderControllor.getMyOrders = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getMyOrders"); 

    // Frontenddan query paramlarni destructuring qilamiz
    const { page, limit, orderStatus } = req.query;

    // Inquiry object yaratdik, bu service metodiga argument sifatida beriladi
    const inquiry: OrderInquiry = {
      page: Number(page), // query string → number
      limit: Number(limit), // query string → number
      orderStatus: orderStatus as OrderStatus, // query string → enum
    };

    // orderService objectimizning getMyOrders metodini chaqirib
    // unga argument sifatida login qilgan member va inquiry objectini pass qilamiz
    const result = await orderService.getMyOrders(req.member, inquiry);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("ERROR getMyOrders:", err); // error log
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }.0
};

// ======================
// Update Order endpoint
// ======================
orderControllor.updateOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("updateOrder"); // log

    // Frontenddan kelgan inputni olamiz (orderId va orderStatus)
    const input: OrderUpdateInput = req.body;
    console.log("input:", input); 

    // orderService objectimizning updateOrder metodini chaqirib
    // unga argument sifatida login qilgan member va update inputni pass qilamiz
    const result = await orderService.updateOrder(req.member, input);

  
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("ERROR updateOrder:", err); 
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};


export default orderControllor;