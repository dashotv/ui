import * as React from 'react';

import MediumSmall from 'components/MediumSmall';

export default function Media(props) {
  return (
    <div>
      {props.data.map(
        ({ id, series_id, title, display, description, cover, release_date, active, unwatched, completed }) => (
          <MediumSmall
            key={id}
            type={props.type}
            id={series_id || id}
            background={cover}
            primary={title}
            secondary={display}
            release={release_date}
            active={active}
            description={description}
            unwatched={unwatched}
            completed={completed}
          />
        ),
      )}
    </div>
  );
}
