import React from 'react'
import GamePlayer from '../components/GamePlayer'
import { Box, Button, Grid, Typography } from '@mui/material';
import useGame from '../hooks/useGame';
import { useNavigate } from 'react-router-dom';

const Game = () => {

    const { player1, player2, handleFinishGame, playGame, game } = useGame();
    const navigate = useNavigate();

    const finishGame = () => {
        handleFinishGame();
        navigate('/');

    }

    const play = () => {
        playGame();
    }

    return (
        <>

            <Grid container justifyContent="center" spacing={1} >
                <Grid item lg={12} md={12} sm={12} textAlign="center">
                    <Button variant="contained" color="success" size="large" style={{ margin: "10px" }} onClick={play} disabled={game.ended}>
                        Jugar
                    </Button>
                    <Button variant="outlined" color="primary" size="large" style={{ margin: "10px" }} onClick={finishGame}>
                        Volver
                    </Button>
                    <Grid container justifyContent="center" spacing={1} alignItems="center">
                        <Grid item lg={4} md={4} sm={12} textAlign="right">
                            <Box sx={{ visibility: player1.winner ? 'visible' : 'hidden' }}>
                                <img alt="winner" src='/winner.png' height={100} />
                            </Box>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} textAlign="center">
                            <Box sx={{
                                border: '2px solid green',
                                padding: '5px',
                                borderRadius: '25px'
                            }}>
                                <Typography sx={{ color: "red", visibility: game.ended ? 'visible' : 'hidden' }} align='center' variant="h6" component="div">Juego Terminado!!</Typography>
                                <Typography align='center' variant="h6" component="div">Cartas restantes: {game.remaining}</Typography>
                            </Box>
                        </Grid>
                        <Grid item lg={4} md={4} sm={12} textAlign="left">
                            <Box sx={{ visibility: player2.winner ? 'visible' : 'hidden', display: "flex", alignItems: "center" }}>
                                <img alt="winner" src='/winner.png' height={100} />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={4} md={4} sm={12}>
                    <GamePlayer key="gamePlayer1" player={player1} />
                </Grid>
                <Grid item lg={4} md={4} sm={12}>
                    <GamePlayer key="gamePlayer2" player={player2} />
                </Grid>
            </Grid>
        </>
    )
}

export default Game