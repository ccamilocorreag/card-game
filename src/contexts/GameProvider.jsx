import React, { useEffect } from 'react'
import { useState } from 'react'
import useMessage from '../hooks/useMessage';
import { GameContext } from './GameContext'
import axios from "axios";

const GameProvider = ({ children }) => {

    const initialGame = { deck_id: null, remaining: null };

    const [player1, setPlayer1] = useState({ id: 1, name: "", cards: [], cardsMatched: [] });
    const [player2, setPlayer2] = useState({ id: 2, name: "", cards: [], cardsMatched: [] });
    const [game, setGame] = useState(initialGame);
    const [showModal, handleModalClose, handleShowModal] = useMessage();

    const handleChangePlayerName = (id, value) => {
        if (id === '1')
            setPlayer1({ ...player1, name: value });
        else
            setPlayer2({ ...player2, name: value });
    }

    const getGame = async () => {
        const url = "http://deckofcardsapi.com/api/deck/new/";
        const { data } = await axios(url);
        setGame({ deck_id: data.deck_id, remaining: data.remaining });
    };

    const handleFinishGame = () => {
        setGame(initialGame);
        setPlayer1({ id: 1, name: "", cards: [], cardsMatched: [] });
        setPlayer2({ id: 2, name: "", cards: [], cardsMatched: [] });
    }

    const playGame = async () => {
        const url = `https://deckofcardsapi.com/api/deck/${game.deck_id}/draw/?count=2`;
        const { data } = await axios(url);

        const cardsPlayer1 = player1.cards;
        const cardsPlayer2 = player2.cards;

        cardsPlayer1.push({
            code: data.cards[0].code,
            value: data.cards[0].value,
            suit: data.cards[0].suit,
            image: data.cards[0].image,
        });
        setPlayer1({ ...player1, cards: cardsPlayer1 });

        cardsPlayer2.push({
            code: data.cards[1].code,
            value: data.cards[1].value,
            suit: data.cards[1].suit,
            image: data.cards[1].image,
        });
        setPlayer2({ ...player2, cards: cardsPlayer2 });

        setGame({ ...game, remaining: data.remaining })
    }

    useEffect(() => {

        if (game.remaining > 0 && game.remaining < 52) {
            


            
        }

    }, [game])


    return (
        <>
            <GameContext.Provider value={
                {
                    player1, player2, handleChangePlayerName,
                    game, getGame, handleFinishGame, playGame,
                    showModal, handleModalClose, handleShowModal
                }}>
                {children}
            </GameContext.Provider>
        </>
    )
}

export default GameProvider