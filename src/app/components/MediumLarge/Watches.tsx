import * as React from 'react';
import Moment from 'react-moment';

export default function Watches(props) {
  return (
    <div className="watches">
      <table
        className="vertical-table"
        // size="small"
        aria-label="a dense table"
      >
        <thead>
          <tr>
            <td className="date">Time</td>
            <td>User</td>
            <td>Media</td>
          </tr>
        </thead>
        <tbody>
          {props.data.map(({ id, username, player, watched_at, medium }) => (
            <WatchRow
              key={id}
              id={id}
              date={watched_at}
              user={username}
              player={player}
              medium={medium}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WatchRow(props) {
  return (
    <tr>
      <td className="date">
        <Moment format="YYYY-MM-DD" add={{ days: 1 }}>
          {props.date}
        </Moment>
      </td>
      <td className="user">{props.user}</td>
      <td>
        {props.medium.season_number}x{props.medium.episode_number}{' '}
        {props.medium.title}
      </td>
    </tr>
  );
}
