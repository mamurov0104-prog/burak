export enum HttpCode{
    OK = 200,
    CREATED = 201,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,

}

export enum Message {
    SOMETHING_WENT_WRONG = "something went wrong!",
    NO_DATA_FOUND = "no data is found!",
    CREATED_FAILED = "created is failed!",
    UPDATED_FAILED = "update is failed!",

    USED_NICK_PHONE = "You are inserting already used phone number!",
    TOKEN_CREATION_FAILED = "Token has occur error" ,
    NO_MEMBER_NICK = "No member with that member nickname!",
    WRONG_PASSWORD = "Wrong password , please try again!",
    NOT_AUTHONTICATED = "You are not authenticated !",
    BLOCKED_USER = "You have been blocked!"
}

class Errors extends Error{
    public code:HttpCode;
    public message:Message;
    static standard = {
        code:HttpCode.INTERNAL_SERVER_ERROR,
        Message: Message.SOMETHING_WENT_WRONG
    };
    constructor(statusCode:HttpCode,statusMessage:Message){
       super();
       this.code = statusCode;
       this.message = statusMessage;
    }
}
export default Errors;