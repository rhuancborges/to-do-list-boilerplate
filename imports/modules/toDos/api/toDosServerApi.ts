import { getUserServer } from "../../userprofile/api/userProfileServerApi";
import { Recurso } from "../config/recursos";
import { IToDos, toDosSchema } from "./toDosSch";
import { ProductServerBase } from "/imports/api/productServerBase";
import { Meteor } from "meteor/meteor";
import { IMeteorError } from "/imports/typings/IMeteorError";
import { IContext } from "/imports/typings/IContext";

class ToDosServerApi extends ProductServerBase<IToDos> {
    constructor(){
        super("toDos", toDosSchema, {
            resources: Recurso
        });
        this.toDosUpdate = this.toDosUpdate.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);
        this.toDosRemove = this.toDosRemove.bind(this);
        this.registerMethod("removeTask", this.toDosRemove);
        this.registerMethod("toggleStatus", this.toggleStatus);
        this.registerMethod("updateTask", this.toDosUpdate)
        
       

        this.addPublication("toDosList", async () => {
            const user = await getUserServer();
            const filter = {$or: [
                            { isPrivate: false },
                            { isPrivate: true, ownerId: user._id}]}
            return this.defaultListCollectionPublication(filter, {
                projection: {
                    title: 1,
                    description: 1,
                    ownerName: 1,
                    isPrivate: 1,
                    status: 1,
                    ownerId: 1
                }})
        });

        this.addPublication("toDosDetail", (filter = {}) => {
            return this.defaultDetailCollectionPublication(filter, {
                projection: {
                    title: 1,
                    description: 1,
                    status: 1,
                    isPrivate: 1,
                    ownerName: 1,
                    ownerId: 1
                }
            })
        })

        this.addPublication("toDosLasts", async ()=>{
            const user = await getUserServer();
            const filter = {$or: [
                            { isPrivate: false },
                            { isPrivate: true, ownerId: user._id}]};
            return this.defaultListCollectionPublication(filter, {
                projection: {
                    title: 1,
                    description: 1,
                    ownerName: 1,
                    status: 1,
                    createdat: 1,
                    ownerId: 1,
                    isPrivate: 1
                },
                limit: 5,
                sort: {createdat: -1}})
        })
    }

    toDosRemove(task: IToDos, _context: IContext){
        const user = getUserServer();
        if(task.ownerId !== user?._id){
            throw new Meteor.Error("remove-error", "Somente o usuário criador pode remover a tarefa");
        }
        this.serverRemove(task, _context);
    }

    async toDosUpdate(task: IToDos, _context: IContext){
        const user = await getUserServer();
        console.log("Updating task:", task)
        console.log("User trying to update:", user)
        if(task.ownerId !== user?._id){
            throw new Meteor.Error("edit-error", "Somente o usuário criador pode editar a tarefa");
        }
        await this.serverUpdate(task, _context);
    }
    async toggleStatus(task: IToDos, _context: IContext){
        await this.serverUpdate(task, _context);
    }
}

export const toDosServerApi = new ToDosServerApi();