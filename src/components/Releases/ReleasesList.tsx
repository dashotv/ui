import React from 'react';
import { SiApplenews, SiUtorrent } from 'react-icons/si';
import { Link } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import Chrono from 'components/Chrono';
import { useReleaseSettingMutation } from 'query/releases';
import { Release } from 'types/release';

import { Group } from './Group';
import { Resolution } from './Resolution';

export function ReleasesList({ data, actions }: { data: Release[]; actions?: (row: Release) => JSX.Element }) {
  const releaseUpdate = useReleaseSettingMutation();

  const toggleVerified = row => {
    releaseUpdate.mutate({ id: row.id, setting: { setting: 'verified', value: !row.verified } });
  };

  return (
    <Paper elevation={0} sx={{ width: '100%' }}>
      {data &&
        data.map((row: Release) => (
          <Paper elevation={1} key={row.id} sx={{ width: '100%', mb: 1 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="center">
              <Stack direction="row" spacing={1} maxWidth={{ xs: '100%', md: '900px' }} pr="3px" alignItems="center">
                <Stack direction="row" alignItems="center">
                  <IconButton size="small" onClick={() => toggleVerified(row)} title="verified">
                    <CheckCircleIcon color={row.verified ? 'secondary' : 'action'} fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <SvgIcon
                      sx={{ width: '18px', height: '18px', mr: '3px' }}
                      component={row.nzb ? SiApplenews : SiUtorrent}
                      inheritViewBox
                      fontSize="small"
                    />
                  </IconButton>
                  <Typography
                    variant="overline"
                    noWrap
                    color="textSecondary"
                    sx={{ display: { xs: 'none', md: 'inherit' }, minWidth: '100px' }}
                  >
                    {row.source}:{row.type}
                  </Typography>
                </Stack>
                <Typography variant="h6" noWrap color="primary" sx={{ '& a': { color: 'primary.main' } }}>
                  <Link to={row.id} title={row.raw}>
                    {row.display || row.name}
                  </Link>
                </Typography>
                <Resolution resolution={row.resolution} variant="default" />
                <Group group={row.group} author={row.author} variant="default" />
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%', justifyContent: 'end' }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  {row.size && (
                    <Typography variant="subtitle2" color="textSecondary" pl="3px">
                      {row.size ? `${row.size}mb` : ''}
                    </Typography>
                  )}
                  <Typography noWrap variant="subtitle2" color="gray" pl="3px" width="100%">
                    {row.published_at && <Chrono fromNow>{row.published_at}</Chrono>}
                  </Typography>
                </Stack>
                <Box>{actions && actions(row)}</Box>
              </Stack>
            </Stack>
          </Paper>
        ))}
    </Paper>
  );
}
