import React from 'react';
import {useAsync} from "react-async"

import './index.css';
import {Release, ReleaseProps} from '../Release'

const fetchReleases = async () => {
    const response = await fetch(`/api/scry/releases/`);
    console.log(response);
    return response.json()
};

const ReleaseList = () => {
    const {data, error, isLoading} = useAsync({promiseFn: fetchReleases});
    if (isLoading) return (
        <div className="Releases">
            <div className="ui large text loader">Loading</div>
        </div>
    );
    if (error) return (
        <div className="Releases">
            <div>error: {error.message}</div>
        </div>
    );
    if (data) return (
        <table className="ui single line selectable striped table">
            <thead>
            <tr>
                <th>Type</th>
                <th>Title</th>
                <th>Published</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {data['Releases'].map((value: ReleaseProps) => {
                return <Release
                    id={value.id}
                    name={value.name}
                    year={value.year}
                    display={value.display}
                    raw={value.raw}
                    title={value.title}
                    description={value.description}
                    season={value.season}
                    episode={value.episode}
                    volume={value.volume}
                    size={value.size}
                    encoding={value.encoding}
                    resolution={value.resolution}
                    quality={value.quality}
                    group={value.group}
                    author={value.author}
                    groupauthor={value.groupauthor}
                    verified={value.verified}
                    bluray={value.bluray}
                    nzb={value.nzb}
                    uncensored={value.uncensored}
                    checksum={value.checksum}
                    view={value.view}
                    download={value.download}
                    source={value.source}
                    type={value.type}
                    created_at={value.created_at}
                    published_at={value.published_at}
                />
            })}
            </tbody>
        </table>
    );
    return (
        <div className="Releases"></div>
    );
}

export default ReleaseList;
