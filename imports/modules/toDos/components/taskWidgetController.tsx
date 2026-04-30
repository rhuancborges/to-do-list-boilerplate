import React, { createContext, useContext, useState } from "react"
import { TaskWidget } from "./taskWidget";
import { IToDos, TASK_STATUS } from "../api/toDosSch";
import { toDosApi } from "../api/toDosApi";
import { NavigateFunction, useNavigate } from "react-router-dom";
import DeleteDialog from "/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog";
import AppLayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";

interface ITaskWidgetControllerContext {
    task: IToDos,
    check: boolean,
    anchorMenu: null | HTMLButtonElement,
    navigate: NavigateFunction,
    toggle: (status: boolean) => void,
    openMenu: (e: React.MouseEvent<HTMLButtonElement>) => void,
    handleClose: () => void,
    handleEdit: () => void,
    handleRemove: ()=>void
}

export const TaskWidgetControllerContext = createContext<ITaskWidgetControllerContext>({} as ITaskWidgetControllerContext);

export const TaskWidgetController = ({task}:{task: IToDos}) => {
    const layoutContext = useContext<IAppLayoutContext>(AppLayoutContext);
    const [check, setCheck] = useState(task.status == TASK_STATUS.CONCLUIDA);
    const [anchorMenu, setAnchorMenu] = useState<null | HTMLButtonElement>(null);
    const navigate = useNavigate();
    const taskFoward = task
    
    const toggle = (concluida: boolean) => {
        setCheck(concluida)
        const statusProp = concluida ? TASK_STATUS.CONCLUIDA : TASK_STATUS.NÃO_CONCLUIDA
        toDosApi.toggleStatus(task, statusProp)
    }

    const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorMenu(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorMenu(null);
    }

    const handleEdit = () => {
        navigate(`/tasks/edit/${task._id}`)
    }

    const handleRemove = () => {
        DeleteDialog({
            showDialog: layoutContext.showDialog,
            closeDialog: layoutContext.closeDialog,
            title: `Excluir dado ${task.title}`,
            message: `Tem certeza que deseja excluir a tarefa ${task.title}?`,
            onDeleteConfirm: () => {
                toDosApi.removeTask(task),
                layoutContext.showNotification({
                    message: "Tarefa excluída com sucesso",
                    type: "success"
                })
            }
        })
    }

    return (
        <TaskWidgetControllerContext.Provider value={{task: taskFoward, navigate, toggle, check, 
        anchorMenu, openMenu, handleClose, handleEdit, handleRemove}}>
            <TaskWidget/>
        </TaskWidgetControllerContext.Provider>
    )
}