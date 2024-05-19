import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Medium } from 'client/tower';

import CloseIcon from '@mui/icons-material/Close';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import SportsBarOutlinedIcon from '@mui/icons-material/SportsBarOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Chrono, Pill } from '@dashotv/components';

import { IconCheckbox, Select, Text } from 'components/Form';
import { MediaCoverImage } from 'components/Media';
import { useMovieUpdateMutation } from 'components/Movies/query';
import { getSeriesBackgrounds, getSeriesCovers, useSeriesUpdateMutation } from 'components/Series';
import { Kinds, ReleaseSources, ReleaseTypes, Resolutions, Sources } from 'types/constants';

export type DetailsProps = {
  medium: Medium;
};
export function Details({
  medium,
  medium: { type, cover, background, search_params, title, description, release_date, created_at, updated_at },
}: DetailsProps) {
  const { id } = useParams();
  if (!id) {
    return <></>;
  }

  const { handleSubmit, control } = useForm({ values: medium });
  const series = useSeriesUpdateMutation(id);
  const movie = useMovieUpdateMutation(id);
  const [images, setImages] = React.useState<string[]>([]);
  const [coverOpen, setCoverOpen] = React.useState(false);
  const [backgroundOpen, setBackgroundOpen] = React.useState(false);
  const [updated] = React.useState(Date.parse(updated_at || '').valueOf() / 1000);

  const currentCover = () => {
    if (!medium.paths || medium.paths.length === 0) {
      return;
    }
    for (const path of medium.paths) {
      if (path.type === 'cover') {
        return path.remote;
      }
    }
  };
  const chooseCover = () => {
    setCoverOpen(true);
    getCovers()?.then(covers => {
      setImages(covers.result);
    });
  };
  const selectCover = (url: string) => {
    console.log('selectCover:', url);
    setCoverOpen(false);
    if (url != '') {
      submit({ ...medium, cover: url });
    }
  };
  const getCovers = () => {
    switch (type) {
      case 'Series':
        return getSeriesCovers(id);
      // case 'Movie':
      // return movieCovers();
    }
  };

  const currentBackground = () => {
    if (!medium.paths || medium.paths.length === 0) {
      return;
    }
    for (const path of medium.paths) {
      if (path.type === 'background') {
        return path.remote;
      }
    }
  };
  const chooseBackground = () => {
    setBackgroundOpen(true);
    getBackgrounds()?.then(backgrounds => {
      setImages(backgrounds.result);
    });
  };
  const selectBackground = (url: string) => {
    console.log('selectBackground:', url);
    setBackgroundOpen(false);
    if (url != '') {
      submit({ ...medium, background: url });
    }
  };
  const getBackgrounds = () => {
    switch (type) {
      case 'Series':
        return getSeriesBackgrounds(id);
      // case 'Movie':
      // return movieCovers();
    }
  };

  const submit = (data: Medium) => {
    console.log('data:', data);
    switch (type) {
      case 'Series':
        series.mutate(data);
        break;
      case 'Movie':
        movie.mutate(data);
        break;
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
      <Stack sx={{ width: '100%' }} direction="column" spacing={2}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <Paper sx={{ p: 2, width: '100%' }}>
            <Typography noWrap variant="h6" color="primary">
              Common
            </Typography>
            <Stack direction="column" spacing={1}>
              <Text name="display" control={control} />
              <Text name="directory" control={control} />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Select name="kind" options={type ? Kinds[type] : ''} control={control} />
                <Select name="source" options={Sources} control={control} />
                <Text name="source_id" control={control} />
              </Stack>
            </Stack>
          </Paper>
          <Paper sx={{ p: 2, width: '100%' }}>
            <Typography noWrap variant="h6" color="primary">
              Search
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Stack sx={{ width: '100%' }} direction="column" spacing={1}>
                {search_params && (
                  <>
                    <Text name="search" control={control} />
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Select
                        name="search_params.resolution"
                        label="resolution"
                        disabled={type != 'Series'}
                        options={Resolutions}
                        control={control}
                      />
                      <Select
                        name="search_params.source"
                        disabled={type != 'Series'}
                        label="source"
                        options={ReleaseSources}
                        control={control}
                      />
                      <Select
                        name="search_params.type"
                        disabled={type != 'Series'}
                        label="type"
                        options={ReleaseTypes}
                        control={control}
                      />
                    </Stack>
                    <Stack sx={{ width: '100%' }} direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                      <Stack direction="row" spacing={1}>
                        <Text name="search_params.group" disabled={type != 'Series'} label="group" control={control} />
                        <Text
                          name="search_params.author"
                          disabled={type != 'Series'}
                          label="author"
                          control={control}
                        />
                      </Stack>
                      <Stack sx={{ pt: 1, pl: 2 }} direction="row" spacing={1}>
                        <IconCheckbox
                          sx={{ mr: 0 }}
                          icon={<VerifiedOutlinedIcon />}
                          checkedIcon={<VerifiedIcon />}
                          name="search_params.verified"
                          disabled={type != 'Series'}
                          control={control}
                        />
                        <IconCheckbox
                          sx={{ mr: 0 }}
                          icon={<SportsBarOutlinedIcon />}
                          checkedIcon={<SportsBarIcon />}
                          name="search_params.uncensored"
                          disabled={type != 'Series'}
                          control={control}
                        />
                        <IconCheckbox
                          sx={{ mr: 0 }}
                          icon={<VideocamOutlinedIcon />}
                          checkedIcon={<VideocamIcon />}
                          name="search_params.bluray"
                          disabled={type != 'Series'}
                          control={control}
                        />
                      </Stack>
                      <Button variant="contained" color="primary" type="submit">
                        Submit
                      </Button>
                    </Stack>
                  </>
                )}
              </Stack>
            </Stack>
          </Paper>
        </Stack>
        <Paper sx={{ p: 2, width: '100%' }}>
          <Stack width="100%" direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between">
            <Typography noWrap variant="h6" color="primary">
              Source
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Pill color="gray" name="Release" value={<Chrono format="YYYY-MM-DD">{release_date}</Chrono>} />
              <Pill color="gray" name="Created" value={<Chrono fromNow>{created_at}</Chrono>} />
              <Pill color="gray" name="Updated" value={<Chrono fromNow>{updated_at}</Chrono>} />
            </Stack>
          </Stack>
          <Stack width="100%" direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Stack width="100%" direction="column" spacing={1}>
              <Typography noWrap variant="h6">
                {title}
              </Typography>
              <Typography>{description}</Typography>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <Link onClick={() => chooseCover()}>
                <MediaCoverImage image={cover} updated={updated} />
              </Link>
              <Link onClick={() => chooseBackground()}>
                <MediaCoverImage image={background} updated={updated} background={true} />
              </Link>
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      <ImageDialog open={coverOpen} close={selectCover} current={currentCover()} images={images} background={false} />
      <ImageDialog
        open={backgroundOpen}
        close={selectBackground}
        current={currentBackground()}
        images={images}
        background={true}
      />
    </Box>
  );
}

export const ImageDialog = ({
  images,
  current,
  background,
  open,
  close,
}: {
  images: string[];
  current?: string;
  background: boolean;
  open: boolean;
  close: (url: string) => void;
}) => {
  return (
    <Dialog open={open} onClose={() => close('')} maxWidth="md" fullWidth={true}>
      <DialogTitle>
        Choose {`${background ? 'Background' : 'Cover'}`}
        <IconButton
          aria-label="close"
          onClick={() => close('')}
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
      <DialogContent sx={{ minHeight: '50px' }}>
        {images.length === 0 && (
          <Typography variant="body2" color="gray">
            No images found
          </Typography>
        )}
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid item key={index}>
              <Link onClick={() => close(image)}>
                <MediaCoverImage image={image} selected={current === image} background={background} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
