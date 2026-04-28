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

    editTask(_id: string, doc: IToDos){
        const user =  Meteor.user();
        const task = this.getCollectionInstance().findOne(_id);
        if(task.ownerId !== user?._id){
            throw new Meteor.Error("edit-error", "Somente o usuário criador pode editar a tarefa");
        }
        this.callMethod("update", _id, {$set: {...doc}});
    }

    toggleStatus(_id: string, status: TASK_STATUS){
        this.callMethod("update", _id, {$set: {status: status}});        
    }
}

export const toDosApi = new ToDosApi();