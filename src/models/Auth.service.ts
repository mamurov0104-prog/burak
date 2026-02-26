// Importlar
import Errors, { HttpCode, Message } from "../libs/Errors"; // Custom error handling
import { AUTH_TIMER } from "../libs/config";                 // Token muddati konfiguratsiyasi
import { Member } from "../libs/types/member";              // Member tipini import
import jwt from "jsonwebtoken";                             // JWT yaratish va tekshirish

// AuthService klassi – JWT token yaratish va tekshirish uchun
class AuthService {
  // Token yaratish uchun sirli kalit
  private readonly secretToken;

  constructor() {
    // SECRET_TOKEN env variable dan olinadi
    // Agar .env faylda bo'lmasa, kod xato beradi
    this.secretToken = process.env.SECRET_TOKEN as string;
  }

  // ======================= CREATE TOKEN =======================
  // Kiruvchi param: payload (Member object)
  // Chiquvchi natija: JWT string
  public async createToken(payload: Member) {
    return new Promise((resolve, reject) => {
      // Token muddati (config fayldan)
      const duration = `${AUTH_TIMER}h`; // Masalan 2h, 24h va hokazo

      // JWT sign – payloadni token ichiga joylashtirish
      jwt.sign(
        payload,                       // Token ichiga yoziladigan ma'lumot
        process.env.SECRET_TOKEN as string, // Sirli kalit
        {
          expiresIn: duration,         // Tokenning amal qilish muddati
        },
        (err, token) => {
          if (err) {
            // Agar token yaratishda xato bo‘lsa, reject qilamiz
            reject(
              new Errors(
                HttpCode.UNAUTHORIZED,         // 401 status
                Message.TOKEN_CREATION_FAILED  // Xato xabar
              )
            );
          } else {
            // Token muvaffaqiyatli yaratilsa, resolve qilamiz
            resolve(token as string);
          }
        }
      );
    });
  }

  // ======================= CHECK AUTH =======================
  // Kiruvchi param: token (JWT string)
  // Chiquvchi natija: Member object agar token valid bo‘lsa
  public async checkAuth(token: string): Promise<Member> {
    try {
      // jwt.verify – tokenni tekshiradi va payloadni qaytaradi
      const result: Member = (await jwt.verify(token, this.secretToken)) as Member;

      // Log yozamiz – token orqali qaysi member kelganini ko‘rsatish
      console.log(`--- [AUTH]  memberNick : ${result.memberNick}`);

      // Agar token valid bo‘lsa, Member objectni qaytaramiz
      return result;
    } catch (err) {
      // Token noto‘g‘ri yoki muddati tugagan bo‘lsa, xato tashlaymiz
      throw new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED);
    }
  }
}

// Default export qilish
export default AuthService;