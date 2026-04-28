import React, { useContext, useState } from "react";
import { ToDoModuleContext } from "../../toDosContainer";
import ToDosListView from "./toDosListView";
import { IToDos } from "../../api/toDosSch";
import { toDosApi } from "../../api/toDosApi";
import { useTracker } from "meteor/react-meteor-data";
import { SysLoading } from "/imports/ui/components/sysLoading/sysLoading";
import { TestContext } from "node:test";

interface IToDosListControllerContext {
    tasks: IToDos[]
}

export const ToDosListControllerContext = React.createContext<IToDosListControllerContext>({} as IToDosListControllerContext)

const ToDosListController = () => {
     const { id, state } = useContext(ToDoModuleContext);
        const {isLoading, tasks} = useTracker(() => {
                const handle = toDosApi.subscribe("toDosList");
                const tasks = toDosApi.find({}).fetch();
                return {
                    tasks: tasks as IToDos[], isLoading: !handle?.ready()
                }
            }, [id]);
    
        if (isLoading) return <SysLoading/>
    
    return (
        <ToDosListControllerContext.Provider value={{tasks}}>
            <ToDosListView/>
        </ToDosListControllerContext.Provider>
    );
}

export default ToDosListController;