import { IToDos, toDosSchema } from "./toDosSch";
import { ProductBase } from "/imports/api/productBase";


class ToDosApi extends ProductBase<IToDos> {
    constructor(){
        super("toDos", toDosSchema, {
            enableCallMethodObserver: true,
            enableSubscribeObserver: true
        })
    }
}

export const toDosApi = new ToDosApi();