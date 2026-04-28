import { Recurso } from "./recursos";
import { IRoute } from "../../modulesTypings";
import toDosContainer from "../toDosContainer";
import homeContainer from "../homeContainer";


export const toDosRoutersList: (IRoute|null)[] = [
    {
		path: '/tasks',
		component: toDosContainer,
		isProtected: true,
		resources: [Recurso.TODOS_VIEW]
	},
	{
		path: '/tasks/:screenState/:exampleId',
		component: toDosContainer,
		isProtected: true,
		resources: [Recurso.TODOS_VIEW]
	},
	{
		path: '/tasks/:screenState',
		component: toDosContainer,
		isProtected: true,
		resources: [Recurso.TODOS_CREATE]
	},
	{
		path: "/",
		component: homeContainer,
		isProtected: true,
		resources: [Recurso.TODOS_VIEW]
	}
];