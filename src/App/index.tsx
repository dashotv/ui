import React from 'react';
import {BrowserRouter as Router, Link, NavLink, Route, Switch} from "react-router-dom";

import './index.css';

import Home from "../Home"
import Media from "../Media"
import {ReleasesIndex} from "../pages/releases/index"
import logo from "./logo-small.png";
import {Container} from "semantic-ui-react";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <div className="ui top fixed menu">
                        <Container>
                            <Link className="item" to="/">
                                <img src={logo} alt={"logo"}/>
                            </Link>
                            <NavLink className="item" exact to="/">
                                <i className="home icon"/> Home
                            </NavLink>
                            <NavLink className="item" to="/media">
                                <i className="tv icon"/> Media
                            </NavLink>
                            <NavLink className="item" to="/releases">
                                <i className="arrow alternate circle down icon"/> Releases
                            </NavLink>
                        </Container>
                    </div>
                </header>
                <Switch>
                    <Container>
                        <Route exact path="/" component={Home}/>
                        <Route path="/media" component={Media}/>
                        <Route path="/releases" component={ReleasesIndex}/>
                    </Container>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
