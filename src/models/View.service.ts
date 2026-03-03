import Errors, { HttpCode } from "../libs/Errors";
import { View, ViewInput } from "../libs/types/view";
import ViewModel from "../schema/View.model";
import { Message } from "../libs/Errors";
// import { View } from "../libs/types/view"

class ViewService{
    static checkViewExistence(input: ViewInput) {
       throw new Error("Method not implemented.");
    }
    private readonly viewModel;
    constructor(){
        this.viewModel=ViewModel
    }
    public async checkViewExistence( input:ViewInput): Promise<any>{
      return await this.viewModel
      .findOne( {memberId:input.memberId , viewRefId:input.viewRefId})
      .exec()
    }
      public async insertMemberView(input: ViewInput): Promise<any> {
    try {
      return await this.viewModel.create(input);
    } catch (error) {
      console.log("ERROR: insertMemberView", error);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATED_FAILED);
    }
  }
}
export default ViewService;