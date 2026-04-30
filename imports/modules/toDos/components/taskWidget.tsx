import React, { useContext, useState } from "react";
import { ListItem, Typography, Box, 
    MenuItem, Menu, ListItemAvatar, Stack, IconButton } from "@mui/material";
import { IToDos, TASK_STATUS } from "../api/toDosSch";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import materialSymbolsIcons, { MaterialSymbolsIconsNames } from "/imports/ui/components/sysIcon/materialSymbolsIcons";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useNavigate } from "react-router-dom";
import { getUser } from "/imports/libs/getUser";
import { ToDosListControllerContext } from "../pages/toDosList/toDosListController";
import { TaskWidgetControllerContext } from "./taskWidgetController";


export const TaskWidget = () => {
    const controller = useContext(TaskWidgetControllerContext);
    const task = controller.task
    console.log(task)
   
    const user = getUser()
    
    return(
        <ListItem key={task._id} sx={{"&:hover": {
            backgroundColor: "gray"}, display: "flex", 
        flexDirection: "row", justifyContent: "flex-start" }} 
        secondaryAction={<IconButton onClick={(e) => controller.openMenu(e)} sx={{"&:hover": {cursor: "pointer"}}}><SysIcon name="moreVert"/></IconButton> }>
            {controller.check ? <SysIcon name="checkCircle" sx={{"&:hover": {cursor: "pointer"}}}
            onClick={()=>controller.toggle(false)}/> : <RadioButtonUncheckedIcon sx={{"&:hover": {cursor: "pointer"}}}
            onClick={()=>controller.toggle(true)}/>}
            <Stack sx={{p: 1}}>
                <Typography sx={{textDecoration: controller.check ? "line-through" : "none", 
                    "&:hover": {cursor: "pointer"}}} onClick={()=>controller.navigate(`/tasks/view/${task._id}`)}>{task.title}</Typography>
                <Typography variant="caption">{`Criado por: ${task.ownerName == user.username ? "Você" : task.ownerName}`}</Typography>
            </Stack>
             <Menu onClose={controller.handleClose} open={Boolean(controller.anchorMenu)}
                            anchorEl={controller.anchorMenu}>
                <MenuItem onClick={controller.handleEdit}>Editar tarefa</MenuItem>
                <MenuItem onClick={controller.handleRemove}>Remover Tarefa</MenuItem>
            </Menu>
        </ListItem>
    );
}