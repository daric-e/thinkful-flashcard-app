import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { createCard, readDeck, updateCard, readCard } from "../utils/api";

function CardForm({ triggerReload }) {
    const initState = {
        front: '',
        back: ''
    };

    const [formData, setFormData] = useState({...initState});
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    const { url, params: { cardId, deckId } } = useRouteMatch();
    const history = useHistory();
    const editMode = /edit/gi.test(url);

    useEffect(() => {
        const getDeck = async () => {
            const deck = await readDeck(deckId);
            setDeck({
                ...deck
            });
        }
        const getCard = async () => {
            const card = await readCard(cardId);
            // update formData with the front and back of the retrieved card
            setFormData({
                ...card
            });
            setCard({
                ...card
            });
        }

        getDeck();
        // get the card from the API if in editMode
        if (cardId && editMode) {
            getCard();
        }
    }, [deckId, cardId, editMode]);

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // If new form
        if (!editMode) {
            // Call create new card API call
            const newCard = {
                front: formData.front,
                back: formData.back
            };
            await createCard(deck.id, newCard);
            // Clear the form
            setFormData({ ...initState });
        } else {
            // If edit form
            // Call the update card API call
            const updateCardObj = {
                ...card,
                front: formData.front,
                back: formData.back
            };
            await updateCard(updateCardObj);
            triggerReload();
            // Navigate to /decks/:deckId
            history.push(`/decks/${deck.id}`);
        }
    }

    return (
        <Fragment>
            <ul className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">
                        <FontAwesomeIcon icon={solid('house')} /> Home
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">
                    {editMode ? `Edit Card ${card.id}` : 'Add Card'}    
                </li>
            </ul>
            <h2>{editMode ? 'Edit Card' : `${deck.name}: Add Card`}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea onChange={handleChange} value={formData.front} type="text" className="form-control" name="front" id="card-front" placeholder="Front side of card"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back">Back</label>
                    <textarea onChange={handleChange} value={formData.back} className="form-control" name="back" id="card-back" placeholder="Back side of card"></textarea>
                </div>
                <div className="form-group mt-2">
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1">Done</Link>
                    <button type="submit" className="btn btn-primary ml-1">Save</button>
                </div>
            </form>
        </Fragment>
    )
}

export default CardForm;