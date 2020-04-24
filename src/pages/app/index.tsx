import React from 'react';
import {BrowserRouter as Router, Link, NavLink, Route, Switch} from "react-router-dom";

import './index.css';

import {HomeIndex} from "../home"
import {MediaIndex} from "../media"
import {ReleasesIndex} from "../releases"
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
                <Container>
                    <Switch>
                        <Route exact path="/" component={HomeIndex}/>
                        <Route path="/media" component={MediaIndex}/>
                        <Route path="/releases" component={ReleasesIndex}/>
                    </Switch>
                </Container>
            </div>
        </Router>
    );
}

export default App;
