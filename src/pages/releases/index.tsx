import React from 'react';
import {Route} from 'react-router-dom'

import {ReleasesMenu} from "./components/menu"
import {ReleasesSearch} from "./search"
import {ReleasesList} from "./list"
// import './index.css';
// import {ReleaseMenu} from "./Menu";
// import ReleaseList from "./List";
// import ReleaseSearch from "./Search";

/*

                    <Route exact path='/releases'>
                        <ReleasesList managed={true} releases={[]}/>
                    </Route>
 */

export type release = {

}

export const ReleasesIndex = () => {
    return (
        <div className="Releases">
            <div className="ui grid">
                <div className="row">
                    <ReleasesMenu/>
                </div>
                <div className="row">
                    <Route exact path='/releases' component={ReleasesList}/>
                    <Route path='/releases/search' component={ReleasesSearch}/>
                </div>
            </div>
        </div>
    )
}
