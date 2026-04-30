import React, { useContext } from "react";
import { Button, Box, List, Accordion, 
    AccordionSummary, AccordionDetails, ListItem, 
    Typography, Menu, MenuItem} from "@mui/material";
import { ComplexTable } from "/imports/ui/components/ComplexTable/ComplexTable";
import { exampleSch } from "/imports/modules/example/api/exampleSch";
import { ToDosListControllerContext } from "./toDosListController";
import { TaskWidget } from "../../components/taskWidget";
import { SysAccordion } from "/imports/ui/components/sysAccordion/sysAccordion";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import ToDosListStyles from "./toDosListStyles";
import SysTextField from "/imports/ui/components/sysFormFields/sysTextField/sysTextField";
import { SysButton } from "/imports/ui/components/SimpleFormFields/SysButton/SysButton";
import { TASK_STATUS } from "../../api/toDosSch";
import ExpandMore from '@mui/icons-material/ExpandMore';
import AppLayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";
import DeleteDialog from "/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog";
import { TaskWidgetController } from "../../components/taskWidgetController";

const ToDosListView = () => {
    const controller = useContext(ToDosListControllerContext);
    

    const {Container, SearchContainer} = ToDosListStyles
   
    return (
        <Container>
            <Box sx={{width: "100%", display: "flex", 
                flexDirection: "column", alignItems: "center"}}>
                <SearchContainer sx={{marginBottom: "10px"}}>
                    <SysTextField
                        name="search"
                        placeholder="Pesquisar por nome"
                        onChange={controller.onSearch}
                        startAdornment={<SysIcon name={'search'} />}
                    />
                    <Button size="small" variant="outlined" disabled={controller.buttonDisabled} 
                    onClick={controller.limparFiltro}>Mostrar todas</Button>
                </SearchContainer>
                <Accordion defaultExpanded={true} sx={{width: "100%"}}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>Não concluídas</AccordionSummary>
                    <AccordionDetails>
                        <List sx={{width: "100%", marginBottom: "1%"}}>
                          {controller.tasks.map((task) => {
                                if (task.status == TASK_STATUS.NÃO_CONCLUIDA) return <TaskWidgetController task={task}/>
                            })}
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded={true} sx={{width: "100%"}}>
                    <AccordionSummary expandIcon={<ExpandMore/>}>Concluídas</AccordionSummary>
                    <AccordionDetails>
                        <List sx={{width: "100%", marginBottom: "1%"}}>
                            {controller.tasks.map((task) => {
                                if (task.status == TASK_STATUS.CONCLUIDA) return <TaskWidgetController task={task}/>
                            })}
                        </List>
                    </AccordionDetails>
                </Accordion>
               
                <Button sx={{marginTop: "10px"}} onClick={controller.handleCreate}>Adicionar tarefa +</Button>
           </Box>
        </Container>
    );
};

export default ToDosListView;