import React, { useEffect } from 'react'
import { useState } from 'react'
import useMessage from '../hooks/useMessage';
import { GameContext } from './GameContext'
import axios from "axios";

const GameProvider = ({ children }) => {

    const initialGame = { deck_id: null, remaining: null };
    const [player1, setPlayer1] = useState({ id: 1, name: "", cards: [], cardsMatched: [], winner: false, lastCard: {} });
    const [player2, setPlayer2] = useState({ id: 2, name: "", cards: [], cardsMatched: [], winner: false, lastCard: {} });
    const [game, setGame] = useState(initialGame);
    const [gameEnded, setGameEnded] = useState(false);
    const [showModal, handleModalClose, handleShowModal] = useMessage();
    const cardPriority = ['HEARTS', 'SPADES', 'DIAMONDS', 'CLUBS'];


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
        setGameEnded(false);
        setPlayer1({ id: 1, name: "", cards: [], cardsMatched: [], winner: false, lastCard: {} });
        setPlayer2({ id: 2, name: "", cards: [], cardsMatched: [], winner: false, lastCard: {} });
    }

    const playGame = async () => {

        const urlShuffle = `http://deckofcardsapi.com/api/deck/${game.deck_id}/shuffle/`;
        await axios(urlShuffle);

        const url = `https://deckofcardsapi.com/api/deck/${game.deck_id}/draw/?count=2`;
        const { data } = await axios(url);

        //Tomar cartas actuales de cada jugador
        const cardsPlayer1 = player1.cards;
        const cardsPlayer2 = player2.cards;

        //Crear nueva carta del jugador 1
        const newCardPlayer1 = {
            code: data.cards[0].code,
            value: data.cards[0].value,
            suit: data.cards[0].suit,
            image: data.cards[0].image,
        };
        //Evaluamos si hay cartas con el mismo número del jugador1
        const cardsMatchedPlayer1 = evaluateGamePlayer(player1.cards, newCardPlayer1);
        //Agregamos la nueva carta al arreglo del jugador1
        cardsPlayer1.push(newCardPlayer1);
        //Modificamos e estado con las cartas del jugador1
        setPlayer1({ ...player1, cards: cardsPlayer1, cardsMatched: cardsMatchedPlayer1, lastCard: newCardPlayer1 });


        //Se hace lo mismo con el jugador 2
        const newCardPlayer2 = {
            code: data.cards[1].code,
            value: data.cards[1].value,
            suit: data.cards[1].suit,
            image: data.cards[1].image,
        };
        const resultPlayer2 = evaluateGamePlayer(player2.cards, newCardPlayer2);
        cardsPlayer2.push(newCardPlayer2);
        setPlayer2({ ...player2, cards: cardsPlayer2, cardsMatched: resultPlayer2, lastCard: newCardPlayer2 });

        //Se actualiza el juego sus cartas restantes
        setGame({ ...game, remaining: data.remaining })
    }

    const evaluateGamePlayer = (cards, lastCard) => {
        //Evaluar si hay cartas iguales en el mazo del jugador

        //solo se evalúa a partir de la segunda carta.
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
        //Se evalua si hay un ganador

        if (game.remaining > 0 && game.remaining < 52) {
            const hasCardsMatchedPlayer1 = player1.cardsMatched.length > 0;
            const hasCardsMatchedPlayer2 = player2.cardsMatched.length > 0;

            //Si uno o los dos tienen cartas emparejadas
            if (hasCardsMatchedPlayer1 || hasCardsMatchedPlayer2) {
                if (hasCardsMatchedPlayer1 && !hasCardsMatchedPlayer2) {
                    setPlayer1({ ...player1, winner: hasCardsMatchedPlayer1 });
                } else if (!hasCardsMatchedPlayer1 && hasCardsMatchedPlayer2) {
                    setPlayer2({ ...player2, winner: hasCardsMatchedPlayer2 });
                } else {
                    //Se evalúa el orden de la prioridad
                    cardPriority.forEach(priority => {
                        if (player1.cardsMatched.some(x => x.suit === priority)
                            && !player2.cardsMatched.some(x => x.suit === priority)) {
                            setPlayer1({ ...player1, winner: hasCardsMatchedPlayer1 });
                        } else if (!player1.cardsMatched.some(x => x.suit === priority)
                            && player2.cardsMatched.some(x => x.suit === priority)) {
                            setPlayer2({ ...player2, winner: hasCardsMatchedPlayer2 });
                        } else if (player1.cardsMatched.some(x => x.suit === priority)
                            && player2.cardsMatched.some(x => x.suit === priority)) {
                            setPlayer1({ ...player1, winner: hasCardsMatchedPlayer1 });
                            setPlayer2({ ...player2, winner: hasCardsMatchedPlayer2 });
                        }
                    });
                }
                setGameEnded(true);
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game, cardPriority])


    return (
        <>
            <GameContext.Provider value={
                {
                    player1, player2, handleChangePlayerName,
                    game, getGame, handleFinishGame, playGame, gameEnded,
                    showModal, handleModalClose, handleShowModal
                }}>
                {children}
            </GameContext.Provider>
        </>
    )
}

export default GameProvider