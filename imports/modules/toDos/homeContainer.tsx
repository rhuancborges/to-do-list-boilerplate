import React from "react";
import { IDefaultContainerProps } from '../../typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';
import HomeController from "./pages/home/homeController";
 

export interface IHomeModuleContext {
    state?: string,
    id?: string
};

export const HomeModuleContext = React.createContext<IHomeModuleContext>({});

export default (props: IDefaultContainerProps) => {
    let {screenState, exampleId} = useParams();
    const state = screenState ?? props.screenState;
    const id = exampleId ?? props.id;


    const providerValue = {
        state,
        id
    }

    return (
    <HomeModuleContext.Provider value={providerValue}>
        <HomeController/>
    </HomeModuleContext.Provider>);
};