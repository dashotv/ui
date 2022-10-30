import * as React from 'react';
import MediumSmall from '../MediumSmall';

export default function Downloads(props) {
  function type(t) {
    switch (t) {
      case 'Movie':
        return 'movies';
      default:
        return 'series';
    }
  }
  function getID(medium) {
    switch (medium.type) {
      case 'Episode':
        return medium.series_id;
      default:
        return medium.id;
    }
  }
  return (
    <div>
      {props.data.map(({ id, medium }) => (
        <MediumSmall
          key={id}
          type={type(medium.type)}
          id={getID(medium)}
          background={medium.cover}
          primary={medium.title}
          secondary={medium.display}
          release={medium.release_date}
          download={true}
        />
      ))}
    </div>
  );
}
