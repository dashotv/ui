import * as React from 'react';
import { Link } from 'react-router-dom';

import { Download as DownloadType } from 'client/tower';

import Grid from '@mui/material/Grid';

import { DownloadCard } from './Card';

export function DownloadList({ downloads }: { downloads: DownloadType[] }) {
  return (
    <>
      {downloads?.map((download: DownloadType) => {
        if (!download?.id) return null;
        return (
          <Grid item key={download.id} md={4} xs={12}>
            <Link to={`/downloads/${download.id}`}>
              <DownloadCard id={download.id} download={download} />
            </Link>
          </Grid>
        );
      })}
    </>
  );
}
