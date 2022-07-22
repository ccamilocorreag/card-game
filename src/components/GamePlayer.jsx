import React from 'react'
import ObtainedCards from './ObtainedCards'
import OptionedCards from './OptionedCards'
import Typography from '@mui/material/Typography';
import './GamePlayer.css';

const GamePlayer = ({ player }) => {
    return (
        <>
            <div className='player-container'>
                <div className={`${player.id === 1 ? 'player1-wrapper' : 'player2-wrapper'}`}>

                    <Typography sx={{ fontWeight: "600" }} align='center' marginY={2} variant="h5" component="div">Jugador # {player.id} </Typography>
                    <Typography sx={{ fontWeight: "600" }} align='center' marginY={2} variant="h3" component="div">{player.name} </Typography>


                    <OptionedCards player={player} />
                    <ObtainedCards player={player} />
                </div>
            </div>
        </>
    )
}

export default GamePlayer