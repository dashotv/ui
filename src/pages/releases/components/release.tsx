import React, {FunctionComponent} from 'react';
import {Icon, Item, Label} from "semantic-ui-react";

const renderSwitch = (value: string | undefined) => {
    switch (value) {
        case 'tv':
            return <Icon name='tv' size='small'/>;
        case 'movies':
            return <Icon name='video camera' size='small'/>;
        default:
            return <Icon name='question circle' size='small'/>;
    }
};

const renderResolution = (value: string | undefined) => {
    if (value) {
        return <Label>{value}</Label>
    }
    return ""
};

const renderVerified = (value: boolean | undefined) => {
    return <Icon name={"certificate"} disabled={!value}/>
}

export type ReleaseProps = {
    id?: string,
    name?: string,
    year?: bigint,
    display?: string,
    raw?: string,
    title?: string,
    description?: string,
    season?: bigint,
    episode?: bigint,
    volume?: string,
    size?: string,
    encoding?: string,
    resolution?: string,
    quality?: string,
    group?: string,
    author?: string,
    groupauthor?: string,
    verified?: boolean,
    bluray?: boolean,
    nzb?: boolean,
    uncensored?: boolean,
    checksum?: string,
    view?: string,
    download?: string,
    source?: string,
    type?: string,
    created_at?: string,
    published_at?: string,
}

export const Release: FunctionComponent<ReleaseProps> = (release) =>
    <tr key={release.id}>
        <td className="collapsing">{renderVerified(release.verified)}</td>
        <td className="collapsing">
            <Item.Image>
                {release.source} : {renderSwitch(release.type)}
            </Item.Image>
        </td>
        <td>{release.display} {renderResolution(release.resolution)} {release.groupauthor}</td>
        <td className="collapsing">{release.size}</td>
        <td className="collapsing">{release.published_at}</td>
        <td className="collapsing"></td>
    </tr>

/*
    <Item>
        <Item.Image>
            {renderSwitch(o.type)}
        </Item.Image>
        <Item.Content>
            <Item.Header>
                {o.display} {renderResolution(o.resolution)} {o.groupauthor}
            </Item.Header>
            <Item.Meta>{o.published_at}</Item.Meta>
        </Item.Content>
    </Item>
 */
