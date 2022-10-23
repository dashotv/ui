import * as React from 'react';
import Media from '../Media';
import { MediumSmall } from '../Medium';
import { useEffect } from 'react';

export default function Downloads(props) {
  function type(t) {
    switch (t) {
      case 'Episode':
        return 'series';
      case 'Series':
        return 'series';
      case 'Movie':
        return 'movies';
    }
  }
  return (
    <div>
      {props.data.map(({ id, medium }) => (
        <MediumSmall
          key={id}
          type={type(medium.type)}
          id={medium.series_id || medium.id}
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
