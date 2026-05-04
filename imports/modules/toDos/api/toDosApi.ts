import { Meteor } from "meteor/meteor";
import { IToDos, TASK_STATUS, toDosSchema } from "./toDosSch";
import { ProductBase } from "/imports/api/productBase";
import { IMeteorError } from "/imports/typings/IMeteorError";
import { getUser } from "/imports/libs/getUser";

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

    editTask(_id: string, doc: ISubmitProps, callback: (e?: IMeteorError) => void){        
        this.callMethod("updateTask", doc, (error: IMeteorError) => {
            if(error){
                callback(error)
            }
        });
        callback();
    }

    toggleStatus(task: IToDos, status: TASK_STATUS){
        const doc = {
            ...task,
            status: status
        }
        this.callMethod("toggleStatus", doc);        
    }

    removeTask(task: IToDos, callback: (e?: IMeteorError) => void){
        this.callMethod("removeTask", task, (error: IMeteorError) => {
            if(error){
                callback(error)
            }
        });
        callback();    
}
}

export const toDosApi = new ToDosApi();