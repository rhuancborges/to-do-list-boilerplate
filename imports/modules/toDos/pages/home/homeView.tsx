import React, { useContext } from "react";
import HomeStyles from "./homeStyles";
import { Button, List, ListItem, Typography, Box } from "@mui/material";
import { HomeControllerContext } from "./homeController";
import { ComplexTable } from "/imports/ui/components/ComplexTable/ComplexTable";
import { IToDos, toDosSchema } from "../../api/toDosSch";

const HomeView = () => {
    const controller = useContext(HomeControllerContext)
    const tasks = controller.tasks;
   
    const {Container} = HomeStyles;

    return (
        <Container> 
                <List>
                {tasks.length==0 ? <Typography>Não há tasks</Typography> :
                tasks.map((task)=>{
                    return (
                        <ListItem key={task._id}>
                            <Typography>{task.title}</Typography>
                        </ListItem>
                    );
                })}
                </List>
            <Button onClick={controller.criar}>Criar</Button>
        </Container>
    )
}

export default HomeView