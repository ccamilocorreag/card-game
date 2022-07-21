import React from 'react'
import { Modal, Button, Typography, Card, CardContent, CardActions } from '@mui/material';
import useGame from '../hooks/useGame';

const ModalMessage = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const { showModal, handleModalClose } = useGame();


    return (
        <>
            <Modal open={showModal} onClose={handleModalClose}>
                <Card sx={style}>
                    <CardContent>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Error
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Los jugadores deben estar listos para iniciar el juego! Registra sus nicknames.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleModalClose}>Cerrar</Button>
                    </CardActions>
                </Card>
            </Modal>
        </>
    )
}

export default ModalMessage