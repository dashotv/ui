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
  function progress(thash) {
    if (props.torrents == null) {
      return;
    }
    const torrent = props.torrents.get(thash);
    if (torrent) {
      // console.log('hash:', thash, ' progress:', torrent.Progress);
      return torrent.Progress;
    }
    return 0;
  }
  return (
    <div>
      {props.data.map(({ id, thash, medium }) => (
        <MediumSmall
          key={id}
          type={type(medium.type)}
          id={getID(medium)}
          background={medium.cover}
          primary={medium.title}
          secondary={medium.display}
          release={medium.release_date}
          progress={progress(thash)}
          download={true}
        />
      ))}
    </div>
  );
}
