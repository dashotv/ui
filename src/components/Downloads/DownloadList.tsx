import * as React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { DownloadBanner } from 'components/Banner';
import { useReleases } from 'hooks/useReleases';

export function DownloadList(props) {
  const { torrents, nzbs, nzbStatus } = useReleases();

  return (
    <>
      {props.downloads &&
        props.downloads.map(download => (
          <Grid item key={download.id} md={4} xs={12}>
            <Link to={`/downloads/${download.id}`}>
              <DownloadBanner
                id={download.id}
                download={download}
                torrents={torrents}
                nzbs={nzbs}
                nzbStatus={nzbStatus}
              />
            </Link>
          </Grid>
        ))}
    </>
  );
}
