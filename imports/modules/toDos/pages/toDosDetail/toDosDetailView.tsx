import React, { useContext, useState } from "react";
import { Button, Chip, Container, Dialog, FormControl } from "@mui/material";
import SysForm from "/imports/ui/components/sysForm/sysForm";
import { toDosSchema } from "../../api/toDosSch";
import { ToDoModuleContext } from "../../toDosContainer";
import ToDosDetailStyles from "./toDosDetailStyles";
import SysTextField from "/imports/ui/components/sysFormFields/sysTextField/sysTextField";
import { ToDosDetailControllerContext } from "./toDosDetailController";
import SysSwitch from "/imports/ui/components/sysFormFields/sysSwitch/sysSwitch";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";



const ToDosDetailView = () => {
    const controller = useContext(ToDosDetailControllerContext);
    const {state, id} = useContext(ToDoModuleContext);
    const {Container, Body, FormColumn, Header} = ToDosDetailStyles;
    const isView = state === "view";
    const isCreate = state === "create";
    const isEdit = state === "edit"
    return (
        <Container>
                <Header>
                    {isCreate ? "Adicionar Item" : isEdit ? "Editar Item" : controller.task.title}
                    {isView ? <SysIcon name="edit"/> : <SysIcon name="close"/>}
                </Header>
                <SysForm
                mode={state as "view" | "create" | "edit"} 
                schema={controller.schema}
                doc={controller.task}>
                <Body>
                    <FormColumn>
                        <SysTextField name="title"/>
                        <SysTextField name="description"/>
                        <SysSwitch name="isPrivate"/>
                        <Button>Salvar</Button>
                    </FormColumn>
                </Body> 
                </SysForm>
        </Container>
    );
}

export default ToDosDetailView;