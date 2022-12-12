import React, { Fragment, useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory, Switch, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import CardList from "./CardList";
import CardForm from "./CardForm";
import { readDeck, deleteDeck } from "../utils/api";

function DeckDisplay() {
    const [deck, setDeck] = useState({});
    const [shouldReload, setShouldReload] = useState(false);
    const { params: { deckId }, path } = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        setDeck({})
        const getDeck = async () => {
            const deck = await readDeck(deckId);
            if (deck) {
                setDeck(deck);
            }
        }

        getDeck();
        if (shouldReload) {
            setShouldReload(false);
        }
    }, [deckId, shouldReload]);

    const handleDelete = () => {
        if (window.confirm('Delete this deck? \n\nYou will not be able to recover it.')) {
            deleteDeck(deck.id).then(() => history.push('/'));
        }
    }

    const triggerReload = () => {
        setShouldReload(true);
    }

    return (
        <Fragment>
            <Switch>
                <Route path={`${path}/cards/:cardId/edit`}>
                    <CardForm triggerReload={triggerReload} />
                </Route>
                <Route exact path={path}>
                    <div className="container">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/"><FontAwesomeIcon icon={solid('house')}/> Home</Link>
                            </li>
                            <li className="breadcrumb-item active">{deck.name}</li>
                        </ul>
                        <div className="container">
                            <div className="row">
                                <h3>{deck.name}</h3>
                            </div>
                            <div className="row">
                                <p>{deck.description}</p>
                            </div>
                            <div className="row">
                                <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-1"><FontAwesomeIcon icon={solid('pencil')}/> Edit</Link>
                                <Link to={`/decks/${deckId}/study`} className="btn btn-primary mx-1"><FontAwesomeIcon icon={solid('book')} /> Study</Link>
                                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mx-1"><FontAwesomeIcon icon={solid('plus')} /> Add Cards</Link>
                                <button onClick={handleDelete} type="button" className="btn btn-danger ml-auto"><FontAwesomeIcon icon={solid('trash')} /></button>
                            </div>
                            <CardList cards={deck.cards}/>
                        </div>
                    </div>
                </Route>
            </Switch>
        </Fragment>
    )
}


export default DeckDisplay;