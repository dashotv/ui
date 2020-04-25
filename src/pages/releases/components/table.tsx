import React, {FunctionComponent} from 'react';
import {Icon, Table} from "semantic-ui-react";
import {Release, ReleaseProps} from './release';

type ReleaseListProps = {
    releases: ReleaseProps[],
}

const toFixed = (n: string | undefined, p: number): string => {
    if (!n) {
        n = "0"
    }
    const num = parseFloat(n)
    return num.toFixed(p)
}

export const ReleasesTable: FunctionComponent<ReleaseListProps> = ({releases}: ReleaseListProps) => {
    return (
        <Table singleLine compact fixed selectable striped style={{width: "100%"}}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={"2"}><Icon name={"question circle"}/></Table.HeaderCell>
                    {/*<Table.HeaderCell width={"2"}>Source</Table.HeaderCell>*/}
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell width={"2"}>Size</Table.HeaderCell>
                    <Table.HeaderCell width={"3"}>Published</Table.HeaderCell>
                    <Table.HeaderCell width={"2"}>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {(releases||[]).map((value: ReleaseProps) => {
                    return <Release key={value.id}
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
                                    size={toFixed(value.size, 3)}
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
            </Table.Body>
        </Table>
    );
}
