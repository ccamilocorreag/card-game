import React from 'react'
import { Box, Grid, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

const Player = ({ playerNumber }) => {
    return (
        <>
            <Grid sx={{ border: 1, borderStyle: "dashed" }} padding={5} container direction="column" alignItems="center" justifyContent="center">
                <Grid item lg={6} md={6} xs={12} >

                    <Typography sx={{ fontWeight: "600" }} align='center' marginY={5} variant="h4" component="div">Jugador #{playerNumber}</Typography>
                    <Typography sx={{ fontWeight: "600" }} align='center' marginY={5} variant="body1" component="div">Digita el nickname del jugador {playerNumber} para que empieces a jugar!!</Typography>
                    <TextField id={`playerName${playerNumber}`} label={`Nickname Jugador ${playerNumber}`} variant="standard" required sx={{ width: "100%" }} />

                </Grid>
            </Grid>
        </>
    )
}

export default Player