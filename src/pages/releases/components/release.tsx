import React, {FunctionComponent} from 'react';
import {Button, Icon, Label, Table} from "semantic-ui-react";

// const renderSwitch = (value: string | undefined) => {
//     switch (value) {
//         case 'tv':
//             return <Icon name='tv' size='small'/>;
//         case 'movies':
//             return <Icon name='video camera' size='small'/>;
//         case 'anime':
//             return <Icon name='dragon' size='small'/>;
//         default:
//             return <Icon name='question circle' size='small'/>;
//     }
// };

const renderResolution = (value: string | undefined) => {
    if (value) {
        return <Label horizontal size={"tiny"}>{value}</Label>
    }
    return ""
};

const renderIcon = (icon: any, value: boolean | undefined) => {
    return <Icon name={icon} disabled={!value}/>
}

export type ReleaseProps = {
    id?: string,
    name?: string,
    year?: number,
    display?: string,
    raw?: string,
    title?: string,
    description?: string,
    season?: number,
    episode?: number,
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
    <Table.Row key={release.id}>
        <Table.Cell className="collapsing">
            {renderIcon("certificate", release.verified)}
            {renderIcon("disk", release.bluray)}
            {renderIcon("beer", release.uncensored)}
            <Label horizontal basic color={"blue"} size={"mini"} title={release.source}>{release.source?.charAt(0)}</Label>
            <Label horizontal basic size={"mini"} title={release.type}>{release.type?.charAt(0)}</Label>
        </Table.Cell>
        {/*<Table.Cell collapsing>*/}
            {/*<Label horizontal basic color={"blue"} size={"tiny"}>{release.source}</Label>*/}
            {/*<Label horizontal basic size={"tiny"}>{release.type}</Label>*/}
            {/*{release.source}:{release.type}*/}
        {/*</Table.Cell>*/}
        <Table.Cell>{release.display} {renderResolution(release.resolution)} {release.groupauthor}</Table.Cell>
        <Table.Cell collapsing>{release.size}</Table.Cell>
        <Table.Cell collapsing>{release.published_at}</Table.Cell>
        <Table.Cell collapsing>
            <Button.Group size={"mini"}>
                <Button icon={"undo"}/>
                <Button icon={"search"}/>
                <Button icon={"download"}/>
                <Button icon={"times circle"}/>
            </Button.Group>
        </Table.Cell>
    </Table.Row>

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
