import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";
class MemberService{
    private readonly memberModel;
    constructor(){
 this.memberModel=MemberModel;
    }
    // public async processSignup(): void {
    //    console.log("Passed here !")
    //  }
    public async processSignup(input:MemberInput): Promise<any> {
    // comment ga olingan va commentdan chiqsa ishlaydi !!!
    
           const exist = await this.memberModel
       .findOne({memberType:MemberType.RESTAURANT})
       .exec();
       console.log("exist:",exist);
       if(exist){
            throw new Errors(HttpCode.BAD_REQUEST,Message.CREATED_FAILED);

       };
       console.log("memberPassword before",input.memberPassword);
       const salt = await bcrypt.genSalt();
       input.memberPassword = await bcrypt.hash(input.memberPassword , salt);
       console.log("memberPassword after",input.memberPassword);

        try{
        const result = await this.memberModel.create(input);
        // const tempResult = new this.memberModel(input);
        // const result = await tempResult.save();

        result.memberPassword='';
        return result;
    //    console.log("Passed here !")
        }catch(err){
            throw new Errors(HttpCode.BAD_REQUEST,Message.CREATED_FAILED);
        //    console.log("Error Errror Error", err);
        }
        
}

public async processLogin(input:LoginInput):Promise<any>{
const member = await this.memberModel
.findOne(
    {memberNick:input.memberNick},
    {_id:1,memberNick:1,memberPassword:1})
.exec();

if(!member) throw new Errors(HttpCode.NOT_FOUND,Message.NO_MEMBER_NICK);
// const isMatch = input.memberPassword === member.memberPassword;
// console.log("isMatch:", isMatch);
const isMatch = await bcrypt.compare(
    input.memberPassword, // biz kiritfan password
    member.memberPassword);// database dan kelgan yangi string
if(!isMatch){
    throw new Errors(HttpCode.UNAUTHORIZED,Message.WRONG_PASSWORD);}
const result = await this.memberModel.findById(member._id).exec();
    console.log("result:",result);
return result;
}
};
export default MemberService;