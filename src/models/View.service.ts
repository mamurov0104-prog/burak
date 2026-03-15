import Errors, { HttpCode, Message } from "../libs/Errors";
import { View, ViewInput } from "../libs/types/view";
import ViewModel from "../schema/View.model";

class ViewService {
    private readonly viewModel;

    constructor() {
        this.viewModel = ViewModel;
    }

    public async checkViewExistence(input: ViewInput): Promise<View> {
        return await this.viewModel.findOne({memberId: input.memberId, viewRefId: input.viewRefId}).exec();
    }
    
    public async insertMemberView(input: ViewInput): Promise<View> {
        try {
            return await this.viewModel.create(input);
        } catch (error) {
            console.log("Error, model: insertMemberView", error);
            throw new Errors(HttpCode.OK, Message.CREATED_FAILED);
            
        }
    }
}

export default ViewService;