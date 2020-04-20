import React from 'react';
import {useAsync} from "react-async"

import './index.css';
import {Release, ReleaseProps} from '../Components/Release'
import {Container, Item} from 'semantic-ui-react'

const fetchReleases = async () => {
    const response = await fetch(`/api/scry/releases/`);
    console.log(response);
    return response.json()
}


const Releases = () => {
    const {data, error, isLoading} = useAsync({promiseFn: fetchReleases});
    if (isLoading) return(
        <div className="Releases">
            <div>loading</div>
        </div>
    )
    if (error) return (
        <div className="Releases">
            <div>error: {error.message}</div>
        </div>
    );
    if (data) return (
        <div className="Releases">
            <Container>
                <Item.Group>
                    {data['Releases'].map((value:ReleaseProps) => {
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
                </Item.Group>
            </Container>
        </div>
    );
    return (
        <div className="Releases"></div>
    );
}

export default Releases;
