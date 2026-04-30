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

interface IToDosListControllerContext {
    tasks: IToDos[],
    handleClose: () => void,
    handleCreate: ()=>void,
    handleEdit: ()=>void,
    handleRemove: ()=>void,
    navigate: NavigateFunction,
    toggle: (task: IToDos, status: TASK_STATUS) => void,
    onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
    limparFiltro: () => void,
    selectTask: (e: React.MouseEvent<HTMLButtonElement>, task: IToDos)=>void,
    buttonDisabled: boolean,
    anchorMenu: HTMLButtonElement | null,

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
    const sysLayoutContext = useContext<IAppLayoutContext>(AppLayoutContext);
    const navigate = useNavigate()
    const [config, setConfig] = useState<IInitialConfig>(initialConfig);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [selectedTask, setSelectedTask] = useState<IToDos>();
    const [anchorMenu, setAnchorMenu] = useState<null | HTMLButtonElement>(null);

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

    const selectTask = (e: React.MouseEvent<HTMLButtonElement>, task: IToDos) => {
        setSelectedTask(task);
        setAnchorMenu(e.currentTarget);
    }

    const handleClose = () => {
        setSelectedTask(undefined);
        setAnchorMenu(null)
    }
    
    const handleEdit = () => {
        navigate(`/tasks/edit/${selectedTask?._id}`)
    }

    const handleRemove = () => {
        DeleteDialog({
            showDialog: sysLayoutContext.showDialog,
            closeDialog: sysLayoutContext.closeDialog,
            title: `Excluir dado ${selectedTask.title}`,
            message: `Tem certeza que deseja excluir o arquivo ${selectedTask.title}?`,
            onDeleteConfirm: () => {
                toDosApi.removeTask(selectedTask);
                sysLayoutContext.showNotification({
                    message: 'Excluído com sucesso!'
                })}
    })};

    return (
        <ToDosListControllerContext.Provider value={{tasks, handleClose, handleCreate, navigate, 
        toggle, onSearch, limparFiltro, buttonDisabled, selectTask, anchorMenu, handleEdit, handleRemove}}>
            <ToDosListView/>
        </ToDosListControllerContext.Provider>
    );
}

export default ToDosListController;