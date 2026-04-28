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

    updateTask(doc: IToDos){
        const user =  Meteor.user();
        if(doc.ownerId !== user?._id){
            throw new Meteor.Error("update-error", "Somente o usuário criador pode editar a tarefa");
        }
        this.callMethod("update", doc);
    }
}

export const toDosApi = new ToDosApi();