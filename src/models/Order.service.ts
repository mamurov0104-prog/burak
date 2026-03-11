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




// ------------------------------------ < createOrder srated > ------------------------------------



// Maqsad: frontenddan kelgan order itemlarni DBga yozish va yangi order yaratish

// Chiqish:
//   - Yaratilgan order object (DB document)
// Qayerga ketadi:
//   - DB → orders collection va orderItems collection
public async createOrder(
  member: Member,             // login qilgan user
  input: OrderItemInput[],    // frontenddan kelgan order itemlar
): Promise<Order> {

  // STEP 1: Inputni log qilish
  // Kirish: frontenddan kelgan array
  // Chiqish: log console ga chiqariladi
  console.log("input:", input);

  // ======================
  // STEP 2: memberId ni Mongo ObjectId formatiga o‘tkazish
  // ======================
  // Kirish: member._id (string)
  // Chiqish: MongoDB ObjectId → DB query uchun
  const memberId = shapeIntoMongooseObjectId(member._id);

  // STEP 3: Order summasini hisoblash
  /*reduce() — array ichidagi barcha elementlarni bitta qiymatga aylantirish uchun ishlatiladi.
  Bu yerda:
  Ko‘p orderItemlardan Bitta umumiy summa (amount) hosil qilinyapti. 
  ya'ni reduce() har bir order item uchun narx × sonini hisoblab, barchasini bitta umumiy summaga qo‘shadi.
   0 — boshlang‘ich summa, acc esa har aylanishda yig‘ilib boradigan jami pul miqdori.
  */
  // Kirish: input array
  // Chiqish: total amount
  // Logic: har bir item narxi * quantity → summaga qo‘shiladi
  const amount = input.reduce((acc: number, input: OrderItemInput) => {
    return acc + input.itemPrice * input.itemQuantity;
  }, 0);

  // STEP 4: Delivery cost hisoblash
  // Kirish: amount
  // Chiqish: delivery (agar amount < 100 → 5, aks holda 0)
  const delivery = amount < 100 ? 5 : 0;

  // ======================
  // STEP 5: DBga order yaratish va error handling
  // ======================
  try {
    // DBga order create qilinadi
    console.log("orderModel.create");
    const newOrder: any = await this.orderModel.create({
      orderTotal: amount + delivery,  // total summasi + delivery
      orderDeleviry: delivery,        // delivery cost
      memberId: memberId,             // login qilgan user
    });

    console.log("OrderId:", newOrder._id);
    const orderId = newOrder._id;


    await this.recordOrderItem(newOrder._id, input);

   
    return newOrder;

  } catch (error) {

    console.log("Error, model : createOrder:", error);
    throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
  }
}


private async recordOrderItem(
  orderId: ObjectId,           // order document ID
  input: OrderItemInput[],      // frontenddan kelgan itemlar
): Promise<void> {

  // ======================
  // STEP 1: Har bir item uchun async create
  // ======================
  // map bilan barcha itemlarni async create qilamiz
      /* input — array
    map() — har bir element ustida ishlaydi
    async — har biri alohida async operatsiya
    Natijada:
    promisedList = Promise lar ro‘yxati bo‘ladi. */
  const promisedList = input.map(async (item: OrderItemInput) => {

    // orderId qo‘shiladi → har item qaysi orderga tegishli ekanligi
    item.orderId = orderId;

    // productId ObjectId formatga o‘tkaziladi
    item.productId = shapeIntoMongooseObjectId(item.productId);

    // DBga yoziladi
    await this.orderItemModel.create(item);

    return "Inserted";
  });

  // ======================
  // STEP 2: Promisesni log qilish
  // ======================
  console.log("promisedList:", promisedList);
    /*Ya’ni bu hali tugamagan async operatsiyalar.

    ⚠ Bu yerda hali DB yozish tugamagan bo‘ladi. */
  // ======================
  // STEP 3: Barcha async create tugashini kutish
  /*Bu nima qiladi?

    Promise.all() barcha Promise larni parallel ishga tushiradi
    va hammasi tugaguncha kutadi
    Agar 3 ta item bo‘lsa:
    1-item yoziladi
    2-item yoziladi
    3-item yoziladi
    Hammasi tugagandan keyingina keyingi qator ishlaydi. */
  // ======================
  const orderItemState = await Promise.all(promisedList);


  console.log("orderItemState:", orderItemState);
}

// ------------------------------------ < createOrder finished > ------------------------------------



// ------------------------------------ < getMyOrders started > ------------------------------------




  public async getMyOrders(member: Member, inquiry: OrderInquiry): Promise<Order[]> {
  // Step 1: member._id ni MongoDB ObjectId formatiga o‘tkazamiz
  const memberId = shapeIntoMongooseObjectId(member._id);

  // Step 2: Match condition – faqat shu user va orderStatus bo‘lgan orderlarni tanlaymiz
  const matches = { memberId: memberId, orderStatus: inquiry.orderStatus };

  // ======================
  // Step 3: Aggregate pipeline
  // ======================
  // DBga kirish → orders collection
  const result = await this.orderModel
    .aggregate([
      // ---------- STAGE 1: $match ----------
      // Maqsad: faqat shu user va orderStatus bo‘lgan orderlarni olish
      { $match: matches },
      // Kirish: orders collection
      // Chiqish: faqat filter qilingan orders
      // Example: {_id: ..., memberId: 123, orderStatus: "PAUSE", ...}

      // ---------- STAGE 2: $sort ----------
      // Maqsad: orderlarni so‘nggi yangilangan bo‘yicha tartiblash
      { $sort: { updatedAt: -1 } },
      // Kirish: filtered orders
      // Chiqish: sorted orders

      // ---------- STAGE 3: $skip ----------
      // Maqsad: pagination offset
      { $skip: (inquiry.page - 1) * inquiry.limit },
      // Kirish: sorted orders
      // Chiqish: skip qilingan orders (masalan, page 2 → oldingi page itemsni tashlab ketadi)

      // ---------- STAGE 4: $limit ----------
      // Maqsad: pagination limit
      { $limit: inquiry.limit },
      // Kirish: skip qilingan orders
      // Chiqish: faqat limit miqdoridagi orders

      // ---------- STAGE 5: $lookup → orderItems ----------
      // Maqsad: orderItems collection bilan join qilish
      /*
        Har bir order uchun: orders._id  ===  orderItems.orderId mos kelgan orderItemlarni to
      */
      { 
        $lookup: { 
          from: "orderItems",            // DB collection nomi
          localField: "_id",             // orders._id bilan bog‘lanadi
          foreignField: "orderId",       // orderItems.orderId bilan
          as: "orderItems",              // natija field nomi
        } 
      },
      // Kirish: paginated orders
      // Chiqish: har bir orderga orderItems array qo‘shiladi
      // Example: { _id: ..., orderItems: [{productId: ..., quantity: ...}, ...], ... }

      // ---------- STAGE 6: $lookup → products ----------
      // Maqsad: har bir orderItem.productId bilan products collectionni join qilish
      /*Bu nima qiladi?
        Endi har bir order ichida orderItems.productId bor. U shuni products._id bilan solishtiradi. */
      { 
        $lookup: { 
          from: "products",                  // DB collection nomi
          localField: "orderItems.productId", // orderItems ichidagi productId bilan bog‘lanadi
          foreignField: "_id",               // products._id bilan match
          as: "productData",                 // natija field nomi
        } 
      },
      // Kirish: orders with orderItems array
      // Chiqish: har bir orderga productData array qo‘shiladi
      // Example: { _id: ..., orderItems: [...], productData: [{_id: 1, name: "item1"}, ...] }
    ])
    .exec(); // DBga jo‘natiladi → natija Promise bo‘ladi

  // Step 4: Natija return qilinadi
  // return: array of orders, har bir order ichida orderItems va productData arraylar mavjud
  return result;
}

// ------------------------------------ < getMyOrders finished > ------------------------------------





// ------------------------------------ < updateOrder started > ------------------------------------


// updateOrder metodini e'lon qilamiz (order statusni yangilash uchun)
public async updateOrder(member: Member, input: OrderUpdateInput): Promise<any> {

  // member._id ni MongoDB ObjectId formatiga o‘tkazamiz
  const memberId = shapeIntoMongooseObjectId(member._id);

  // inputdan kelgan orderId ni MongoDB ObjectId formatiga o‘tkazamiz
  const orderId = shapeIntoMongooseObjectId(input.orderId);

  // requestdan kelgan orderStatus ni olamiz
  const orderStatus = input.orderStatus;

  // orderModel orqali orderni topib, orderStatusni yangilaymiz
  const result = await this.orderModel.findOneAndUpdate(
      { memberId: memberId, _id: orderId }, // qidirish sharti: memberId va orderId mos bo‘lsin
      { orderStatus: orderStatus },        // yangilash: orderStatus ni o‘zgartiramiz
      { new: true }                         // new:true → yangilangan documentni qaytaradi
    ).exec(); // queryni execute qilamiz

  // agar orderStatus PROCESS bo‘lsa — userga 1 ball qo‘shamiz
  if (orderStatus === OrderStatus.PROCESS) {
      await this.memberService.addUserPoint(member, 1);
  }

  // yangilangan orderni qaytaramiz
  return result;
}
// ------------------------------------ < updateOrder finished > ------------------------------------

}

export default OrderService;
