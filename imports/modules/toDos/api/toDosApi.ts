import { Meteor } from "meteor/meteor";
import { IToDos, TASK_STATUS, toDosSchema } from "./toDosSch";
import { ProductBase } from "/imports/api/productBase";


class ToDosApi extends ProductBase<IToDos> {
    constructor(){
        super("toDos", toDosSchema, {
            enableCallMethodObserver: true,
            enableSubscribeObserver: true
        })
    }

    insertTask(doc: {title: string, description: string, isPrivate: boolean}){
        const user = Meteor.user();
        const task: IToDos = {
            ...doc, //title, description e isPrivate
            status: TASK_STATUS.NÃO_CONCLUIDA,
            ownerId: user._id,
            ownerName: user?.username ?? ""
        }
        this.callMethod("insert", task);
    }
}

export const toDosApi = new ToDosApi();