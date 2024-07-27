import React from 'react';
import { useForm } from 'react-hook-form';
import Truncate from 'react-truncate-inside';

import { Episode, Overrides } from 'client/tower';

import CloseIcon from '@mui/icons-material/Close';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import { Text } from '@dashotv/components';

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
  } = episode;
  if (!id) {
    return null;
  }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { control, handleSubmit } = useForm<Overrides>({ values: overrides });
  const update = useEpisodeMutation(id);

  const submit = (data: Overrides) => {
    episode.overrides = data;
    update.mutate(episode);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth fullScreen={fullScreen} maxWidth="md">
      <DialogTitle>
        <Typography noWrap color="primary" fontWeight="bolder">
          Edit Episode
        </Typography>
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
              <Typography component="div" noWrap color="primary" fontWeight="bolder">
                <Truncate text={title || 'episode'} />
              </Typography>
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
            {/* <Typography variant="subtitle2" color="textSecondary" sx={{ position: 'relative', bottom: '-4px' }}>
              Description
            </Typography> */}
            <Box sx={{ pt: 2, pb: 2, pr: 2 }}>
              {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
            </Box>
            <Stack width="100%" direction="column" spacing={1}>
              <Typography variant="subtitle2" color="primary.dark" sx={{ position: 'relative', bottom: '-4px' }}>
                Overrides
              </Typography>
              <Stack direction="row" spacing={1}>
                <Text name="season_number" label="season" control={control} />
                <Text name="episode_number" label="episode" control={control} />
                <Text name="absolute_number" label="absolute" control={control} />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Stack width="100%" direction="column" spacing={1}>
                <Typography variant="subtitle2" color="primary.dark" sx={{ position: 'relative', bottom: '-4px' }}>
                  ID
                </Typography>
                <Typography minHeight="24px" variant="body1" color="primary">
                  {id}
                </Typography>
              </Stack>
              <Stack width="100%" direction="column" spacing={1}>
                <Typography variant="subtitle2" color="primary.dark" sx={{ position: 'relative', bottom: '-4px' }}>
                  Created
                </Typography>
                <Typography minHeight="24px" variant="body1" color="primary">
                  {created_at}
                </Typography>
              </Stack>

              <Stack width="100%" direction="column" spacing={1}>
                <Typography variant="subtitle2" color="primary.dark" sx={{ position: 'relative', bottom: '-4px' }}>
                  Updated
                </Typography>
                <Typography minHeight="24px" variant="body1" color="primary">
                  {updated_at}
                </Typography>
              </Stack>

              <Stack width="100%" direction="column" spacing={1}>
                <Typography variant="subtitle2" color="primary.dark" sx={{ position: 'relative', bottom: '-4px' }}>
                  Release
                </Typography>
                <Typography minHeight="24px" variant="body1" color="primary">
                  {release ? new Date(release).toDateString() : null}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 3, width: '100%', justifyContent: 'end' }}>
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
