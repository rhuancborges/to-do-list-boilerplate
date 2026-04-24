import { IAppMenu, IModuleHub, IRoute } from './modulesTypings';
import Aniversario from './aniversario/config';
import UserProfile from './userprofile/config';
import ToDos from './toDos/config';
import Example from './example/config';
import { pagesRouterList } from '../sysPages/config/pagesrouters';

const pages: Array<IRoute | null> = [
	...UserProfile.pagesRouterList,
	...ToDos.pagesRouterList,
	pagesRouterList[0]
	
];

const menuItens: Array<IAppMenu | null> = [
	...ToDos.pagesMenuItemList,
	...UserProfile.pagesMenuItemList,
	
];

const Modules: IModuleHub = {
	pagesMenuItemList: menuItens,
	pagesRouterList: pages
};

export default Modules;
