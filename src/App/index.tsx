import React from 'react';
import {BrowserRouter as Router, Link, NavLink, Route, Switch} from "react-router-dom";

import './index.css';

import Home from "../Home"
import Media from "../Media"
import Releases from "../Releases"
import logo from "./logo-small.png";
import {Container} from "semantic-ui-react";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Container>
                        <div className="ui top fixed menu">
                            <Link className="item" to="/">
                                <img src={logo} alt={"logo"}/>
                            </Link>
                            <NavLink className="item" exact to="/">Home</NavLink>
                            <NavLink className="item" to="/media">Media</NavLink>
                            <NavLink className="item" to="/releases">Releases</NavLink>
                        </div>
                    </Container>
                </header>
                <Switch>
                    <Container>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route path="/media">
                            <Media/>
                        </Route>
                        <Route path="/releases">
                            <Releases/>
                        </Route>
                    </Container>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
