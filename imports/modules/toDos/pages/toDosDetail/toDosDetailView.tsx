import React, { useContext, useState } from "react";
import { Button, Chip, Container, Dialog, FormControl, Typography } from "@mui/material";
import SysForm from "/imports/ui/components/sysForm/sysForm";
import { toDosSchema } from "../../api/toDosSch";
import { ToDoModuleContext } from "../../toDosContainer";
import ToDosDetailStyles from "./toDosDetailStyles";
import SysTextField from "/imports/ui/components/sysFormFields/sysTextField/sysTextField";
import { ToDosDetailControllerContext } from "./toDosDetailController";
import SysSwitch from "/imports/ui/components/sysFormFields/sysSwitch/sysSwitch";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import SysFormButton from "/imports/ui/components/sysFormFields/sysFormButton/sysFormButton";
import {Meteor} from "meteor/meteor"


const ToDosDetailView = () => {
    const controller = useContext(ToDosDetailControllerContext);
    const {state, id} = useContext(ToDoModuleContext);
    const {Container, Body, FormColumn, Header, Footer} = ToDosDetailStyles;
    const isView = state === "view";
    const isCreate = state === "create";
    const isEdit = state === "edit"
    return (
        <Container>
                <Header>
                    {isView && <SysIcon sx={{"&:hover": {cursor: "pointer"}}} 
                    onClick={controller.onClose} name="close"/>}
                    {isCreate ? "Adicionar Item" : isEdit ? "Editar Item" : controller.task.title}
                    {isView ? <SysIcon sx={{"&:hover": {cursor: "pointer"}}} 
                    onClick={controller.onEdit} name="edit"/> : <SysIcon sx={{"&:hover": {cursor: "pointer"}}} 
                    onClick={controller.onClose} name="close"/>}
                </Header>
                <SysForm
                mode={state as "view" | "create" | "edit"} 
                schema={controller.schema}
                doc={controller.task}
                onSubmit={controller.submit}>
                <Body>
                    <FormColumn>
                        <SysTextField name="title"/>
                        <SysTextField name="description"/>
                        <SysSwitch name="isPrivate"/>
                    </FormColumn>
                </Body> 
                <Footer>
                    <SysFormButton disabled={false}>Salvar</SysFormButton>
                </Footer>
                </SysForm>
        </Container>
    );
}

export default ToDosDetailView;