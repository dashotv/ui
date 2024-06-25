import React from 'react';
import { RiEditCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { Directory } from 'client/tower';
import { clickHandler } from 'utils/handler';

import CancelIcon from '@mui/icons-material/Cancel';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Paper, Stack, Typography } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

import { ButtonMap, ButtonMapButton, Row } from '@dashotv/components';

export const DirectoriesList = ({ data }: { data?: Directory[] }) => {
  return (
    <Paper elevation={0} sx={{ p: 1, mb: 2 }}>
      {data?.map((dir: Directory) => <DirectoryRow key={dir.path} directory={dir} />)}
    </Paper>
  );
};
const Icon = ({ count }: { count?: number }) => {
  if (count === 0) {
    return <FolderOpenIcon fontSize="small" color="info" />;
  }
  return <FolderIcon fontSize="small" color="info" />;
};
export const DirectoryRow = ({ directory: { name, path, count } }: { directory: Directory }) => {
  const buttons: ButtonMapButton[] = [
    {
      Icon: SvgIcon,
      Component: RiEditCircleFill,
      color: 'primary',
      click: clickHandler(() => console.log('edit')),
      title: 'edit',
    },
    {
      Icon: CancelIcon,
      color: 'error',
      click: clickHandler(() => console.log('delete')),
      title: 'delete forever',
    },
  ];
  return (
    <Row>
      <Link to={`/admin/files/${path}`}>
        <Stack
          width="100%"
          minWidth="0"
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 0, md: 1 }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack minWidth="0" width="100%" direction="row" spacing={1} alignItems="center">
            <Icon count={count} />
            <Typography title={path} fontWeight="bolder" noWrap color="primary">
              {name}
            </Typography>
          </Stack>
          <Stack
            minWidth={{ xs: '100%', md: '250px' }}
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="end"
          >
            <Typography variant="body2" color="text.secondary">
              {count}
            </Typography>
            <ButtonMap buttons={buttons} size="small" />
          </Stack>
        </Stack>
      </Link>
    </Row>
  );
};
