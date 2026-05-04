import React from "react";
import HomeView from "./homeView";
import {Meteor} from "meteor/meteor"
import { toDosApi } from "../../api/toDosApi";
import { IToDos } from "../../api/toDosSch";
import { todo } from "node:test";
import { SysLoading } from "/imports/ui/components/sysLoading/sysLoading";
import { useTracker } from "meteor/react-meteor-data";
import { getUser } from "/imports/libs/getUser";

export interface IHomeControllerContext {
    lastTasks: Array<IToDos>
    criar: () => void;
}

export const HomeControllerContext = React.createContext<IHomeControllerContext>({} as IHomeControllerContext);


const HomeController = () => {

     const {isLoading, lastTasks} = useTracker(() => {
        const handle = toDosApi.subscribe("toDosLasts");
        const tasks = toDosApi.find({}, {limit:5, sort: {createdat: -1}}).fetch();
        console.log(tasks);
        return {
            lastTasks: tasks, isLoading: !handle?.ready()
        }
    }, []);

    const criar = () => {
        toDosApi.insertTask({
            title: "Tarefa teste",
            description: "Essa é uma tarefa de teste",
            isPrivate: false
        });
    }
    if (isLoading) return <SysLoading/>

    return (
        <HomeControllerContext.Provider value={{criar, lastTasks}}>
            <HomeView/>
        </HomeControllerContext.Provider>
    );

}

export default HomeController;