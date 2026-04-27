import { IDoc } from '../../../typings/IDoc';
import { ISchema } from '../../../typings/ISchema';

export interface IToDos extends IDoc {
    title: string,
    description: string,
    status: string,
    ownerId: string,
    ownerName: string,
    isPrivate: boolean,
    createdAt: Date,
    updatedAt: Date,
}

enum TASK_STATUS {
    CONCLUIDA = "Concluída",
    NÃO_CONCLUIDA = "Não Concluída"
}

export const toDosSchema: ISchema<IToDos> = {
    title: {
        type: String,
        label: "Nome da tarefa",
        defaultValue: "",
        optional: false
    },
    description: {
        type: String,
        label: "Descrição da tarefa",
        defaultValue: "",
        optional: true
    },
    status: {
        type: String,
        label: "Status da tarefa",
        defaultValue: TASK_STATUS.NÃO_CONCLUIDA,
        options: () => [
            { value: TASK_STATUS.NÃO_CONCLUIDA, label: TASK_STATUS.NÃO_CONCLUIDA },
            { value: TASK_STATUS.CONCLUIDA, label: TASK_STATUS.CONCLUIDA }
        ]
    },
    ownerId: {
        type: String,
        label: "Id do usuário criador",
        defaultValue: "",
        optional: false,
    },
    ownerName: {
        type: String,
        label: "Username do usuário criador",
        defaultValue: "",
        optional: false
    },
    isPrivate: {
        type: Boolean,
        label: "Tarefa pessoal",
        defaultValue: false,
        optional: false
    },
    createdAt: {
        type: Date,
        label: "Data de criação da tarefa",
    },
    updatedAt: {
        type: Date,
        label: "Data de atualização da tarefa"
    }

}