import React from 'react';
import { useForm } from 'react-hook-form';
import Truncate from 'react-truncate-inside';

import { Episode, Overrides } from 'client/tower';

import CheckCircle from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DownloadForOffline from '@mui/icons-material/DownloadForOffline';
import NextPlan from '@mui/icons-material/NextPlan';
import Visibility from '@mui/icons-material/Visibility';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import { Chrono, LoadingIndicator, Text } from '@dashotv/components';

import { FilesList, useQueryFiles } from 'components/Files';

import { SeasonEpisodeAbsolute } from './Sea';
import { useEpisodeMutation } from './query';

export const EpisodeDialog = ({
  open,
  handleClose,
  kind,
  episode,
}: {
  episode: Episode;
  open: boolean;
  kind: string;
  handleClose: () => void;
}) => {
  const {
    id,
    title,
    created_at,
    updated_at,
    season_number: season,
    episode_number: number,
    absolute_number: absolute,
    release_date: release,
    missing,
    description,
    overrides,
    skipped,
    downloaded,
    completed,
    watched,
  } = episode;
  if (!id) {
    return null;
  }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { control, handleSubmit } = useForm<Overrides>({ values: overrides });
  const { data, isLoading } = useQueryFiles(1, id, 20);
  const update = useEpisodeMutation(id);

  const submit = (data: Overrides) => {
    episode.overrides = data;
    update.mutate(episode);
    handleClose();
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth fullScreen={fullScreen} maxWidth="lg">
      <DialogTitle>
        <Typography>Edit Episode ({id})</Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
          <Stack width="100%" direction="column" spacing={1}>
            {/* <Typography variant="subtitle2" color="textSecondary" sx={{ position: 'relative', bottom: '-4px' }}>
              Title
            </Typography> */}
            <Stack minWidth="0" direction="column" spacing={0} alignItems="baseline">
              <Stack direction="row" spacing={1} width="100%" justifyContent="space-between">
                <Typography component="div" noWrap color="primary" fontWeight="bolder">
                  <Truncate text={title || 'episode'} />
                </Typography>
                <Stack direction="row" spacing={1}>
                  <NextPlan fontSize="small" color={skipped ? 'secondary' : 'disabled'} />
                  <DownloadForOffline fontSize="small" color={downloaded ? 'secondary' : 'disabled'} />
                  <CheckCircle fontSize="small" color={completed ? 'secondary' : 'disabled'} />
                  <Visibility fontSize="small" color={watched ? 'secondary' : 'disabled'} />
                </Stack>
              </Stack>
              <Stack direction="row" spacing={1} width="100%" justifyContent="space-between">
                <Stack direction="row" spacing={1}>
                  <Typography
                    noWrap
                    title={`${number} #${absolute}`}
                    variant="caption"
                    color={missing ? 'error' : 'gray'}
                    minWidth="70px"
                  >
                    <SeasonEpisodeAbsolute {...{ kind, season, episode: number, absolute }} />
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Typography noWrap variant="caption" color="primary">
                    release
                  </Typography>
                  <Typography noWrap variant="caption" color="primary.dark">
                    <Chrono stamp={release} />
                  </Typography>
                  <Typography noWrap variant="caption" color="primary">
                    created
                  </Typography>
                  <Typography variant="caption" color="primary.dark">
                    <Chrono fromNow stamp={created_at} />
                  </Typography>
                  <Typography noWrap variant="caption" color="primary">
                    updated
                  </Typography>
                  <Typography variant="caption" color="primary.dark">
                    <Chrono fromNow stamp={updated_at} />
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            {/* <Typography variant="subtitle2" color="textSecondary" sx={{ position: 'relative', bottom: '-4px' }}>
              Description
            </Typography> */}
            <Box sx={{ pt: 1, pb: 1, pr: 2 }}>
              {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
            </Box>
            <Stack width="100%" direction="column" spacing={1}>
              <Typography variant="subtitle2" color="primary.dark" sx={{ position: 'relative', bottom: '-4px' }}>
                Files
              </Typography>
              <FilesList data={data?.result} />
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 3, width: '100%', justifyContent: 'end' }}>
              <Stack direction="row" spacing={1}>
                <Text
                  name="season_number"
                  label={`season (${season})`}
                  placeholder={overrides?.season_number || season?.toString() || ''}
                  control={control}
                />
                <Text
                  name="episode_number"
                  label={`episode (${number})`}
                  placeholder={overrides?.episode_number || number?.toString() || ''}
                  control={control}
                />
                <Text
                  name="absolute_number"
                  label={`absolute (${absolute})`}
                  placeholder={overrides?.absolute_number || absolute?.toString() || ''}
                  control={control}
                />
              </Stack>
              <Button variant="contained" onClick={() => handleClose()}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Ok
              </Button>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
