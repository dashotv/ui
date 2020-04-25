import React from 'react';
import './index.css';
import {MediaMenu} from "./components/menu";
import {Route} from "react-router-dom";
import {MediaList} from "./list";
// import {ReleasesSearch} from "./media/search";

export const MediaIndex = () => {
    return (
        <div>
            <div className="ui grid">
                <div className="row">
                    <MediaMenu/>
                </div>
                <div className="row">
                    <Route exact path='/media' component={MediaList}/>
                    <Route path='/media/search'/>
                </div>
            </div>
        </div>
    )
}
