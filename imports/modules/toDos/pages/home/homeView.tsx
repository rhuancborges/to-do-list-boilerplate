import React, { useContext } from "react";
import {Meteor} from "meteor/meteor"
import HomeStyles from "./homeStyles";
import { Button, List, ListItem, Typography, Box } from "@mui/material";
import { HomeControllerContext } from "./homeController";
import { ComplexTable } from "/imports/ui/components/ComplexTable/ComplexTable";
import { IToDos, toDosSchema } from "../../api/toDosSch";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
    const controller = useContext(HomeControllerContext)
    const tasks = controller.tasks;
    const user = Meteor.user();
    const navigate = useNavigate();
    const {Container, Header} = HomeStyles;

    const renderTasks = () => {
        if (tasks.length == 0){
            return <Typography>Não há tasks</Typography>
        }
        return tasks.map((task)=>{
                    return (
                        <ListItem key={task._id}>
                            <Typography>{task.title}</Typography>
                        </ListItem>
                    );
                })
    }

    return (
        <Container> 
            <Header>
                <Typography variant="h1">{`Olá, ${user.username}!`}</Typography>
                <Typography>Seus projetos muito mais organizados. Veja as tarefas
                    adicionadas pelo seu time por você e para você!
                </Typography>
            </Header>
            <Box sx={{width: "100%"}}>
                <Typography sx={{fontWeight: "bold"}}>Adicionadas recentemente</Typography>
                <List></List>
            </Box>
            <Button onClick={()=>navigate("/tasks")}>{"Ir para Tarefas \>\>"}</Button>
        </Container>
    )
}

export default HomeView