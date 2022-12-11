import React, { Fragment } from "react";
import Deck from "./Deck";

function DeckList({ decks = [] }) {
    const deckList = decks.map((deck, i) => <Deck key={i} deck={deck} />);
    return (
        <Fragment>
            {deckList}
        </Fragment>
    );
}

export default DeckList;