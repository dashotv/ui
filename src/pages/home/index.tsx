import React from 'react';
import './index.css';
import {HomeMenu} from "./components/menu";
import {HomeList} from "./list";
import {Route} from "react-router-dom";

export function HomeIndex() {
    return (
        <div>
            <div className="ui grid">
                <div className="row">
                    <HomeMenu/>
                </div>
                <div className="row">
                    <Route exact path='/' component={HomeList}/>
                    <Route path='/home/schedule'/>
                    <Route path='/home/recent'/>
                </div>
            </div>
        </div>
    );
}
