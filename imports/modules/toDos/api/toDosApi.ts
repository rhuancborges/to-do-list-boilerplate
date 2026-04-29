import { Meteor } from "meteor/meteor";
import { IToDos, TASK_STATUS, toDosSchema } from "./toDosSch";
import { ProductBase } from "/imports/api/productBase";
import { IMeteorError } from "/imports/typings/IMeteorError";

export interface ISubmitProps {
    title: string, 
    description?: string, 
    isPrivate: boolean
}

class ToDosApi extends ProductBase<IToDos> {
    constructor(){
        super("toDos", toDosSchema, {
            enableCallMethodObserver: true,
            enableSubscribeObserver: true
        })
        this.insertTask = this.insertTask.bind(this);
        this.editTask = this.editTask.bind(this);
    }

    insertTask(id: string, doc: ISubmitProps, callback: (e?: IMeteorError) => void){
        const user = Meteor.user();
        const task: IToDos = {
            ...doc, //title, description e isPrivate
            status: TASK_STATUS.NÃO_CONCLUIDA,
            ownerId: user._id,
            ownerName: user?.username ?? ""
        }
        this.callMethod("insert", task, (error: IMeteorError)=> {
            if(error){
                callback(error)
            }
        });
        callback();
    }

    editTask(_id: string, doc: ISubmitProps, callback: (e: IMeteorError) => void){
        const user =  Meteor.user();
        const task = (this.getCollectionInstance()).findOne(_id)
        if(task.ownerId !== user?._id){
            throw new Meteor.Error("edit-error", "Somente o usuário criador pode editar a tarefa");
        }
        console.log(doc)
        this.callMethod("update", task, {$set: {...doc}}, (error: IMeteorError) => {
            if(error){
                callback(error)
            }
        });
    }

    toggleStatus(_id: string, status: TASK_STATUS){
        this.callMethod("update", _id, {$set: {status: status}});        
    }

    removeTask(_id: string){
        const user = Meteor.user();
        const task = this.getCollectionInstance().findOne(_id);
        if(task.ownerId !== user?._id){
            throw new Meteor.Error("remove-error", "Somente o usuário criador pode remover uma tarefa");
        }
        this.callMethod("remove", _id);
    }
}

export const toDosApi = new ToDosApi();