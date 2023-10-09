import * as React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { useReleases } from 'hooks/useReleases';

import { DownloadBanner } from './index';

export function DownloadList(props) {
  const { torrents, nzbs, nzbStatus } = useReleases();

  return (
    <>
      {props.downloads &&
        props.downloads.map(download => (
          <Grid item key={download.id} md={4} xs={12}>
            <Link to={`/downloads/${download.id}`}>
              <DownloadBanner download={download} torrents={torrents} nzbs={nzbs} nzbStatus={nzbStatus} />
            </Link>
          </Grid>
        ))}
    </>
  );
}
