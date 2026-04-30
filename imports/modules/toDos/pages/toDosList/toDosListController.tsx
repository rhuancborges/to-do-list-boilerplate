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

interface IToDosListControllerContext {
    filtraTasks: (stauts: TASK_STATUS) => (React.JSX.Element | undefined)[] | null,
    handleCreate: ()=>void
    navigate: NavigateFunction,
    toggle: (task: IToDos, status: TASK_STATUS) => void
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    limparFiltro: () => void;
    buttonDisabled: boolean,
}

export const ToDosListControllerContext = React.createContext<IToDosListControllerContext>({} as IToDosListControllerContext)

interface IInitialConfig {
    sortProperties: {field: string, sortAscending: boolean}
    filter: Object
}

const initialConfig = {
    sortProperties: {field: "createdat", sortAscending: true},
    filter: {}
}

const ToDosListController = () => {
    const { id, state } = useContext(ToDoModuleContext);
    const navigate = useNavigate()
    const [config, setConfig] = useState<IInitialConfig>(initialConfig);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const {sortProperties, filter} = config
    const sort = {
        [sortProperties.field]: sortProperties.sortAscending ? 1 : -1
    }

    const {isLoading, tasks} = useTracker(() => {
            const handle = toDosApi.subscribe("toDosList", filter, {sort});
            const tasks = toDosApi.find(filter, {sort}).fetch();
            return {
                tasks: tasks as IToDos[], isLoading: !handle?.ready()
            }
        }, [config]);

    if (isLoading) return <SysLoading/>
    
    const handleCreate = () => {
        navigate("/tasks/create")
    }

    const toggle = (task: IToDos, status: TASK_STATUS) => {
        toDosApi.toggleStatus(task, status)
    }

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = setTimeout(() => {
            setConfig((prev) => ({
                ...prev,
                filter: {
                    ...prev.filter,
                    title: {$regex: event.target.value.trim(), $options: 'i'}
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

    const filtraTasks = (status: TASK_STATUS) => {
        const vetor = tasks.map((task) => {
            if (task.status == status) return <TaskWidget key={task._id} task={task}/>
        })

        if (vetor.length == 0) return null 
        return vetor;
    }
    

    return (
        <ToDosListControllerContext.Provider value={{filtraTasks, handleCreate, navigate, 
        toggle, onSearch, limparFiltro, buttonDisabled}}>
            <ToDosListView/>
        </ToDosListControllerContext.Provider>
    );
}

export default ToDosListController;