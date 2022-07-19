import React from 'react'
import ObtainedCards from './ObtainedCards'
import OptionedCards from './OptionedCards'
import Typography from '@mui/material/Typography';

const GamePlayer = () => {
    return (
        <>
            <Typography sx={{ fontWeight: "600" }} align='center' marginY={5} variant="h5" component="div">Jugador # __________</Typography>

            <OptionedCards />
            <ObtainedCards />
        </>
    )
}

export default GamePlayer