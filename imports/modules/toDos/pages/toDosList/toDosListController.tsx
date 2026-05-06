import React, { useContext, useState } from "react";
import { ToDoModuleContext } from "../../toDosContainer";
import ToDosListView from "./toDosListView";
import { IToDos, TASK_STATUS } from "../../api/toDosSch";
import { toDosApi } from "../../api/toDosApi";
import { useTracker } from "meteor/react-meteor-data";
import { SysLoading } from "/imports/ui/components/sysLoading/sysLoading";
import { TestContext } from "node:test";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { filter } from "lodash";
import { TaskWidget } from "../../components/taskWidget";
import DeleteDialog from "/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog";
import { ShowDialog } from "/imports/ui/appComponents/showDialog/showDialog";
import AppLayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";
import { getUser } from "/imports/libs/getUser";

interface IToDosListControllerContext {
    tasks: IToDos[],
    handleCreate: ()=>void,
    navigate: NavigateFunction,
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
    limparFiltro: () => void,
    buttonDisabled: boolean,
}

export const ToDosListControllerContext = React.createContext<IToDosListControllerContext>({} as IToDosListControllerContext)

interface IInitialConfig {
    sortProperties: {field: string, sortAscending: boolean}
    filter: {$and: any[]}
}

const initialConfig = {
    sortProperties: {field: "createdat", sortAscending: true},
    filter: {$and: []}
}

const ToDosListController = () => {
    const { id, state } = useContext(ToDoModuleContext);
    const sysLayoutContext = useContext<IAppLayoutContext>(AppLayoutContext);
    const navigate = useNavigate()
    const [config, setConfig] = useState<IInitialConfig>(initialConfig);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [selectedTask, setSelectedTask] = useState<IToDos>();
   

    const {sortProperties, filter} = config
    const sort = {
        [sortProperties.field]: sortProperties.sortAscending ? 1 : -1
    }

    const {isLoading, tasks} = useTracker(() => {
            const handle = toDosApi.subscribe("toDosList", filter);
            const tasks = toDosApi.find({}, {sort}).fetch();
            return {
                tasks: tasks as IToDos[], isLoading: !handle?.ready()
            }
        }, [config]);

    if (isLoading) return <SysLoading/>
    
    const handleCreate = () => {
        navigate("/tasks/create")
    }    

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = setTimeout(() => {
            setConfig((prev) => ({
                ...prev,
                filter: {
                   $and: [
                    {title: {$regex: event.target.value.trim(), $options: 'i'}}
                   ]
                }
            }))
            setButtonDisabled(false);
        }, 1000)
        return () => clearTimeout(search)
    }

    const limparFiltro = () => {
        setConfig(initialConfig);
        setButtonDisabled(true)
    }


    return (
        <ToDosListControllerContext.Provider value={{tasks, handleCreate, navigate, 
        onSearch, limparFiltro, buttonDisabled}}>
            <ToDosListView/>
        </ToDosListControllerContext.Provider>
    );
}

export default ToDosListController;