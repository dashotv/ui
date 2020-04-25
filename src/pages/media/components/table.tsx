import React, {FunctionComponent} from "react";
import {Card} from "semantic-ui-react";
import {Media, MediaProps} from "./media";

type MediaListProps = {
    media: MediaProps[],
}

export const MediaTable: FunctionComponent<MediaListProps> = ({media}: MediaListProps) => {
    return (
        <Card.Group stackable>
            {(media || []).map((value: MediaProps) => {
                return <Media
                            key={value.id}
                            background={value.background}
                            id={value.id}
                            name={value.name}
                            title={value.title}
                            display={value.display}
                            release_date={value.release_date}
                            description={value.description}
                />
            })}
        </Card.Group>
    );
}
