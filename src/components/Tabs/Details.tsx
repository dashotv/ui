import * as React from 'react';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Chrono from 'components/Chrono';
import { MediaCoverImage } from 'components/Media';

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
export type DetailsProps = {
  type: string;
  kind?: string;
  cover?: string;
  background?: string;
  display?: string;
  search?: string;
  directory?: string;
  title?: string;
  description?: string;
  release_date?: string;
  source: string;
  source_id: string;
  created_at: string;
  updated_at: string;
};
export default function Details({
  type,
  kind,
  cover,
  background,
  display,
  search,
  directory,
  title,
  description,
  release_date,
  source,
  source_id,
  created_at,
  updated_at,
}: DetailsProps) {
  const handleChange = ev => {};
  return (
    <>
      <Stack sx={{ width: '100%' }} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Stack sx={{ minWidth: '200px' }} direction="column" spacing={1}>
          <TextField
            sx={{ m: 1 }}
            id="display"
            name="display"
            label="Display"
            variant="standard"
            value={display}
            autoComplete="off"
            onChange={handleChange}
          />
          <TextField
            sx={{ m: 1 }}
            id="search"
            name="search"
            label="Search"
            variant="standard"
            value={search}
            autoComplete="off"
            onChange={handleChange}
          />
          <TextField
            sx={{ m: 1 }}
            id="directory"
            name="directory"
            label="Directory"
            variant="standard"
            value={directory}
            autoComplete="off"
            onChange={handleChange}
          />
          <TextField
            sx={{ m: 1 }}
            id="kind"
            name="kind"
            select
            label="Kind"
            variant="standard"
            value={kind}
            onChange={handleChange}
          >
            {kinds[type].map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ m: 1 }}
            id="source"
            name="source"
            select
            label="Source"
            variant="standard"
            value={source}
            onChange={handleChange}
          >
            {sources.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ m: 1 }}
            id="source_id"
            name="source_id"
            label="Source ID"
            variant="standard"
            value={source_id}
            autoComplete="off"
            onChange={handleChange}
          />
        </Stack>
        <Stack direction="column" spacing={1}>
          <Paper sx={{ p: 2, width: '100%' }}>
            <Stack direction="column" spacing={1}>
              <Typography noWrap variant="h4" color="primary">
                {title}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Detail name="Release" value={<Chrono format="YYYY-MM-DD">{release_date}</Chrono>} />
                <Detail name="Created" value={<Chrono fromNow>{created_at}</Chrono>} />
                <Detail name="Updated" value={<Chrono fromNow>{updated_at}</Chrono>} />
              </Stack>
              <Typography>{description}</Typography>
            </Stack>
          </Paper>
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
    </>
  );
}

const Detail = ({
  name,
  value,
  color = 'primary',
  variant = 'row',
}: {
  name: string;
  value: React.ReactElement | string;
  color?: string;
  variant?: 'row' | 'column';
}) => {
  const display = variant == 'row' ? 'flex' : 'block';
  return (
    <Box component="div" sx={{ display: display }}>
      <Box
        sx={{
          backgroundColor: `${color}.main`,
          border: '1px solid',
          borderColor: `${color}.main`,
          borderRadius: '5px 0 0 5px',
          p: '3px 5px',
        }}
      >
        <Typography variant="button" color="black">
          {name}
        </Typography>
      </Box>
      <Box
        sx={{
          color: `${color}.main`,
          backgroundColor: '#363636',
          border: '1px solid',
          borderColor: `${color}.main`,
          borderRadius: '0 5px 5px 0',
          p: '3px 5px',
        }}
      >
        {value}
      </Box>
    </Box>
  );
};
