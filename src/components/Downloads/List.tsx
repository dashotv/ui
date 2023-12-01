import * as React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import { useRelease } from 'hooks/useReleases';

import { DownloadBanner, DownloadType } from '.';

export function DownloadList({ downloads }: { downloads: DownloadType[] }) {
  return (
    <>
      {downloads?.map(({ id, thash, status, multi, medium: { title, display, cover, background } }: DownloadType) => {
        const {
          progress,
          eta,
          queue,
          files: { files: f, total: t },
          torrentState,
        } = useRelease(thash);
        // const { files: f, total: t } = multi ? files(thash) : { files: 0, total: 0 };
        // const p = progress(thash)?.toFixed(1);
        // const q = queue(thash)?.toString();
        // const e = eta(thash)?.toString();
        return (
          <Grid item key={id} md={4} xs={12}>
            <Link to={`/downloads/${id}`}>
              <DownloadBanner
                id={id}
                title={title}
                subtitle={display}
                cover={cover}
                background={background}
                status={status}
                torrentState={torrentState}
                progress={progress?.toFixed(1)}
                queue={queue?.toString()}
                eta={eta?.toString()}
                multi={multi}
                files={f}
                total={t}
              />
            </Link>
          </Grid>
        );
      })}
    </>
  );
}
