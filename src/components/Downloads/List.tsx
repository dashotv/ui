import * as React from 'react';
import { Link } from 'react-router-dom';

import { Download as DownloadType } from 'client/tower';

import Grid from '@mui/material/Grid';

import { useDownloading } from 'hooks/downloading';

import { DownloadBanner } from '.';

export function DownloadList({ downloads }: { downloads: DownloadType[] }) {
  const { get } = useDownloading();
  return (
    <>
      {downloads?.map(
        ({ id, title, display: subtitle, cover, background, status, multi, updated_at }: DownloadType) => {
          if (!id) return null;
          const { progress, eta, queue, torrent_state: torrentState, files } = get(id);
          const { completed, selected } = files || {};

          return (
            <Grid item key={id} md={4} xs={12}>
              <Link to={`/downloads/${id}`}>
                <DownloadBanner
                  {...{
                    id,
                    title,
                    subtitle,
                    cover,
                    background,
                    status,
                    torrentState,
                    progress,
                    eta,
                    queue,
                    multi,
                    files: completed,
                    total: selected,
                    updated_at,
                  }}
                />
              </Link>
            </Grid>
          );
        },
      )}
    </>
  );
}
