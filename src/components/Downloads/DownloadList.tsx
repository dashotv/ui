import * as React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { NewDownloadBanner } from 'components/Banner';
import { useReleases } from 'hooks/useReleases';
import { Download } from 'types/download';

export function DownloadList({ downloads }: { downloads: Download[] }) {
  const { progress, eta, queue } = useReleases();

  return (
    <>
      {downloads &&
        downloads.map(({ id, thash, status, medium: { title, display, cover, background } }: Download) => (
          <Grid item key={id} md={4} xs={12}>
            <Link to={`/downloads/${id}`}>
              <NewDownloadBanner
                id={id}
                title={title}
                subtitle={display}
                cover={cover}
                background={background}
                status={status}
                progress={progress(thash)?.toString()}
                queue={queue(thash)?.toString()}
                eta={eta(thash)?.toString()}
              />
            </Link>
          </Grid>
        ))}
    </>
  );
}
