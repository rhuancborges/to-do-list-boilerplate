import React, { useContext } from "react";
import { Button, Box, List} from "@mui/material";
import { ComplexTable } from "/imports/ui/components/ComplexTable/ComplexTable";
import { exampleSch } from "/imports/modules/example/api/exampleSch";
import { ToDosListControllerContext } from "./toDosListController";
import { TaskWidget } from "../../components/taskWidget";
import { SysAccordion } from "/imports/ui/components/sysAccordion/sysAccordion";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import ToDosListStyles from "./toDosListStyles";


const ToDosListView = () => {
    const controller = useContext(ToDosListControllerContext);

    const {Container} = ToDosListStyles
   
    return (
        <Container>
            <Box sx={{width: "100%", display: "flex", 
                flexDirection: "column", alignItems: "center"}}>
                <List sx={{width: "100%", marginBottom: "1%"}}>
                        {controller.tasks.map((task) => {
                            return <TaskWidget key={task._id} task={task}/>
                        })}
                </List>
                <Button onClick={controller.handleCreate}>Adicionar tarefa +</Button>
           </Box>
        </Container>
    );
};

export default ToDosListView;