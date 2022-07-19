import React from 'react'
import GamePlayer from '../components/GamePlayer'
import { Button, Grid, Stack } from '@mui/material';
import { Link } from "react-router-dom";

const Game = () => {
    return (
        <>
            <Stack spacing={2} direction="row">
                <Button variant="contained" color="success" size="large">Jugar</Button>
                <Button variant="outlined" color="primary" size="large">
                    <Link to="/">
                        Terminar
                    </Link>
                </Button>
            </Stack>
            <Grid container justifyContent="center" spacing={1}>
                <Grid item lg={6} md={6} sm={12}>
                    <GamePlayer key="gamePlayer1" />
                </Grid>
                <Grid item lg={6} md={6} sm={12}>
                    <GamePlayer key="gamePlayer2" />
                </Grid>
            </Grid>
        </>
    )
}

export default Game