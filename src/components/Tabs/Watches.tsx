import * as React from 'react';

import Chrono from 'components/Chrono';
import { Watch } from 'types/medium';

export default function Watches({ data }: { data: Watch[] }) {
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
        <tbody>{data?.map(watch => <WatchRow key={watch.id} {...watch} />)}</tbody>
      </table>
    </div>
  );
}

function WatchRow({ id, username, watched_at, medium }: Watch) {
  const { season_number, episode_number, title } = medium || {};
  return (
    <tr key={id}>
      <td className="date">
        <Chrono format="YYYY-MM-DD">{watched_at.toString()}</Chrono>
      </td>
      <td className="user">{username}</td>
      <td>
        {season_number}x{episode_number} {title}
      </td>
    </tr>
  );
}
