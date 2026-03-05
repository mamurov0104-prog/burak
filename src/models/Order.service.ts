import OrderItemModel from "../schema/OrderItem.model";
import OrderModel from "../schema/Order.model";
import { Member } from "../libs/types/member";
import {
  Order,
  OrderInquiry,
  OrderItemInput,
  OrderUpdateInput,
} from "../libs/types/order";
import { shapeIntoMongooseObjectId } from "../libs/config";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { ObjectId } from "mongoose";
import MemberService from "./Member.service";
import { OrderStatus } from "../libs/enums/order.enum";

class OrderService {
  private readonly orderModel;
  private readonly orderItemModel;
  private readonly memberService;


  constructor() {
    this.orderModel = OrderModel;
    this.orderItemModel = OrderItemModel;
    this.memberService = new MemberService();
  }

  public async createOrder(
    member: Member,
    input: OrderItemInput[],
  ): Promise<Order> {
    console.log("input:", input);
    const memberId = shapeIntoMongooseObjectId(member._id);

    const amount = input.reduce((acc: number, input: OrderItemInput) => {
      return acc + input.itemPrice * input.itemQuantity;
    }, 0);
    const delivery = amount < 100 ? 5 : 0;
   // database validationda xato bolsa ozimizi cutsom errorni berish 
    try {
      console.log("orderModel.create");
      const newOrder: any = await this.orderModel.create({
        orderTotal: amount + delivery,
        orderDeleviry: delivery,
        memberId: memberId,
      });
      console.log("OrderId:", newOrder._id);
      const orderId = newOrder._id;

      //TODO : create orderItems
      await this.recordOrderItem(newOrder._id, input);
      return newOrder;
    } catch (error) {
      console.log("Error, model : createOrder:", error);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
    }
  }
  private async recordOrderItem(
    orderId: ObjectId,
    input: OrderItemInput[],
  ): Promise<void> {
    const promisedList = input.map(async (item: OrderItemInput) => {
      item.orderId = orderId;
      item.productId = shapeIntoMongooseObjectId(item.productId);
      await this.orderItemModel.create(item);
      return "Inserted";
    });
    console.log("promisedList:", promisedList);
    const orderItemState = await Promise.all(promisedList);
    console.log("orderItemState:", orderItemState);
  }
  public async getMyOrders(
    member: Member,
    inquiry: OrderInquiry,
  ): Promise<Order[]> {
    const memberId = shapeIntoMongooseObjectId(member._id);
    const matches = { memberId: memberId, orderStatus: inquiry.orderStatus };

    const result = await this.orderModel
      .aggregate([
        { $match: matches },
        { $sort: { updatedAt: -1 } },
        { $skip: (inquiry.page - 1) * inquiry.limit },
        { $limit: inquiry.limit },
        {
          $lookup: {
            from: "orderItems",
            localField: "_id",
            foreignField: "orderId",
            as: "orderItems",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "orderItems.productId",
            foreignField: "_id",
            as: "productData",
          },
        },
      ])
      .exec();
    return result;
  }
  // throw new Errors  pass qilindi

  public async updateOrder(
    member: Member,
    input: OrderUpdateInput,
  ): Promise<any> {
    const memberId = shapeIntoMongooseObjectId(member._id),
      orderId = shapeIntoMongooseObjectId(input.orderId),
      orderStatus = input.orderStatus,
      check = await this.orderModel
        .findOneAndUpdate({
          memberId: memberId,
          _id: orderId,
        })
        .exec();
        if (!check) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);


    if (check.orderStatus !== OrderStatus.PAUSE) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
    } else {
      const result = await this.orderModel
        .findOneAndUpdate(
          {
            memberId: memberId,
            _id: orderId,
          },
          { orderStatus: orderStatus },
          { new: true },
        )
        .exec();
      //orderStatus Pause -> Process  +1 point
      if (orderStatus === OrderStatus.PROCCESS) {
        this.memberService.addUserPoint(member, 1);
      }
      return result;
    }
  }
}

export default OrderService;

// lookup