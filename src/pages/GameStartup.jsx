import React from 'react'
import Player from '../components/Player';
import { Button, Grid } from '@mui/material';
import useGame from '../hooks/useGame';
import { useNavigate } from 'react-router-dom';
import ModalMessage from '../components/Message';

const GameStartup = () => {

  const { player1, player2, handleShowModal, getGame } = useGame();
  const navigate = useNavigate();

  const handleIniciar = () => {
    if (player1.name !== '' && player2.name !== '') {
      getGame();
      navigate('/game');
    }
    else {
      handleShowModal();
    }
  }

  return (
    <>
      <div className='container'>
        <div className='app-wrapper'>

          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item lg={6} md={6} xs={6} padding={2}>
              <Player key="player1" playerNumber={player1.id} />
            </Grid>
            <Grid item lg={6} md={6} xs={6} padding={2}>
              <Player key="player2" playerNumber={player2.id} />
            </Grid>
            <Grid item lg={1} md={1} xs={1} padding={2}>
              <Button variant="contained" color="inherit" onClick={handleIniciar}>
                Iniciar
              </Button>
            </Grid>
          </Grid>
          <ModalMessage key="modalMessage" />
        </div>
      </div>
    </>
  )
}

export default GameStartup