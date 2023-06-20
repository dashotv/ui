import * as React from 'react';
import { Link } from 'react-router-dom';

import { DownloadBanner } from './index';
import { useReleases } from './useReleases';

export function DownloadList(props) {
  const { torrents, nzbs, nzbStatus } = useReleases();

  return (
    <div>
      {props.downloads &&
        props.downloads.map(download => (
          <Link key={download.id} to={`/downloads/${download.id}`}>
            <DownloadBanner download={download} torrents={torrents} nzbs={nzbs} nzbStatus={nzbStatus} />
          </Link>
        ))}
    </div>
  );
}
