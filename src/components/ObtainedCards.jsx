import React from 'react'
import Card from './Card'
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

const ObtainedCards = ({ player }) => {
    return (
        <>
            <Typography sx={{ fontWeight: "600" }} align='center' marginY={3} variant="h5" component="div">Cartas Obtenidas</Typography>
            <Box sx={{marginLeft:"10px"}}>
                {player.cards.lenght === 0 ? <div></div> : player.cards.map((card) => (
                    <Card key={card.code} card={card} />
                ))}
            </Box>
        </>
    )
}

export default ObtainedCards