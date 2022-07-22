import React from 'react'

const Card = ({ card }) => {
    return (
        <>
            <img src={card.image} width="100px" alt="card" />
        </>
    )
}

export default Card