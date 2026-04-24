import { IModuleHub } from "../../modulesTypings";
import { toDosRoutersList } from "./toDosRouters";
import { toDosAppMenu} from "./toDosAppMenu";


const ToDos: IModuleHub = {
    pagesMenuItemList: toDosAppMenu,
    pagesRouterList: toDosRoutersList
};

export default ToDos;