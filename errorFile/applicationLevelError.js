

export default class applicationError extends Error{
    constructor(errMessage,statusCode){
        super(errMessage);
        this.statusCode=statusCode;
    }
}