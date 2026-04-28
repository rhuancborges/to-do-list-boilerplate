import React from "react";
import { IDefaultContainerProps } from '../../typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';
import ToDosListController from "./pages/toDosList/toDosListController";
import ToDosDetailController from "./pages/toDosDetail/toDosDetailController";


export interface IToDoModuleContext {
    state: string,
    id: string
};

export const ToDoModuleContext = React.createContext<IToDoModuleContext>({} as IToDoModuleContext);

export default (props: IDefaultContainerProps) => {
    let {screenState, exampleId} = useParams();
    const state = screenState ?? props.screenState;
    const id = exampleId ?? props.id;

    const validState = ["view", "create", "edit"]; // Estados de popup

    const renderPage = () => {
        if (!!!state || !validState.includes(state)) return <ToDosListController/>; //Mostro da lista geral 
        return <ToDosDetailController/>; //Mostro o detalhe
    }

    const providerValue = {
        state,
        id
    }

    return <ToDoModuleContext.Provider value={providerValue}>{renderPage()}</ToDoModuleContext.Provider>;
};