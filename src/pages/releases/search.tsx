import React, {FunctionComponent, SyntheticEvent, useEffect, useState} from 'react';
import {Toggle} from "../../components/toggle"
import {Button, Dropdown, DropdownProps, Form, Input} from "semantic-ui-react"
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

const searchTypes = [
    {key: "tv", text: "TV", value: "tv"},
    {key: "anime", text: "Anime", value: "anime"},
    {key: "movies", text: "Movies", value: "movies"},
]
const searchSources = [
    {key: "yify", text: "YIFY", value: "yify"},
]
const searchResolutions = [
    {key: "2160", text: "2160", value: 2160},
    {key: "1080", text: "1080", value: 1080},
    {key: "720", text: "720", value: 720},
]

export const ReleasesSearch: FunctionComponent = () => {
    const [releases, setReleases] = useState<release[]>([]);
    // const [verified, setVerified] = useState<boolean>(true);
    const [form, setForm] = useState<formData>(initial)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getReleases();
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        console.log(name + " = " + value)
        setForm({...form, [name]: value})
    }

    const handleSelectChange = (name: string) => {
        return function (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) {
            setForm({...form, [name]: data.value})
        }
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
            text: form.title,
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
        <div className={"fluid"}>
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Field width={2}>
                            <Input placeholder="title" name="title" type="text" value={form.title}
                                   onChange={handleInputChange}/>
                        </Form.Field>
                        <Form.Field width={2}>
                            <Input placeholder="year" name="year" type="text" value={form.year}
                                   onChange={handleInputChange}/>
                        </Form.Field>
                        <Form.Field width={2}>
                            <Input placeholder="season" name="season" type="number" value={form.season}
                                   onChange={handleInputChange}/>
                        </Form.Field>
                        <Form.Field width={2}>
                            <Input placeholder="episode" name="episode" type="number" value={form.episode}
                                   onChange={handleInputChange}/>
                        </Form.Field>
                        <Form.Field width={2}>
                            <Dropdown placeholder="source" name="source" value={form.source}
                                      style={{minWidth: "4em"}} clearable selection options={searchSources}
                                      onChange={handleSelectChange("source")}/>
                        </Form.Field>
                        <Form.Field width={2}>
                            <Dropdown placeholder="Type" name="type" value={form.type}
                                      style={{minWidth: "4em"}} clearable selection options={searchTypes}
                                      onChange={handleSelectChange("type")}/>
                        </Form.Field>
                        <Form.Field width={2}>
                            <Dropdown placeholder="Resolution" name="resolution" value={form.resolution}
                                      style={{minWidth: "4em"}} clearable selection options={searchResolutions}
                                      onChange={handleSelectChange("resolution")}/>
                        </Form.Field>
                        <Form.Field>
                            <Button.Group>
                                <Toggle icon="target" name="exact" value={form.exact} title={"exact"} onChange={handleInputChange}/>
                                <Toggle icon="certificate" name="verified" value={form.verified} title={"verified"}
                                        onChange={handleInputChange}/>
                                <Toggle icon="disk" name="bd" value={form.bd} title={"bluray"} onChange={handleInputChange}/>
                                <Toggle icon="beer" name="uncensored" value={form.uncensored} title={"uncensored"}
                                        onChange={handleInputChange}/>
                            </Button.Group>
                        </Form.Field>
                        <Form.Field>
                            <Button.Group>
                                <Button type={"submit"} icon={"rocket"}/>
                                <Button type={"reset"} icon={"undo"}/>
                            </Button.Group>
                        </Form.Field>
                    </Form.Group>
                </Form>
            </div>
            <div>
                <ReleasesTable releases={releases}/>
            </div>
        </div>
    )
}
