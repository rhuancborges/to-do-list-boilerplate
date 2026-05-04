import { getUserServer } from "../../userprofile/api/userProfileServerApi";
import { Recurso } from "../config/recursos";
import { IToDos, toDosSchema } from "./toDosSch";
import { ProductServerBase } from "/imports/api/productServerBase";

class ToDosServerApi extends ProductServerBase<IToDos> {
    constructor(){
        super("toDos", toDosSchema, {
            resources: Recurso
        });

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
}

export const toDosServerApi = new ToDosServerApi();