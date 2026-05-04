import React, { useContext } from "react";
import ToDosDetailView from "./toDosDetailView";
import { IToDos, TASK_STATUS } from "../../api/toDosSch";
import { toDosApi, ISubmitProps } from "../../api/toDosApi";
import { useTracker } from "meteor/react-meteor-data";
import { SysLoading } from "/imports/ui/components/sysLoading/sysLoading";
import { ToDoModuleContext } from "../../toDosContainer";
import { ISchema } from "/imports/typings/ISchema";
import { useNavigate } from "react-router-dom";
import { IMeteorError } from "/imports/typings/IMeteorError";
import AppLayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";

interface IToDosDetailControllerContext {
    task: IToDos,
    schema: ISchema<IToDos>
    onClose: () => void,
    onEdit: () => void,
    submit: (doc: ISubmitProps) => void
}


export const ToDosDetailControllerContext = React.createContext<IToDosDetailControllerContext>({} as IToDosDetailControllerContext);

const ToDosDetailController = () => {
    const { id, state } = useContext(ToDoModuleContext);
    const {showNotification} = useContext<IAppLayoutContext>(AppLayoutContext);
    const navigate = useNavigate()
    const {isLoading, task} = useTracker(() => {
            const handle = toDosApi.subscribe("toDosDetail", {_id: id});
            const task = toDosApi.findOne({_id: id});
            return {
                task: task as IToDos, isLoading: !handle?.ready()
            }
        }, [id]);

    if (isLoading) return <SysLoading/>
    
    const handleClose = () => {
        navigate(-1)
    }

    const changeToEdit = () => {
        navigate(`/tasks/edit/${id}`)
    }

    const taskActions = {
        "insert": toDosApi.insertTask,
        "update": toDosApi.editTask
    }
    
    const submit = (doc: ISubmitProps) => {
        const method = state === "create" ? "insert" : "update";
        taskActions[method](id, doc, (e?: IMeteorError) => {
            if(!e){
                handleClose()
                showNotification({
                    type: "success",
                    title: "Operação realizada!",
                    message: `A tarefa foi ${method === 'insert' ? 'cadastrada' : 'atualizada'} com sucesso!`
                })
            } else {
                showNotification({
                    type: "error",
                    title: "Operação não realizada!",
                    message: `Erro ao realizar a operação: ${e.reason}`
                })
            }
        })
    }

    return (
        <ToDosDetailControllerContext.Provider value={{task, schema: toDosApi.getSchema(),
            onClose: handleClose, onEdit: changeToEdit, submit
        }}>
            <ToDosDetailView/>
        </ToDosDetailControllerContext.Provider>
    );
}

export default ToDosDetailController;