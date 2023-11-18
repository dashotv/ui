import * as React from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Chrono from 'components/Chrono';
import { Checkbox, Select, Text } from 'components/Form';
import { MediaCoverImage } from 'components/Media';
import { Medium } from 'types/medium';

const kinds = {
  Series: [
    { label: 'TV', value: 'tv' },
    { label: 'Anime', value: 'anime' },
    { label: 'Ecchi', value: 'ecchi' },
    { label: 'News', value: 'news' },
  ],
  Movie: [
    { label: 'Movies', value: 'movies' },
    { label: 'Movies 4K', value: 'movies4k' },
    { label: 'Movies 3D', value: 'movies3d' },
    { label: 'Kids', value: 'kids' },
  ],
};
const sources = [
  { label: 'TVDB', value: 'tvdb' },
  { label: 'TMDB', value: 'tmdb' },
];
const resolutions = [
  { label: '', value: '' },
  { label: '2160p', value: '2160' },
  { label: '1080p', value: '1080' },
  { label: '720p', value: '720' },
];
const releaseSources = [
  '',
  'anidex',
  'extratorrent',
  'eztv',
  'geek',
  'hiddenbay',
  'horrible',
  'kickass',
  'lime',
  'monova',
  'nyaa',
  'piratebay',
  'rarbg',
  'shana',
  'showrss',
  'yify',
].map(v => ({ label: v, value: v }));
const types = ['', 'tv', 'anime', 'movies'].map(v => ({ label: v, value: v }));
export type DetailsProps = {
  medium: Medium;
};
export default function Details({
  medium,
  medium: { type, cover, background, search_params, title, description, release_date, created_at, updated_at },
}: DetailsProps) {
  const { handleSubmit, control } = useForm({ values: medium });

  const submit = (data: Medium) => {
    console.log('data:', data);
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
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
                <Select name="kind" options={kinds[type]} control={control} />
                <Select name="source" options={sources} control={control} />
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
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Text name="search" control={control} />
                      <Text name="search_params.group" label="group" control={control} />
                      <Text name="search_params.author" label="author" control={control} />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Select
                        name="search_params.resolution"
                        label="resolution"
                        options={resolutions}
                        control={control}
                      />
                      <Select name="search_params.source" label="source" options={releaseSources} control={control} />
                      <Select name="search_params.type" label="type" options={types} control={control} />
                    </Stack>
                    <Stack sx={{ minWidth: '200px' }} direction="row" spacing={1}>
                      <Checkbox name="search_params.verified" label="verified" control={control} />
                      <Checkbox name="search_params.uncensored" label="uncensored" control={control} />
                      <Checkbox name="search_params.bluray" label="bluray" control={control} />
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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Stack direction="column" spacing={1}>
              <Typography noWrap variant="h6">
                {title}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Detail color="gray" name="Release" value={<Chrono format="YYYY-MM-DD">{release_date}</Chrono>} />
                <Detail color="gray" name="Created" value={<Chrono fromNow>{created_at}</Chrono>} />
                <Detail color="gray" name="Updated" value={<Chrono fromNow>{updated_at}</Chrono>} />
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

const Detail = ({
  name,
  value,
  color = 'primary.main',
  variant = 'row',
  icon,
}: {
  name: string;
  value: React.ReactElement | string;
  color?: string;
  variant?: 'row' | 'column';
  icon?: React.ReactElement;
}) => {
  const display = variant == 'row' ? 'flex' : 'block';
  return (
    <Box component="div" sx={{ display: display }}>
      <Box
        sx={{
          backgroundColor: color,
          border: '1px solid',
          borderColor: color,
          borderRadius: '5px 0 0 5px',
          // p: '3px 5px',
          pr: 1,
          pl: 1,
        }}
      >
        {icon && icon}
        <Typography variant="button" color="black">
          {name}
        </Typography>
      </Box>
      <Box
        sx={{
          color: color,
          backgroundColor: '#363636',
          border: '1px solid',
          borderColor: color,
          borderRadius: '0 5px 5px 0',
          // p: '3px 5px',
          pr: 1,
          pl: 1,
        }}
      >
        {value}
      </Box>
    </Box>
  );
};
