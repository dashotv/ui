import * as React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { useDownloading } from 'hooks/downloading';

import { DownloadBanner, DownloadType } from '.';

export function DownloadList({ downloads }: { downloads: DownloadType[] }) {
  const { get } = useDownloading();
  return (
    <>
      {downloads?.map(
        ({ id, status, multi, medium: { title, display: subtitle, cover, background } }: DownloadType) => {
          const {
            progress,
            eta,
            queue,
            files: { completed: files, selected: total },
            torrent_state: torrentState,
          } = get(id);
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
                    files,
                    total,
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
