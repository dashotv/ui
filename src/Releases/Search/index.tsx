import React, {Component} from 'react';
import Toggle from '../../Components/Toggle'
import {useAsync} from "react-async";

type ReleaseSearchProps = {
    // title?: string,
    // year?: string,
    // season?: number,
    // episode?: number,
    // group?: string,
    // author?: string,
    // resolutions?: number[],
    // sources?: string[],
    // types?: string[],
    // exact?: boolean,
    // verified?: boolean,
    // bd?: boolean,
    // uncensored?: boolean,
}

type ReleaseSearchState = {
    title?: string,
    year?: string,
    season?: number,
    episode?: number,
    group?: string,
    author?: string,
    resolution?: number,
    resolutions: number[],
    source?: number,
    sources: string[],
    type?: number,
    types: string[],
    exact?: boolean,
    verified?: boolean,
    bd?: boolean,
    uncensored?: boolean,
    /* Whether the form has been successfully submitted */
    submitSuccess?: boolean;
}

export interface IValues {
    /* Key value pairs for all the field values with key being the field name */
    [key: string]: any;
}

export interface IErrors {
    /* The validation error messages for each field (key is the field name */
    [key: string]: string;
}

class ReleaseSearch extends Component<ReleaseSearchProps, ReleaseSearchState> {
    constructor(props: ReleaseSearchProps) {
        super(props);

        this.state = {
            verified: true,
            exact: true,
            bd: false,
            uncensored: false,
            resolutions: [2160, 1080, 720],
            types: ["tv", "anime", "movies"],
            sources: ["yify"]
        };
    }

    static defaultProps = {};

    render() {
        return (
            <div className="ui form">
                <div className="fields">
                    <div className="field">
                        <input placeholder="title" type="text" value={this.state.title}/>
                    </div>
                    <div className="field">
                        <input placeholder="year" type="text" value={this.state.year}/>
                    </div>
                    <div className="field">
                        <input placeholder="season" type="text" value={this.state.season}/>
                    </div>
                    <div className="field">
                        <input placeholder="episode" type="text" value={this.state.episode}/>
                    </div>
                    <div className="field">
                        <input placeholder="group" type="text" value={this.state.group}/>
                    </div>
                    <div className="field">
                        <input placeholder="author" type="text" value={this.state.author}/>
                    </div>
                    <div className="field">
                        <select name="resolution" className="ui search dropdown" value={this.state.resolution}>
                            <option value="">resolution</option>
                            {
                                this.state.resolutions.map((r) => {
                                    return <option value={r}>{r}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="field">
                        <select name="source" className="ui search dropdown" value={this.state.source}>
                            <option value="">source</option>
                            {
                                this.state.sources.map((r) => {
                                    return <option value={r}>{r}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="field">
                        <select name="type" className="ui search dropdown" value={this.state.type}>
                            <option value="">type</option>
                            {
                                this.state.types.map((r) => {
                                    return <option value={r}>{r}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="field">
                        <div className="ui basic icon buttons">
                            <Toggle icon="target" value={this.state.exact}/>
                            <Toggle icon="certificate" value={this.state.verified}/>
                            <Toggle icon="disk" value={this.state.bd}/>
                            <Toggle icon="beer" value={this.state.uncensored}/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="ui icon buttons">
                            <button className="ui icon button" title="search">
                                <i className="rocket icon"/>
                            </button>
                            <button className="ui icon button" title="reset">
                                <i className="undo icon"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
export default ReleaseSearch;
