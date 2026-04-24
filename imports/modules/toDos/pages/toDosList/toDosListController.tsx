import React, { useMemo } from "react"
import ToDosListView from "./toDosListView";


interface IToDosListControllerContext {
    teste?: string
}

const ToDosListControllerContext = React.createContext<IToDosListControllerContext>({})

const ToDosListController = () => {

    const providerValues: IToDosListControllerContext = useMemo(
            () => ({
              teste: "rhuan"
            }),
            []
        );
    return (
        <ToDosListControllerContext.Provider value={providerValues}>
            <ToDosListView/>
        </ToDosListControllerContext.Provider>
    );
}

export default ToDosListController;