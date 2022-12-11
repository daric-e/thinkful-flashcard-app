import React, { Fragment, useEffect, useState } from "react";
import { Link, useRouteMatch, useHistory} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import Card from "./Card";
import { readDeck } from "../utils/api";

function Study() {
    const [deck, setDeck] = useState({});
    const [currentCard, setCurrentCard] = useState({});
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const { params: { deckId } } = useRouteMatch();

    const history = useHistory();

    useEffect(() => {
        setDeck({})
        setCurrentCard({})
        const getDeck = async () => {
            const deck = await readDeck(deckId);
            if (deck) {
                setDeck(deck);
                setCurrentCard(deck.cards[0]);
            }
        }

        getDeck();
    }, [deckId]);

    const handleNext = () => {
        // if we are not at the end of the list of cards
        if (!(currentCardIndex + 1 > deck.cards.length - 1)) {
            // set current card to the next card in the array
            setCurrentCard(deck.cards[currentCardIndex + 1]);
            setCurrentCardIndex(currentCardIndex + 1);
            setFlipped(!flipped);
        } else {
            // ask if they want to start over
            if (window.confirm('Restart cards?\n\nClick "cancel" to return to the home page')) {
                // set the current card back to the first card in the list
                setCurrentCard(deck.cards[0]);
                setCurrentCardIndex(0);
                setFlipped(!flipped);
            } else {
                history.push('/');
                setFlipped(!flipped);
            }
        }

    }

    const handleFlip = () => {
        setFlipped(!flipped)
    }

    return (
        <div className="container">
            <ul className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/"><FontAwesomeIcon icon={solid('house')}/> Home</Link>
                </li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active">Study</li>
            </ul>
            <h2>Study: {deck.name}</h2>
            { deck.cards?.length >= 3 
                ? <Card card={currentCard} study={true} flip={flipped} index={currentCardIndex}
                    lengthOfDeck={deck?.cards?.length} handleNext={handleNext} handleFlip={handleFlip}/>
                : <Fragment>
                    <h3>Not enough cards.</h3>
                    <p>You need at least 3 cards to study. There are {deck.cards?.length} cards in this deck.</p>
                    <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary"><FontAwesomeIcon icon={solid('plus')} /> Add Cards</Link>
                </Fragment> }
        </div>
    )
}


export default Study;