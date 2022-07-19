import React from 'react'
import Card from './Card'
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

const OptionedCards = () => {
    return (
        <>
            <Typography sx={{ fontWeight: "600" }} align='center' marginY={5} variant="h5" component="div">Cartas Opcionadas</Typography>
            <Grid container direction="row" spacing={2} justifyContent="center">
                <Grid item lg={1}>
                    <Card />
                </Grid>
                <Grid item lg={1} >
                    <Card />
                </Grid>
            </Grid>
        </>
    )
}

export default OptionedCards