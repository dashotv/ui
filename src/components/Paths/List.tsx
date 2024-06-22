import React, { useState } from 'react';
import { RiEditCircleFill } from 'react-icons/ri';

import { Path } from 'client/tower';
import { clickHandler } from 'utils/handler';

import CancelIcon from '@mui/icons-material/Cancel';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
import { Theme } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';

import { ButtonMap, ButtonMapButton, Chrono, Megabytes, Resolution, Row } from '@dashotv/components';

import { useMutationPathRemove } from './query';

export function PathsList({ medium_id, paths }: { medium_id: string; paths?: Path[] }) {
  if (!paths) return null;
  const [hidden, setHidden] = useState(true);
  const [showold, setShowold] = useState(true);
  const remover = useMutationPathRemove();
  const removePath = (id: string, medium_id: string) => {
    remover.mutate({ id, medium_id });
  };
  return (
    <Paper elevation={0}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button onClick={() => setHidden(!hidden)}>{hidden ? 'show' : 'hide'} images</Button>
        <Button onClick={() => setShowold(!showold)}>{showold ? 'show' : 'hide'} old</Button>
      </Stack>
      {paths.map((path, i) => {
        if (hidden && path.extension === 'jpg') return null;
        if (showold && path.old) return null;
        return <PathsRow key={i} {...{ medium_id, path, removePath }} />;
      })}
    </Paper>
  );
}

export const PathIcon = ({
  extension,
  type,
  old,
  rename,
}: {
  extension?: string;
  type?: string;
  old?: boolean;
  rename?: boolean;
}) => {
  const color = rename ? 'warning' : old ? 'disabled' : 'info';
  if (extension === 'jpg') return <ImageIcon fontSize="small" color={color} />;
  if (type === 'video') return <MovieIcon fontSize="small" color={color} />;
  if (type === 'subtitle') return <ClosedCaptionIcon fontSize="small" color={color} />;
  return <Box sx={{ width: '20px', height: '20px' }} />;
};

function PathsRow({
  path: { id, extension, local, type, size, resolution, old, rename, updated_at },
  medium_id,
  removePath,
}: {
  path: Path;
  medium_id: string;
  removePath: (id: string, medium_id: string) => void;
}) {
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
      Icon: CancelIcon,
      color: 'error',
      click: clickHandler(() => id && removePath(id, medium_id)),
      title: 'delete forever',
    },
  ];
  const Path = ({ local, extension }: { local?: string; extension?: string }) => {
    if (!local) return null;
    const list = local.split('/');
    return `${list[list.length - 1]}.${extension}`;
  };
  return (
    <Row>
      <Stack
        width="100%"
        minWidth="0"
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 0, md: 1 }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack minWidth="0" width="100%" direction="row" spacing={1} alignItems="center">
          {matches && <PathIcon {...{ extension, type, old, rename }} />}
          <Typography title={`${local}.${extension}`} fontWeight="bolder" noWrap color="primary">
            {old && 'old'}
            <Path {...{ local, extension }} />
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
          {!matches && <PathIcon {...{ extension, type, old, rename }} />}
          {!matches && <Resolution resolution={resolution} />}
          {size ? <Megabytes value={size} ord="bytes" /> : null}
          <Typography variant="subtitle2" noWrap color="gray">
            <Chrono fromNow>{updated_at?.toString()}</Chrono>
          </Typography>
          <ButtonMap buttons={buttons} size="small" />
        </Stack>
      </Stack>
    </Row>
  );
}
