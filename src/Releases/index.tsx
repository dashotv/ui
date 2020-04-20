import React from 'react';
import {Route} from 'react-router-dom'

import './index.css';
import {ReleaseMenu} from "./Menu";
import ReleaseList from "./List";

const Releases = () => {
    return (
        <div className="Releases">
            <div className="ui grid">
                <div className="four wide column">
                    <ReleaseMenu/>
                </div>
                <div className="twelve wide column">
                    <Route exact path='/releases' component={ReleaseList}/>
                    <Route path='/releases/search'/>
                </div>
            </div>
        </div>
    )
}

export default Releases;
