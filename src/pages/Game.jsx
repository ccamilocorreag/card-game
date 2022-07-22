import React from 'react'
import GamePlayer from '../components/GamePlayer'
import { Button, Grid } from '@mui/material';
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
                    <Button variant="contained" color="success" size="large" style={{ margin: "10px" }} onClick={play} disabled={game.remaining === 0}>
                        Jugar
                    </Button>
                    <Button variant="outlined" color="primary" size="large" style={{ margin: "10px" }} onClick={finishGame}>
                        Terminar
                    </Button>
                    Cartas restantes: {game.remaining}
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