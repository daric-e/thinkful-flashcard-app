import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { deleteDeck } from "../utils/api";

function Deck({ deck }) {
    const history = useHistory();

    const handleDelete = () => {
        if (window.confirm('Delete this deck? \n\nYou will not be able to recover it.')) {
            deleteDeck(deck.id).then(() => history.push('/'));
        }
    }

    return(
        <div className="card container shadow-sm my-3">
            <div className="card-body">
                <div className="row justify-content-between">
                    <h3>{deck.name}</h3>
                    <p>{`${deck.cards.length} cards`}</p>
                </div>
                <p className="row">{deck.description}</p>
                <div className="row">
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1">
                        <FontAwesomeIcon className="mr-1" icon={solid('eye')} />View
                    </Link>
                    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary ml-1">
                        <FontAwesomeIcon className="mr-1" icon={solid('book')} />Study
                    </Link>
                    <button onClick={handleDelete} className="btn btn-danger ml-auto">
                        <FontAwesomeIcon icon={solid('trash-alt')} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Deck