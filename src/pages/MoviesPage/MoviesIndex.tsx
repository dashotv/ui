import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { LoadingIndicator } from '@dashotv/components';
import { Container } from '@dashotv/components';

import { Choice, FilterCheckbox, FilterSelect } from 'components/Form';
import { Media } from 'components/Media';
import { useMoviesAllQuery } from 'components/Movies';

const pagesize = 42;
const kinds: Choice[] = [
  { name: 'All', type: '' },
  { name: 'Movies', type: 'movies' },
  { name: 'Movies4K', type: 'movies4k' },
  { name: 'Movies3D', type: 'movies3d' },
  { name: 'Movies4H', type: 'movies4h' },
  { name: 'Kids', type: 'kids' },
];
const sources: Choice[] = [
  { name: 'All', type: '' },
  { name: 'TheTVDB', type: 'tvdb' },
  { name: 'The Movie DB', type: 'tmdb' },
];
const filtersDefaults = { kind: '', source: '', completed: '', downloaded: '', broken: '' };

export default function MoviesIndex() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState(filtersDefaults);
  const { isFetching, data } = useMoviesAllQuery(page, filters);

  useEffect(() => {
    if (!data?.total) return;
    setCount(Math.ceil((data?.total || 0) / pagesize)); // Math.ceil((data?.count || 0) / pagesize)
  }, [data?.total]);

  const handleChange = (event: unknown, value: number) => {
    setPage(value);
  };

  const setKind = (kind: string) => {
    setFilters({ ...filters, kind });
  };
  const setSource = (source: string) => {
    setFilters({ ...filters, source });
  };
  const setCompleted = (v: boolean) => {
    setFilters({ ...filters, completed: v ? 'true' : 'false' });
  };
  const setDownloaded = (v: boolean) => {
    setFilters({ ...filters, downloaded: v ? 'true' : 'false' });
  };
  const setBroken = (v: boolean) => {
    setFilters({ ...filters, broken: v ? 'true' : 'false' });
  };

  return (
    <>
      <Helmet>
        <title>Movies</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Stack width="100%" direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              <FilterSelect name="Type" choices={kinds} choose={setKind} selected={filters.kind} />
              <FilterSelect name="Source" choices={sources} choose={setSource} selected={filters.source} />
              <Stack direction="row" spacing={0} alignItems="center">
                <FilterCheckbox
                  checked={filters.completed === 'true'}
                  icon={<CheckCircleOutlineIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  change={setCompleted}
                />
                <FilterCheckbox
                  checked={filters.downloaded === 'true'}
                  icon={<DownloadForOfflineOutlinedIcon />}
                  checkedIcon={<DownloadForOfflineIcon />}
                  change={setDownloaded}
                />
                <FilterCheckbox
                  checked={filters.broken === 'true'}
                  icon={<BuildCircleOutlinedIcon />}
                  checkedIcon={<BuildCircleIcon />}
                  change={setBroken}
                />
                <IconButton color="secondary" onClick={() => setFilters(filtersDefaults)}>
                  <UndoIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} sx={{ pt: 2 }}>
            {data && (
              <Pagination
                sx={{ display: 'flex', justifyContent: 'end' }}
                page={page}
                count={count}
                onChange={handleChange}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={1}>
          {isFetching && <LoadingIndicator />}
          {data && <Media data={data.result} type="movies" />}
        </Grid>
      </Container>
    </>
  );
}
