import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";
import { listDecks } from "../utils/api/index";

function Home() {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        setDecks([]);
        const getDecks = async () => {
            const res = await listDecks();
            setDecks(res);
        }

        getDecks();
    }, []);

    return (
        <>
            <Link to="/decks/new" className="btn btn-secondary">
                <span className="oi oi-plus" /> Create Deck
            </Link>
            <DeckList decks={decks} />
        </>
    )
}

export default Home;