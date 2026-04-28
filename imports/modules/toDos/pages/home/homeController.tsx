import React from "react";
import HomeView from "./homeView";
import {Meteor} from "meteor/meteor"
import { toDosApi } from "../../api/toDosApi";
import { IToDos } from "../../api/toDosSch";
import { todo } from "node:test";
import { SysLoading } from "/imports/ui/components/sysLoading/sysLoading";
import { useTracker } from "meteor/react-meteor-data";

export interface IHomeControllerContext {
    tasks: Array<IToDos>
    criar: () => void;
}

export const HomeControllerContext = React.createContext<IHomeControllerContext>({} as IHomeControllerContext);

const user = Meteor.user();

const HomeController = () => {
    const {loading, tasks} = useTracker(() => {
        const handle = toDosApi.subscribe("toDosList");
        const tasks = toDosApi.find({}).fetch();
        console.log(tasks);
        return {
            tasks, loading: !handle?.ready()
        }
    }, []);

    const criar = () => {
        toDosApi.insertTask({
            title: "Tarefa teste",
            description: "Essa é uma tarefa de teste",
            isPrivate: false
        });
    }
    if (loading) return <SysLoading/>

    return (
        <HomeControllerContext.Provider value={{tasks, criar}}>
            <HomeView/>
        </HomeControllerContext.Provider>
    );

}

export default HomeController;