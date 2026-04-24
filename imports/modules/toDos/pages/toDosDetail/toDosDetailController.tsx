import React from "react";
import ToDosDetailView from "./toDosDetailView";

interface IToDosDetailControllerContext {
    teste?: string
}

export const ToDosDetailControllerContext = React.createContext<IToDosDetailControllerContext>({});

const ToDosDetailController = () => {

    
    return (
        <ToDosDetailControllerContext.Provider value={{
            teste: "rhuan"
        }}>
            <ToDosDetailView/>
        </ToDosDetailControllerContext.Provider>
    );
}

export default ToDosDetailController;