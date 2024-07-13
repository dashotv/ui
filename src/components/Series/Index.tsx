import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import RecommendIcon from '@mui/icons-material/Recommend';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';
import StarsIcon from '@mui/icons-material/Stars';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import { Grid, IconButton, Stack } from '@mui/material';

import { Container, LoadingIndicator, Pagination } from '@dashotv/components';

import { Choice, FilterCheckbox, FilterSelect } from 'components/Form';
import { SeriesList, useSeriesAllQuery } from 'components/Series';

const pagesize = 25;
const kinds: Choice[] = [
  { name: 'All', type: '' },
  { name: 'TV', type: 'tv' },
  { name: 'News', type: 'news' },
  { name: 'Anime', type: 'anime' },
  { name: 'Donghua', type: 'donghua' },
  { name: 'Ecchi', type: 'ecchi' },
];
const sources: Choice[] = [
  { name: 'All', type: '' },
  { name: 'TheTVDB', type: 'tvdb' },
  { name: 'The Movie DB', type: 'tmdb' },
];

const filtersDefaults = { kind: '', source: '', active: '', favorite: '', broken: '' };

export const SeriesIndex = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState(filtersDefaults);
  const { isFetching, data } = useSeriesAllQuery(page, filters);

  useEffect(() => {
    if (!data?.total) return;
    setCount(Math.ceil((data.total || 0) / pagesize)); // Math.ceil((data?.count || 0) / pagesize)
    setTotal(data.total);
  }, [data?.total]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const setKind = (kind: string) => {
    setFilters({ ...filters, kind });
  };
  const setSource = (source: string) => {
    setFilters({ ...filters, source });
  };
  const setActive = (v: boolean) => {
    setFilters({ ...filters, active: v ? 'true' : 'false' });
  };
  const setFavorite = (v: boolean) => {
    setFilters({ ...filters, favorite: v ? 'true' : 'false' });
  };
  const setBroken = (v: boolean) => {
    setFilters({ ...filters, broken: v ? 'true' : 'false' });
  };

  return (
    <>
      <Helmet>
        <title>Series</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Stack width="100%" direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              <FilterSelect name="Kind" choices={kinds} choose={setKind} selected={filters.kind} />
              <FilterSelect name="Source" choices={sources} choose={setSource} selected={filters.source} />
              <Stack direction="row" spacing={0} alignItems="center">
                <FilterCheckbox
                  checked={filters.active === 'true'}
                  icon={<StarsOutlinedIcon />}
                  checkedIcon={<StarsIcon />}
                  change={setActive}
                />
                <FilterCheckbox
                  checked={filters.favorite === 'true'}
                  icon={<RecommendOutlinedIcon />}
                  checkedIcon={<RecommendIcon />}
                  change={setFavorite}
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
          <Grid item xs={12} md={6}>
            {data ? <Pagination size="small" page={page} count={count} total={total} onChange={handleChange} /> : null}
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={1}>
          {isFetching && <LoadingIndicator />}
          {data && <SeriesList data={data.result} type="series" />}
        </Grid>
      </Container>
    </>
  );
};
export default SeriesIndex;
