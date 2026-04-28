import React, { useContext } from "react";
import ToDosDetailView from "./toDosDetailView";
import { IToDos } from "../../api/toDosSch";
import { toDosApi } from "../../api/toDosApi";
import { useTracker } from "meteor/react-meteor-data";
import { SysLoading } from "/imports/ui/components/sysLoading/sysLoading";
import { ToDoModuleContext } from "../../toDosContainer";
import { ISchema } from "/imports/typings/ISchema";

interface IToDosDetailControllerContext {
    task: IToDos,
    schema: ISchema<IToDos>
}

export const ToDosDetailControllerContext = React.createContext<IToDosDetailControllerContext>({} as IToDosDetailControllerContext);

const ToDosDetailController = () => {
    const { id, state } = useContext(ToDoModuleContext);
    const {isLoading, task} = useTracker(() => {
            const handle = toDosApi.subscribe("toDosDetail", {_id: id});
            const task = toDosApi.findOne({_id: id});
            return {
                task: task as IToDos, isLoading: !handle?.ready()
            }
        }, [id]);

    if (isLoading) return <SysLoading/>
    
    return (
        <ToDosDetailControllerContext.Provider value={{task, schema: toDosApi.getSchema()
        }}>
            <ToDosDetailView/>
        </ToDosDetailControllerContext.Provider>
    );
}

export default ToDosDetailController;