import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
// Components
import DeckDisplay from "./DeckDisplay";
import DeckForm from "./DeckForm";
import NotFound from "./NotFound";
import Header from "./Header";
import Study from "./Study";
import Home from "./Home";
import CardForm from "./CardForm";

function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" >
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <DeckForm />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardForm />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckForm />
          </Route>
          <Route path="/decks/:deckId">
            <DeckDisplay />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
