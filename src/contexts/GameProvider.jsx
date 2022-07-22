import React, { useEffect } from 'react'
import { useState } from 'react'
import useMessage from '../hooks/useMessage';
import { GameContext } from './GameContext'
import axios from "axios";

const GameProvider = ({ children }) => {

    const initialGame = { deck_id: null, remaining: null, ended: false };

    const [player1, setPlayer1] = useState({ id: 1, name: "", cards: [], cardsMatched: [], winner: false, lastCard: {} });
    const [player2, setPlayer2] = useState({ id: 2, name: "", cards: [], cardsMatched: [], winner: false, lastCard: {} });
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
        setPlayer1({ id: 1, name: "", cards: [], cardsMatched: [], winner: false, lastCard: {} });
        setPlayer2({ id: 2, name: "", cards: [], cardsMatched: [], winner: false, lastCard: {} });
    }

    const playGame = async () => {
        const url = `https://deckofcardsapi.com/api/deck/${game.deck_id}/draw/?count=2`;
        const { data } = await axios(url);

        const cardsPlayer1 = player1.cards;
        const cardsPlayer2 = player2.cards;

        const newCardPlayer1 = {
            code: data.cards[0].code,
            value: data.cards[0].value,
            suit: data.cards[0].suit,
            image: data.cards[0].image,
        };
        const resultPlayer1 = evaluateGamePlayer(player1.cards, newCardPlayer1);
        cardsPlayer1.push(newCardPlayer1);
        setPlayer1({ ...player1, cards: cardsPlayer1, cardsMatched: resultPlayer1, lastCard: newCardPlayer1 });

        const newCardPlayer2 = {
            code: data.cards[1].code,
            value: data.cards[1].value,
            suit: data.cards[1].suit,
            image: data.cards[1].image,
        };
        const resultPlayer2 = evaluateGamePlayer(player2.cards, newCardPlayer2);
        cardsPlayer2.push(newCardPlayer2);
        setPlayer2({ ...player2, cards: cardsPlayer2, cardsMatched: resultPlayer2, lastCard: newCardPlayer2 });

        setGame({ ...game, remaining: data.remaining })
    }

    const evaluateGamePlayer = (cards, lastCard) => {
        if (cards.length > 1) {
            const cardMatched = cards.find(x => x.value === lastCard.value);
            if (cardMatched) {
                return [cardMatched, lastCard]
            } else {
                return [];
            }
        } else {
            return [];
        }
    }

    useEffect(() => {

        if (game.remaining > 0 && game.remaining < 52) {
            const resultPlayer1 = player1.cardsMatched.length > 0;
            const resultPlayer2 = player2.cardsMatched.length > 0;

            if (resultPlayer1 || resultPlayer2) {
                if (resultPlayer1 && !resultPlayer2) {
                    setPlayer1({ ...player1, winner: resultPlayer1 });
                    // setGame({ ...game, ended: true })
                } else if (!resultPlayer1 && resultPlayer2) {
                    setPlayer2({ ...player2, winner: resultPlayer2 });
                    // setGame({ ...game, ended: true })
                } else {



                    setPlayer1({ ...player1, winner: resultPlayer1 });
                    setPlayer2({ ...player2, winner: resultPlayer2 });
                    // setGame({ ...game, ended: true })
                }
            }
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