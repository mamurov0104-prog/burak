console.log(" MEMBER CONTROLLER LOADED");

import { NextFunction, Request,Response} from "express";
import {T} from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput , LoginInput, Member, ExtendedRequest, MemberUpdateInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";
// import { MemberType } from "../libs/enums/member.enum";
// import { json } from "node:stream/consumers";

const memberService = new MemberService();
const authService = new AuthService();
 
const memberController:T={};
// ------------------------------------------------------- < getRestaurant get  started > --------------------------------------------


memberController.getRestaurant = async (req: Request, res: Response) => {
  /**
 * GET /member/restaurant
 *
 * Vazifasi:
 * - RESTAURANT turidagi memberni olib keladi
 * - Natijani JSON ko‘rinishda qaytaradi
 */
  try {
    console.log("getRestaurant");

    const result = await memberService.getRestaurant();

    res.status(HttpCode.OK).json(result);
  } catch (error) {
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};


// ------------------------------------------------------- < getRestaurant get finished > --------------------------------------------






// ------------------------------------------------------- < SignUp POST started > --------------------------------------------

// Bu funksiya yangi a'zo ro'yxatdan o'tishi uchun ishlatiladi
// Kiruvchi ma'lumotlar: req.body (MemberInput tipida)
// Chiquvchi ma'lumotlar: ro'yxatdan o'tgan member va token

memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup called");

    // Clientdan kelgan inputni olamiz
    const input: MemberInput = req.body;

    // memberService.signup funksiyasini chaqirib, a'zo yaratamiz
    const result: Member = await memberService.signup(input);

    // A'zo yaratilib bo'lgach, token yaratamiz (JWT yoki boshqa token)
    const token = await authService.createToken(result);

    // Cookie orqali access tokenni clientga yuboramiz
    // maxAge – cookie amal qilish muddati (soat * 3600 * 1000 ms)
    // httpOnly false: browser JS dan ham o'qilishi mumkin (aks holda true bo'lishi xavfsiz)
    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    });

    console.log("token =>", token);

    // Agar muvaffaqiyatli bo'lsa, HTTP 201 va JSON formatda a'zo + token yuboramiz
    res.status(HttpCode.CREATED).json({ member: result, accessToken: token });
  } catch (err) {
    // Xatolik yuz bersa, konsolga yozamiz
    console.log("Error, signup:", err);

    // Agar Errors klassidan bo'lsa, xato kodini yuboramiz
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// ------------------------------------------------------- < SignUp POST Finished > --------------------------------------------
// ------------------------------------------------------- < login POST started > --------------------------------------------

// Bu funksiya: foydalanuvchi tizimga kirishi (login) uchun ishlatiladi
// Kiruvchi ma'lumotlar: req.body (LoginInput) { memberNick, memberPassword }
// Chiquvchi ma'lumotlar: muvaffaqiyatli login qilgan member + accessToken (JWT yoki boshqa token)
memberController.login = async (req: Request, res: Response) => {
  try {
    // Funksiya chaqirilganini logga yozamiz
    console.log("login called");

    // Clientdan kelgan login inputni olamiz
    // input object: { memberNick: string, memberPassword: string }
    const input: LoginInput = req.body;

    // MemberService.login funksiyasini chaqiramiz
    // Bu funksiya DB dan memberni topadi va passwordni tekshiradi
    const result = await memberService.login(input);

    // Login muvaffaqiyatli bo'lsa, token yaratamiz
    // result orqali userID va boshqa ma'lumot token ichiga qo'yiladi
    const token = await authService.createToken(result);

    // Tokenni cookie orqali clientga yuboramiz
    // maxAge – cookie amal qilish muddati (soat * 3600 * 1000 ms)
    // httpOnly false: browser JS dan ham o'qilishi mumkin
    res.cookie("accessToken", token, {
      maxAge: AUTH_TIMER * 3600 * 1000,
      httpOnly: false,
    })

    // Logga tokenni chiqaramiz
    console.log("token =>", token);

    // HTTP 200 status va JSON formatda muvaffaqiyatli login natijasi
    res.status(HttpCode.OK).json({ member: result, accessToken: token });
  } catch (err) {
    // Xatolik yuz bersa, konsolga chiqaramiz
    console.log("Error, login:", err);

    // Agar bu Errors tipidagi xato bo'lsa, xato kod va xabarni yuboramiz
    if (err instanceof Errors) res.status(err.code).json(err);
    // Aks holda, standart xato kodini yuboramiz
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// ------------------------------------------------------- < login POST finished > --------------------------------------------
// ------------------------------------------------------- < logout POST started > --------------------------------------------

// Bu funksiya foydalanuvchini tizimdan chiqaradi (logout)
// Kiruvchi param: req (ExtendedRequest), res (Response)
// Chiquvchi natija: muvaffaqiyatli logout xabari
memberController.logout = (req: ExtendedRequest, res: Response) => {
  try {
    // Funksiya chaqirilganini konsolga yozamiz
    console.log("logout called");

    // Cookie orqali accessToken ni bekor qilamiz
    // 1 Cookie nomi "accessToken"
    // 2 Qiymati null qilinadi
    // 3 maxAge: 0 → cookie darhol o‘chadi
    // 4 httpOnly: true → browser JS dan o‘qilmaydi (xavfsiz)
    res.cookie("accessToken", null, {
      maxAge: 0,
      httpOnly: true,
    });

    // Logout muvaffaqiyatli bo‘lganini clientga yuboramiz
    res.status(HttpCode.OK).json({ logout: true });
  } catch (err) {
    // Xatolik yuz bersa, konsolga chiqaramiz
    console.log("Error, logout:", err);

    // Agar custom Errors tipidagi xato bo‘lsa, xato kodini yuboramiz
    if (err instanceof Errors) res.status(err.code).json(err);
    // Aks holda standart xato kodini yuboramiz
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// ------------------------------------------------------- < logout POST finished > --------------------------------------------
// ------------------------------------------------------- < getMemberDetail POST finished > --------------------------------------------

// Bu funksiya MemberController obyektiga qo'shilgan va ma'lum bir a'zo (member) haqida ma'lumot 
// olish uchun ishlatiladi
//Asosiy vazifa: req orqali kelgan member ma'lumotiga qarab DB dan tafsilotlarni olib, javob qaytaradi

memberController.getMemberDetail = async (req: ExtendedRequest, res: Response) => {
  try {
    // Log yozamiz, funksiyaga kirganini bilish uchun
    console.log("getMemberDetail called");

    // memberService.getMemberDetail funksiyasini chaqiramiz
    // req.member -> bu user authentication orqali kelgan member ma'lumotini o'z ichiga oladi
    const result = await memberService.getMemberDetail(req.member);

    // Agar ma'lumot topilsa, HTTP 200 status bilan JSON javob qaytaramiz
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    // Error holatida konsolga chiqaramiz
    console.log("Error in getMemberDetail:", err);

    // Agar bu Errors tipidagi xato bo'lsa, xato kod va xabarni qaytaramiz
    if (err instanceof Errors) res.status(err.code).json(err);
    // Aks holda, standart xato kodni yuboramiz
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// ------------------------------------------------------- < getMemberDetail POST finished > --------------------------------------------



// ------------------------------------------------------- < verifyAuth get started > --------------------------------------------

// verifyAuth – bu middleware
// Maqsadi: har bir requestda accessToken bor-yo'qligini tekshirish, va token valid bo'lsa req.member ga qo'yish
// Kiruvchi param: req (ExtendedRequest), res (Response), next (NextFunction)
// Chiquvchi natija: agar token valid bo'lsa -> next() chaqiriladi, aks holda xato qaytadi

memberController.verifyAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1 Clientdan cookie orqali accessToken olish
    const token = req.cookies["accessToken"];

    // 2 Agar token mavjud bo‘lsa
    if (token) {
      // authService.checkAuth(token) – tokenni tekshiradi
      // Agar valid bo‘lsa, Member object qaytaradi
      req.member = await authService.checkAuth(token);
    }

    // 3 Agar req.member hali ham undefined bo‘lsa, ya'ni token yo‘q yoki invalid
    if (!req.member) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHONTICATED);
    }

    // 4 Agar hammasi to‘g‘ri bo‘lsa, keyingi middleware yoki route handlerga o‘tadi
    next();
  } catch (err) {
    // 5 Xatolik yuz bersa, logga chiqaramiz
    console.log("Error, verifyAuth:", err);

    // Agar Errors klassidan bo‘lsa, xato kodini yuboramiz
    if (err instanceof Errors) res.status(err.code).json(err);
    // Aks holda, standart xato kodini yuboramiz
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// ------------------------------------------------------- < verifyAuth get finished > --------------------------------------------
// ------------------------------------------------------- < retrieveAuth get started > --------------------------------------------

// retrieveAuth – bu middleware
// Maqsadi: accessToken bo‘lsa, tokenni tekshirish va req.member ga qo‘yish
// Lekin token bo‘lmasa yoki invalid bo‘lsa ham route ishlashini davom ettiradi
// Kiruvchi param: req (ExtendedRequest), res (Response), next (NextFunction)
memberController.retrieveAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1 Clientdan cookie orqali accessToken olish
    const token = req.cookies["accessToken"];

    // 2 Agar token mavjud bo‘lsa
    if (token) {
      // authService.checkAuth(token) – tokenni tekshiradi
      // Agar valid bo‘lsa, Member object qaytaradi
      req.member = await authService.checkAuth(token);
    }

    // 3 Token mavjud bo‘lmasa yoki invalid bo‘lsa ham xatolik tashlanmaydi
    // Middleware davom etadi
    next();
  } catch (err) {
    // Xatolik yuz bersa (token invalid bo‘lsa)
    // Logga chiqaramiz, lekin route ishlashni to‘xtatmaymiz
    console.log("Error, retrieveAuth:", err);

    // next() chaqiriladi, route davom etadi
    next();
  }
};

// ------------------------------------------------------- < retrieveAuth get finished > --------------------------------------------

// ------------------------------------------------------- < updateMember started > --------------------------------------------

// memberController ichiga updateMember nomli async funksiya qo‘shilmoqda
memberController.updateMember = async (req: ExtendedRequest, res: Response) => {

  /**
   * POST /member/update
   *
   * Himoyalangan endpoint (verifyAuth middleware orqali)
   *
   * Jarayon:
   * 1) verifyAuth userni aniqlab req.member ga joylaydi
   * 2) req.body dan kelgan ma’lumotlar olinadi
   * 3) Agar rasm yuklangan bo‘lsa req.file orqali olinadi
   * 4) Service qatlamiga yuborilib database da update qilinadi
   */

  try {
    // Terminalda funksiya ishlaganini ko‘rsatish uchun
    console.log("updateMember");

    // Client tomonidan yuborilgan body ma’lumotlarini olish
    // MemberUpdateInput — bu TypeScript type (update qilinadigan fieldlar)
    const input: MemberUpdateInput = req.body;

    // Agar foydalanuvchi rasm yuklagan bo‘lsa
    if (req.file) {
      // Yuklangan rasmning saqlangan pathini olish
      // replace orqali keraksiz belgilarni tozalash
      input.memberImage = req.file.path.replace(/,\\/g, '');
    }

    // Service qatlamiga murojaat qilish
    // req.member — login bo‘lgan foydalanuvchi ma’lumoti
    // input — yangilanadigan ma’lumotlar
    const result = await memberService.updateMember(req.member, input);

    // Agar hammasi muvaffaqiyatli bo‘lsa 200 (OK) status bilan javob qaytarish
    res.status(HttpCode.OK).json(result);

  } catch (error) {
    // Agar xatolik yuz bersa terminalga chiqarish
    console.log("ERROR updateMember:", error);

    // Agar xato bizning custom Errors classimizdan bo‘lsa
    if (error instanceof Errors) {
      // O‘sha xatoning o‘z status kodi bilan qaytarish
      res.status(error.code).json(error);
    } else {
      // Noma’lum xatolar uchun umumiy (standard) error qaytarish
      res.status(Errors.standard.code).json(Errors.standard);
    }
  }
};

// ------------------------------------------------------- < updateMember finished > --------------------------------------------


// ------------------------------------------------------- < getTopUsers started > --------------------------------------------
memberController.getTopUsers = async (req: Request, res: Response) => {
  /**
 * GET /member/top-users
 *
 * Vazifasi:
 * - Eng ko‘p ball to‘plagan 4 ta active userni qaytarish
 */
  try {
    console.log("getTopUsers");

    const result = await memberService.getTopUsers();

    res.status(HttpCode.OK).json(result);
  } catch (error) {
    if (error instanceof Errors) res.status(error.code).json(error);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

// ------------------------------------------------------- < getTopUsers finished > --------------------------------------------



export default memberController;