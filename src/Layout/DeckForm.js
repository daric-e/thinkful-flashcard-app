import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { createDeck, readDeck, updateDeck } from "../utils/api";

function DeckForm() {
    const initState = {
        name: '',
        description: ''
    };

    const [formData, setFormData] = useState({...initState});
    const [deck, setDeck] = useState({});
    const { url, params: { deckId } } = useRouteMatch();
    const history = useHistory();
    const editMode = /edit/gi.test(url);

    // useEffect that runs if in edit mode
    useEffect(() => {
        const getDeck = async () => {
            const deck = await readDeck(deckId);
            // update formData with the name and description of the retrieved deck
            setFormData({
                ...deck
            });
            setDeck({
                ...deck
            });
        }
        // get the deck from the API
        if (deckId && editMode) {
            getDeck();
        }
    }, [deckId, editMode]);

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
            // Call create new deck API call
            const newDeck = {
                name: formData.name,
                description: formData.description
            };
            const res = await createDeck(newDeck);
            // Navigate to /decks/:deckId
            history.push(`/decks/${res.id}`)
            return;
        } else {
            // If edit form
            // Call the update deck API call
            const updateDeckObj = {
                id: deckId,
                name: formData.name,
                description: formData.description
            };
            const res = await updateDeck(updateDeckObj);
            // Navigate to /decks/:deckId
            history.push(`/decks/${res.id}`);
            return;
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
                <li className={`breadcrumb-item ${!editMode ? 'active' : ''}`}>
                    {editMode && <Link to={`/decks/${deckId}`}>{deck.name}</Link>}
                    {!editMode && 'Create Deck'}
                </li>
                {editMode && <li className="breadcrumb-item active">
                    Edit Deck    
                </li>}
            </ul>
            <h2>{editMode ? 'Edit' : 'Create'} Deck</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input onChange={handleChange} value={formData.name} type="text" className="form-control" name="name" id="deck-name" placeholder="Deck Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea onChange={handleChange} value={formData.description} className="form-control" name="description" id="deck-description" placeholder="Brief description of the deck"></textarea>
                </div>
                <div className="form-group mt-2">
                    <Link to="/" className="btn btn-secondary mr-1">Cancel</Link>
                    <button type="submit" className="btn btn-primary ml-1">Submit</button>
                </div>
            </form>
        </Fragment>
    )
}

export default DeckForm