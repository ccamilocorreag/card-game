import React from 'react'
import { useState } from 'react'
import useMessage from '../hooks/useMessage';
import { GameContext } from './GameContext'

const GameProvider = ({ children }) => {

    const [player1, setPlayer1] = useState({ id: 1, name: "" });
    const [player2, setPlayer2] = useState({ id: 2, name: "" });
    const [game, setGame] = useState({});

    const handleChangePlayerName = (id, value) => {
        if (id === '1')
            setPlayer1({ ...player1, name: value });
        else
            setPlayer2({ ...player2, name: value });
    }
    const [showModal, handleModalClose, handleShowModal] = useMessage();


    return (
        <>
            <GameContext.Provider value={
                {
                    player1, player2,
                    handleChangePlayerName, game,
                    showModal, handleModalClose, handleShowModal
                }}>
                {children}
            </GameContext.Provider>
        </>
    )
}

export default GameProvider