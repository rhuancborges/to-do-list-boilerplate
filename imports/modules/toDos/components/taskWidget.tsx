import React, { useContext, useState } from "react";
import { ListItem, Typography, Box, ListItemAvatar, Stack } from "@mui/material";
import { IToDos, TASK_STATUS } from "../api/toDosSch";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import materialSymbolsIcons, { MaterialSymbolsIconsNames } from "/imports/ui/components/sysIcon/materialSymbolsIcons";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useNavigate } from "react-router-dom";
import { getUser } from "/imports/libs/getUser";
import { ToDosListControllerContext } from "../pages/toDosList/toDosListController";


export const TaskWidget = ({task}: {task: IToDos}) => {
    const controller = useContext(ToDosListControllerContext)
    const [check, setCheck] = useState(task.status == TASK_STATUS.CONCLUIDA);
    const user = getUser()
    
    const toggle = (status: boolean) => {
        setCheck(status)
        const statusProp = status ? TASK_STATUS.CONCLUIDA : TASK_STATUS.NÃO_CONCLUIDA
        controller.toggle(task, statusProp)
    }

    return(
        <ListItem key={task._id} sx={{"&:hover": {
            backgroundColor: "gray"}, display: "flex", 
        flexDirection: "row", justifyContent: "flex-start" }} secondaryAction={<SysIcon name="moreVert"/>}>
            {check ? <SysIcon name="checkCircle" sx={{"&:hover": {cursor: "pointer"}}}
            onClick={()=>toggle(false)}/> : <RadioButtonUncheckedIcon sx={{"&:hover": {cursor: "pointer"}}}
            onClick={()=>toggle(true)}/>}
            <Stack sx={{p: 1}}>
                <Typography sx={{textDecoration: check ? "line-through" : "none", 
                    "&:hover": {cursor: "pointer"}}} onClick={()=>controller.navigate(`/tasks/view/${task._id}`)}>{task.title}</Typography>
                <Typography variant="caption">{`Criado por: ${task.ownerName == user.username ? "Você" : task.ownerName}`}</Typography>
            </Stack>
        </ListItem>
    );
}