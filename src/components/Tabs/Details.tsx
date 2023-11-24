import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import SportsBarIcon from '@mui/icons-material/SportsBar';
import SportsBarOutlinedIcon from '@mui/icons-material/SportsBarOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Chrono from 'components/Chrono';
import { IconCheckbox, Select, Text } from 'components/Form';
import { MediaCoverImage } from 'components/Media';
import { Pill } from 'components/Pill';
import { useMovieUpdateMutation } from 'query/movies';
import { useSeriesUpdateMutation } from 'query/series';
import { Kinds, ReleaseSources, ReleaseTypes, Resolutions, Sources } from 'types/constants';
import { Medium } from 'types/medium';

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
                <Select name="kind" options={Kinds[type]} control={control} />
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
          <Typography noWrap variant="h6" color="primary">
            Source
          </Typography>
          <Stack width="100%" direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Stack width="100%" direction="column" spacing={1}>
              <Typography noWrap variant="h6">
                {title}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Pill color="gray" name="Release" value={<Chrono format="YYYY-MM-DD">{release_date}</Chrono>} />
                <Pill color="gray" name="Created" value={<Chrono fromNow>{created_at}</Chrono>} />
                <Pill color="gray" name="Updated" value={<Chrono fromNow>{updated_at}</Chrono>} />
              </Stack>
              <Typography>{description}</Typography>
            </Stack>
            <Stack direction="column" spacing={1}>
              <div className="mediaCover">
                <MediaCoverImage image={cover} />
              </div>
              <div className="mediaCover">
                <MediaCoverImage image={background} background={true} />
              </div>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
