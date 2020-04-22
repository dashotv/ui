import React, {FunctionComponent, useEffect, useState} from 'react';
import Toggle from '../../Components/Toggle'
import {release} from './index'
import {ReleasesTable} from "./components/table"
import * as Scry from '../../services/scry'

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

type ReleasesSearchState = {
    title?: string,
    year?: number,
    season?: number,
    episode?: number,
    group?: string,
    author?: string,
    resolution?: number,
    resolutions: number[],
    source?: string,
    sources: string[],
    type?: string,
    types: string[],
    exact?: boolean,
    verified?: boolean,
    bd?: boolean,
    uncensored?: boolean,
    /* Whether the form has been successfully submitted */
    submitSuccess?: boolean;
}

export const ReleasesSearch: FunctionComponent = () => {
    const [releases, setReleases] = useState<release[]>([]);
    const [form, setForm] = useState<ReleasesSearchState>({
        verified: true,
        exact: true,
        bd: false,
        uncensored: false,
        resolutions: [2160, 1080, 720],
        types: ["tv", "anime", "movies"],
        sources: ["yify"]
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit");
        console.log(form)
        getReleases();
    }

    const getReleases = () => {
        Scry.Releases(optionsFromForm()).then((res) => {
            console.log(res)
            setReleases(res.Releases)
        });
    }

    useEffect(() => {
        getReleases();
    }, [])

    const optionsFromForm = () => {
        const options: Scry.ScryReleaseOptions = {
            source: form.source,
            type: form.type,
            name: form.title,
            year: form.year,
            author: form.author,
            group: form.group,
            season: form.season,
            episode: form.episode,
            resolution: form.resolution,
            verified: form.verified,
            uncensored: form.uncensored,
            bluray: form.bd,
            exact: form.exact,
        }
        return options
    }

    return (
        <div>
            <div className="ui form">
                <form onSubmit={handleSubmit}>
                    <div className="fields">
                        <div className="field">
                            <input placeholder="title" type="text" value={form.title}/>
                        </div>
                        <div className="field">
                            <input placeholder="year" type="text" value={form.year}/>
                        </div>
                        <div className="field">
                            <input placeholder="season" type="text" value={form.season}/>
                        </div>
                        <div className="field">
                            <input placeholder="episode" type="text" value={form.episode}/>
                        </div>
                        <div className="field">
                            <input placeholder="group" type="text" value={form.group}/>
                        </div>
                        <div className="field">
                            <input placeholder="author" type="text" value={form.author}/>
                        </div>
                        <div className="field">
                            <select name="resolution" className="ui search dropdown" value={form.resolution}>
                                <option value="">resolution</option>
                                {
                                    form.resolutions.map((r) => {
                                        return <option value={r}>{r}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="field">
                            <select name="source" className="ui search dropdown" value={form.source}>
                                <option value="">source</option>
                                {
                                    form.sources.map((r) => {
                                        return <option value={r}>{r}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="field">
                            <select name="type" className="ui search dropdown" value={form.type}>
                                <option value="">type</option>
                                {
                                    form.types.map((r) => {
                                        return <option value={r}>{r}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="field">
                            <div className="ui basic icon buttons">
                                <Toggle icon="target" value={form.exact}/>
                                <Toggle icon="certificate" value={form.verified}/>
                                <Toggle icon="disk" value={form.bd}/>
                                <Toggle icon="beer" value={form.uncensored}/>
                            </div>
                        </div>

                        <div className="field">
                            <div className="ui icon buttons">
                                <button className="ui icon button" type={"submit"} title="search">
                                    <i className="rocket icon"/>
                                </button>
                                <button className="ui icon button" title="reset">
                                    <i className="undo icon"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div>
                <ReleasesTable releases={releases}/>
            </div>
        </div>
    )
}
// class ReleaseSearch extends Component<ReleaseSearchProps, ReleaseSearchState> {
//     constructor(props: ReleaseSearchProps) {
//         super(props);
//
//         form = {
//             releases: [],
//             verified: true,
//             exact: true,
//             bd: false,
//             uncensored: false,
//             resolutions: [2160, 1080, 720],
//             types: ["tv", "anime", "movies"],
//             sources: ["yify"]
//         };
//     }
//
//     handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//         e.preventDefault();
//         console.log("submit");
//         this.fetchReleases().then(data => {
//             console.log(data);
//             this.setState((current)=>({...current, releases: data.Releases}))
//         })
//     }
//
//     fetchReleases() {
//         return Scry.Releases(this.optionsFromState())
//     }
//
//     optionsFromState(): Scry.ScryReleaseOptions {
//         const options: Scry.ScryReleaseOptions = {
//             source: form.source,
//             type: form.type,
//             name: form.title,
//             year: form.year,
//             author: form.author,
//             group: form.group,
//             season: form.season,
//             episode: form.episode,
//             resolution: form.resolution,
//             verified: form.verified,
//             uncensored: form.uncensored,
//             bluray: form.bd,
//             exact: form.exact,
//         }
//         return options
//     }
//
//
//     static defaultProps = {};
//
//     render() {
//     }
// };
