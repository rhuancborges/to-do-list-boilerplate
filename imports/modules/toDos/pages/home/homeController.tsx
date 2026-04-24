import React from "react";
import HomeView from "./homeView";

export interface IHomeControllerContext {
    teste?: string
}

const HomeControllerContext = React.createContext<IHomeControllerContext>({});

const HomeController = () => {
    
    return (
        <HomeControllerContext.Provider value={{teste: "Rhuan"}}>
            <HomeView/>
        </HomeControllerContext.Provider>
    );

}

export default HomeController;