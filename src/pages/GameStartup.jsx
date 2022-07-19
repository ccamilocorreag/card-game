import React from 'react'
import Player from '../components/Player';
import { Button, Grid } from '@mui/material';
import { Link } from "react-router-dom";

const GameStartup = () => {
  return (
    <>
      <Grid container spacing={2}
        direction="row">
        <Grid item lg={6} md={6} xs={12} >
          <Player key="player1" playerNumber="1" />
        </Grid>
        <Grid item lg={6} md={6} xs={12} >
          <Player key="player2" playerNumber="2" />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Grid container padding={5} direction="column" alignItems="center" justifyContent="center">
            <Grid item lg={12} md={12} xs={12}>
              <Button variant="outlined" color="primary">
                <Link to="/game">
                  Iniciar
                </Link>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default GameStartup