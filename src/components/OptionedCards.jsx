import React from 'react'
import Card from './Card'
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

const OptionedCards = ({ player }) => {
    return (
        <>
            <Typography sx={{ fontWeight: "600" }} align='center' marginY={5} variant="h5" component="div">Cartas Opcionadas</Typography>
            <Box sx={{ marginLeft: "10px" }}>
                {player.cardsMatched.lenght === 0 ? <div></div> : player.cardsMatched.map((card) => (
                    <Card key={card.code} card={card} />
                ))}
            </Box>
        </>
    )
}

export default OptionedCards