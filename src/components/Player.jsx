import React from 'react'
import { Grid, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import useGame from '../hooks/useGame';

const Player = ({ playerNumber }) => {

    const { handleChangePlayerName } = useGame();


    return (
        <>
            <Grid padding={5} container direction="column" alignItems="center" justifyContent="center">
                <Grid item lg={6} md={6} xs={12} >

                    <Typography sx={{ fontWeight: "600", color: 'white' }} align='center' marginY={5} variant="h4" component="div">Jugador #{playerNumber}</Typography>
                    <Typography sx={{ fontWeight: "600", color: 'white' }} align='center' marginY={5} variant="body1" component="div">Digita el nickname del jugador {playerNumber} para que empieces a jugar!!</Typography>
                    <TextField
                        id={`${playerNumber}`}
                        label={`Nickname Jugador ${playerNumber}`}
                        variant="standard"
                        sx={{ width: "100%" }}
                        onChange={({ target }) => handleChangePlayerName(target.id, target.value)} />

                </Grid>
            </Grid>
        </>
    )
}

export default Player