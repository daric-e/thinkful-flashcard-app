import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Card({ card = {}, study = false, flip = false, handleNext, handleFlip, lengthOfDeck = 0, index }) {
    const { params: { deckId } } = useRouteMatch();
    return (
        <div className="card shadow-sm m-2">
            {!study && <div className="card-body">
                <div className="row">
                    <div className="container col-6">
                        {card.front}
                    </div>
                    <div className="container col-6">
                        {card.back}
                    </div>
                </div>
                <div className="row container mt-2">
                    <div className="ml-auto">
                        <Link className="btn btn-secondary mr-1" to={`/decks/${deckId}/cards/${card.id}/edit`}><FontAwesomeIcon icon={solid('pencil')} /> Edit</Link>
                        <button type="button" className="btn btn-danger ml-1"><FontAwesomeIcon icon={solid('trash')} /></button>
                    </div>
                </div>
            </div>}
            {study && <div className="card-body">
                <div className="row">
                    <h3>Card {index + 1} of {lengthOfDeck}</h3>
                </div>
                {!flip && <div className="row">
                    <p>{card.front}</p>
                </div>}
                {flip && <div className="row">
                    <p>{card.back}</p>
                </div>}
                <div className="row">
                    <button onClick={handleFlip} type="button" className="btn btn-secondary mr-1">Flip</button>
                    {flip && <button onClick={handleNext} type="button" className="btn btn-primary ml-1">Next</button>}
                </div>
            </div>}
        </div>
    );
}