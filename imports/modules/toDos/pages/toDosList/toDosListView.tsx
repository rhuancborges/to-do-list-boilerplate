import React, { useContext } from "react";
import { Chip, Container, Typography, List} from "@mui/material";
import { ComplexTable } from "/imports/ui/components/ComplexTable/ComplexTable";
import { exampleSch } from "/imports/modules/example/api/exampleSch";
import { ToDosListControllerContext } from "./toDosListController";
import { TaskWidget } from "../../components/taskWidget";
import { SysAccordion } from "/imports/ui/components/sysAccordion/sysAccordion";


const ToDosListView = () => {
    const controller = useContext(ToDosListControllerContext);

   
    return (
        <Container>
        
           <List>
                {controller.tasks.map((task) => {
                    return <TaskWidget task={task}/>
                })}
           </List>
        </Container>
    );
};

export default ToDosListView;