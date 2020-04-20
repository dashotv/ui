import React, {FunctionComponent} from 'react';
import './index.css';
import {Icon, Item, Label} from "semantic-ui-react";

const renderSwitch = (value: string) => {
    switch (value) {
        case 'tv':
            return <Icon name='tv' size='small'/>;
        case 'movies':
            return <Icon name='video camera' size='small'/>;
        default:
            return <Icon name='question circle' size='small'/>;
    }
};

const renderResolution = (value: string) => {
    if (value) {
        return <Label>{value}</Label>
    }
    return ""
};


export type ReleaseProps = {
    id: string,
    name: string,
    year: bigint,
    display: string,
    raw: string,
    title: string,
    description: string,
    season: bigint,
    episode: bigint,
    volume: string,
    size: string,
    encoding: string,
    resolution: string,
    quality: string,
    group: string,
    author: string,
    groupauthor: string,
    verified: boolean,
    bluray: boolean,
    nzb: boolean,
    uncensored: boolean,
    checksum: string,
    view: string,
    download: string,
    source: string,
    type: string,
    created_at: string,
    published_at: string,
}

export const Release: FunctionComponent<ReleaseProps> = (o) =>
    <tr>
        <td className="collapsing">
            <Item.Image>
                {renderSwitch(o.type)}
            </Item.Image>
        </td>
        <td>{o.display} {renderResolution(o.resolution)} {o.groupauthor}</td>
        <td>{o.published_at}</td>
        <td></td>
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
