import MemberModel from "../schema/Member.model";
import { Member, MemberInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";

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

       }else{

       }
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
};
export default MemberService;