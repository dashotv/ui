import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import LoadingIndicator from 'components/Loading';
import { useQueryString } from 'hooks/useQueryString';
import { usePopularQuery } from 'query/releases';

import './releases.scss';

interface Popular {
  name: string;
  count: number;
  year?: number;
  type: string;
}
function PopularList({ data, type }: { data: Popular[]; type: string }) {
  const url =
    type !== 'anime' ? `http://themoviedb.org/search?query=` : 'https://myanimelist.net/anime.php?cat=anime&q=';

  return (
    <div className="popular">
      <div className="header">{type}</div>
      {data?.map(({ name, count, year = 0 }, index) => (
        <div key={index} className="entry">
          <span className="title">
            <Link href={`${url}${name}${year > 0 ? `+y:${year}` : ''}`} target="_window">
              {name}
              {year > 0 && ` (${year})`}
            </Link>
          </span>
          <span className="number">
            <Link href={SearchURL(name, type)}>{count}</Link>
          </span>
        </div>
      ))}
    </div>
  );
}

function SearchURL(text, type) {
  const { queryString } = useQueryString();
  const base = '/releases/search?';
  const settings = {
    text: text,
    type: type,
    resolution: type === 'movies' ? '1080' : '',
    exact: type === 'movies' ? false : true,
    verified: true,
  };

  return base + queryString(settings);
}

export default function ReleasesIndex() {
  const { interval } = useParams();
  const { isFetching, data } = usePopularQuery(interval || 'daily');

  return (
    <>
      <Helmet>
        <title>Releases - Search</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>

      <Container style={{ overflow: 'hidden' }} sx={{ pb: 5 }} maxWidth="xl">
        {isFetching && <LoadingIndicator />}
        <Grid container>
          <Grid item md={4} xs={12}>
            {data && data.tv && <PopularList type="tv" data={data.tv} />}
          </Grid>
          <Grid item md={4} xs={12}>
            {data && data.anime && <PopularList type="anime" data={data.anime} />}
          </Grid>
          <Grid item md={4} xs={12}>
            {data && data.movies && <PopularList type="movies" data={data.movies} />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
