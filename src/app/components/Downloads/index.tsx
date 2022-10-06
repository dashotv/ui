import * as React from 'react';
import Media from '../Media';
import { MediumSmall } from '../Medium';
import { useEffect } from 'react';

export default function Downloads(props) {
  return (
    <div>
      {props.data.map(({ id, medium }) => (
        <MediumSmall
          key={id}
          id={medium.id}
          background={medium.cover}
          primary={medium.title}
          secondary={medium.display}
          release={medium.release_date}
        />
      ))}
    </div>
  );
}
