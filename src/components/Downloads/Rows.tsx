import * as React from 'react';
import { Link } from 'react-router-dom';

import { Download as DownloadType } from 'client/tower';

import { Paper, Stack, Typography } from '@mui/material';

import { Chrono, Row } from 'components/Common';

import { DownloadIcon } from '.';

export function DownloadRows({ downloads }: { downloads: DownloadType[] }) {
  return (
    <Paper elevation={0}>
      {downloads.map(({ id, status, created_at, medium }: DownloadType) => (
        <Row key={id}>
          <Stack width="100%" direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="center">
            <Stack width="100%" direction="row" spacing={1} alignItems="center" justifyContent="start">
              <DownloadIcon status={status} />
              <Link to={`/downloads/${id}`}>
                <Typography minWidth="0" noWrap color="primary">
                  {medium?.title}
                </Typography>
              </Link>
              <Typography minWidth="0" noWrap color="primary.dark">
                {medium?.display}
              </Typography>
            </Stack>
            <Stack minWidth="225px" direction="row" spacing={1} alignItems="center" justifyContent="end">
              <Typography maxWidth="125px" textAlign="right" variant="subtitle2" color="gray" noWrap>
                {created_at ? <Chrono fromNow>{created_at.toString()}</Chrono> : null}
              </Typography>
            </Stack>
          </Stack>
        </Row>
      ))}
    </Paper>
  );
  //   return (
  //     <>
  //       {downloads?.map(
  //         ({ id, status, multi, medium: { title, display: subtitle, cover, background } }: DownloadType) => {
  //           return (
  //             <Grid item key={id} md={4} xs={12}>
  //               <Link to={`/downloads/${id}`}>
  //                 <DownloadBanner
  //                   {...{
  //                     id,
  //                     title,
  //                     subtitle,
  //                     cover,
  //                     background,
  //                     status,
  //                     multi,
  //                   }}
  //                 />
  //               </Link>
  //             </Grid>
  //           );
  //         },
  //       )}
  //     </>
  //   );
}
