import React from 'react';
import {Route} from 'react-router-dom'

import './index.css';
import {ReleaseMenu} from "./Menu";
import ReleaseList from "./List";
import ReleaseSearch from "./Search";

const Releases = () => {
    return (
        <div className="Releases">
            <div className="ui grid">
                <div className="row">
                    <ReleaseMenu/>
                </div>
                <div className="row">
                    <Route exact path='/releases' component={ReleaseList}/>
                    <Route path='/releases/search' component={ReleaseSearch}/>
                </div>
            </div>
        </div>
    )
}

export default Releases;
