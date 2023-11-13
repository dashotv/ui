import * as React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { DownloadBanner } from 'components/Banner';
import { useReleases } from 'hooks/useReleases';
import { Download } from 'types/download';

export function DownloadList({ downloads }: { downloads: Download[] }) {
  const { torrents, nzbs, nzbStatus } = useReleases();

  return (
    <>
      {downloads &&
        downloads.map((download: Download) => (
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
