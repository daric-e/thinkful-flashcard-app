import React, { Fragment } from "react";
import Card from './Card';

export default function CardList({ cards = [], handleDelete }) {
    const cardList = cards.map((card, i) => <Card key={i} card={card} study={false} handleDelete={handleDelete} />)
    return (
        <Fragment>
            <div className="row mt-4">
                <h2>Cards</h2>
            </div>
            {cardList}
        </Fragment>
    )
}