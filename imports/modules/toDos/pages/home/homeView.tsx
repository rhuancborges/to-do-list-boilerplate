import React from "react";
import HomeStyles from "./homeStyles";
import { Typography } from "@mui/material";

const HomeView = () => {
    const {Container} = HomeStyles;
    return (
        <Container>
            <Typography>Helores</Typography>
        </Container>
    )
}

export default HomeView