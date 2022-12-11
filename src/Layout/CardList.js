import React, { Fragment } from "react";
import Card from './Card';

export default function CardList({ cards = [] }) {
    const cardList = cards.map((card, i) => <Card key={i} card={card} study={false} />)
    return (
        <Fragment>
            <div className="row mt-4">
                <h2>Cards</h2>
            </div>
            {cardList}
        </Fragment>
    )
}