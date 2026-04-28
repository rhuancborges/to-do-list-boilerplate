import React, { useState } from "react";
import {Meteor} from "meteor/meteor";
import { ListItem, Typography, Box, ListItemAvatar, Stack } from "@mui/material";
import { IToDos } from "../api/toDosSch";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import materialSymbolsIcons, { MaterialSymbolsIconsNames } from "/imports/ui/components/sysIcon/materialSymbolsIcons";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useNavigate } from "react-router-dom";


export const TaskWidget = ({task}: {task: IToDos}) => {
    const [check, setCheck] = useState(false);
    const user = Meteor.user()
    const navigate = useNavigate();
    return(
        <ListItem key={task._id} sx={{"&:hover": {
            backgroundColor: "gray"}, display: "flex", 
        flexDirection: "row", justifyContent: "flex-start" }} secondaryAction={<SysIcon name="moreVert"/>}>
            {check ? <SysIcon name="checkCircle" sx={{"&:hover": {cursor: "pointer"}}}
            onClick={()=>setCheck(false)}/> : <RadioButtonUncheckedIcon sx={{"&:hover": {cursor: "pointer"}}}
            onClick={()=>setCheck(true)}/>}
            <Stack sx={{p: 1}}>
                <Typography sx={{textDecoration: check ? "line-through" : "none", 
                    "&:hover": {cursor: "pointer"}}} onClick={()=>navigate(`/tasks/view/${task._id}`)}>{task.title}</Typography>
                <Typography variant="caption">{`Criado por: ${task.ownerName == user?.username ? "Você" : task.ownerName}`}</Typography>
            </Stack>
        </ListItem>
    );
}