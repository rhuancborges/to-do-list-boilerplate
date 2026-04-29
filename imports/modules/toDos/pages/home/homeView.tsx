import React, { useContext } from "react";
import HomeStyles from "./homeStyles";
import { Button, List, ListItem, Typography, Box } from "@mui/material";
import { HomeControllerContext } from "./homeController";
import { ComplexTable } from "/imports/ui/components/ComplexTable/ComplexTable";
import { IToDos, toDosSchema } from "../../api/toDosSch";
import { useNavigate } from "react-router-dom";
import { TaskWidget } from "../../components/taskWidget";
import { getUser } from "/imports/libs/getUser";

const HomeView = () => {
    const controller = useContext(HomeControllerContext)
    const tasks = controller.lastTasks;
    const user = getUser()
    const navigate = useNavigate();
    const {Container, Header} = HomeStyles;

    const renderTasks = () => {
        if (tasks.length == 0){
            return <Typography>Não há tasks</Typography>
        }
        return tasks.map((task)=><TaskWidget task={task}/>);
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
                <List>{renderTasks()}</List>
            </Box>
            <Button onClick={()=>navigate("/tasks")}>{"Ir para Tarefas \>\>"}</Button>
        </Container>
    )
}

export default HomeView