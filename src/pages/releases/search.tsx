import React, {FunctionComponent, useEffect, useState} from 'react';
import Toggle from '../../components/toggle'
import {release} from './index'
import {ReleasesTable} from "./components/table"
import * as Scry from '../../services/scry'

type formData = {
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

const initial: formData = {
    verified: true,
    exact: true,
    bd: false,
    uncensored: false,
    resolutions: [2160, 1080, 720],
    types: ["tv", "anime", "movies"],
    sources: ["yify"]
}

export const ReleasesSearch: FunctionComponent = () => {
    const [releases, setReleases] = useState<release[]>([]);
    // const [verified, setVerified] = useState<boolean>(true);
    const [form, setForm] = useState<formData>(initial)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit");
        console.log(form);
        getReleases();
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        console.log(name + " = " + value)
        setForm({...form, [name]: value})
    }

    const getReleases = () => {
        const options = optionsFromForm();
        console.log(options);
        Scry.Releases(options).then((res) => {
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
                            <input placeholder="title" name="title" type="text" value={form.title}
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="field">
                            <input placeholder="year" name="year" type="text" value={form.year}
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="field">
                            <input placeholder="season" name="season" type="number" value={form.season}
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="field">
                            <input placeholder="episode" name="episode" type="number" value={form.episode}
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="field">
                            <input placeholder="group" name="group" type="text" value={form.group}
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="field">
                            <input placeholder="author" name="author" type="text" value={form.author}
                                   onChange={handleInputChange}/>
                        </div>
                        <div className="field">
                            <select name="resolution" className="ui search dropdown" value={form.resolution}
                                    onBlur={handleInputChange}>
                                <option value="">resolution</option>
                                {
                                    form.resolutions.map((r) => {
                                        return <option key={r} value={r}>{r}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="field">
                            <select name="source" className="ui search dropdown" value={form.source}
                                    onBlur={handleInputChange}>
                                <option value="">source</option>
                                {
                                    form.sources.map((r) => {
                                        return <option key={r} value={r}>{r}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="field">
                            <select name="type" className="ui search dropdown" value={form.type}
                                    onBlur={handleInputChange}>
                                <option value="">type</option>
                                {
                                    form.types.map((r) => {
                                        return <option key={r} value={r}>{r}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="field">
                            <div className="ui basic icon buttons">
                                <Toggle icon="target" name="exact" value={form.exact} onChange={handleInputChange}/>
                                <Toggle icon="certificate" name="verified" value={form.verified}
                                        onChange={handleInputChange}/>
                                <Toggle icon="disk" name="bd" value={form.bd} onChange={handleInputChange}/>
                                <Toggle icon="beer" name="uncensored" value={form.uncensored}
                                        onChange={handleInputChange}/>
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
