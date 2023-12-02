import React, { useState } from 'react';
import { RiEditCircleFill } from 'react-icons/ri';

import CancelIcon from '@mui/icons-material/Cancel';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { ButtonMap, ButtonMapButton, Chrono, Megabytes, Resolution } from 'components/Common';
import { Path } from 'components/Media/types';

export function Paths({ paths }: { paths: Path[] }) {
  const [hidden, setHidden] = useState(true);
  return (
    <Paper elevation={0}>
      {paths.map(({ extension, local, type, size, resolution, updated_at }, i) => {
        if (hidden && extension === 'jpg') return null;
        return <PathsRow key={i} i={i} {...{ extension, local, type, size, resolution, updated_at }} />;
      })}
      <Paper elevation={0} sx={{ width: '100%' }}>
        <Button onClick={() => setHidden(!hidden)}>{hidden ? 'show' : 'hide'} images</Button>
      </Paper>
    </Paper>
  );
}

function PathsRow({ i, extension, local, type, size, resolution, updated_at }: { i: number } & Path) {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'), { noSsr: true });
  const buttons: ButtonMapButton[] = [
    {
      Icon: SvgIcon,
      Component: RiEditCircleFill,
      color: 'primary',
      click: () => console.log('edit'),
      title: 'edit',
    },
    {
      Icon: RemoveCircleIcon,
      color: 'warning',
      click: () => console.log('delete'),
      title: 'delete',
    },
    {
      Icon: CancelIcon,
      color: 'error',
      click: () => console.log('delete forever'),
      title: 'delete forever',
    },
  ];
  const PathIcon = ({ extension, type }: { extension?: string; type?: string }) => {
    if (extension === 'jpg') return <ImageIcon fontSize="small" color="disabled" />;
    if (type === 'video') return <MovieIcon fontSize="small" color="disabled" />;
    if (type === 'subtitle') return <ClosedCaptionIcon fontSize="small" color="disabled" />;
    return null;
  };
  return (
    <Paper key={i} elevation={1} sx={{ mb: 1, pr: 1, pl: 1, width: '100%' }}>
      <Stack
        width="100%"
        minWidth="0"
        direction={{ xs: 'column', md: 'row' }}
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack minWidth="0" width="100%" direction="row" spacing={1} alignItems="center">
          {matches && <PathIcon {...{ extension, type }} />}
          <Typography variant="h6" noWrap color="primary">
            {local}.{extension}
          </Typography>
          {matches && <Resolution resolution={resolution} />}
        </Stack>
        <Stack
          minWidth={{ xs: '100%', md: '250px' }}
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="end"
        >
          {!matches && <PathIcon {...{ extension, type }} />}
          {!matches && <Resolution resolution={resolution} />}
          {size && <Megabytes value={size} ord="bytes" />}
          <Typography variant="subtitle2" noWrap color="gray">
            <Chrono fromNow>{updated_at?.toString()}</Chrono>
          </Typography>
          <ButtonMap buttons={buttons} size="small" />
        </Stack>
      </Stack>
    </Paper>
  );
}
