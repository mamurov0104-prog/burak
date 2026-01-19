export enum HttpCode{
    OK = 200,
    CREATED = 201,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUN = 404,
    INTERNAL_SERVER_ERROR = 500,

}

export enum Message {
    SOMETHING_WENT_WRONG = "something went wrong!",
    NO_DATA_FOUND = "no data is found!",
    CREATED_FAILED = "created is failed!",
    UPDATED_FAILED = "update is failed!",
}

class Errors extends Error{
    public code:HttpCode;
    public message:Message;

    constructor(statusCode:HttpCode,statusMessage:Message){
       super();
       this.code = statusCode;
       this.message = statusMessage;
    }
}
export default Errors;