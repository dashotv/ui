import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { LoadingIndicator } from 'components/Common';
import { Container } from 'components/Layout';
import { PopularList, usePopularQuery } from 'components/Releases';

export default function ReleasesIndex() {
  const { interval } = useParams();
  const { isFetching, data } = usePopularQuery(interval || 'daily');
  const navigate = useNavigate();

  const parse = (input: string) => {
    if (!input) return '';
    const tokens = input.split(' ');
    const params = new URLSearchParams();
    const text: string[] = [];
    for (let i = 0; i < tokens.length; i++) {
      if (!tokens[i].match(/(.*?):(.*)/)) {
        text.push(tokens[i]);
        continue;
      }
      const kv = tokens[i].split(':');
      if (kv[0] === 'r' || kv[0] === 'res') {
        params.set('resolution', kv[1]);
      } else if (kv[0] === 't' || kv[0] === 'type') {
        params.set('type', kv[1]);
      } else if (kv[0] === 'u' || kv[0] === 'uncensored') {
        params.set('uncensored', kv[1]);
      } else if (kv[0] === 'b' || kv[0] === 'bluray') {
        params.set('bluray', kv[1]);
      } else if (kv[0] === 'v' || kv[0] === 'verified') {
        params.set('verified', kv[1]);
      }
    }
    params.set('text', text.join(' '));
    return params.toString();
  };

  const link = (text: string) => {
    navigate(`/releases/search?${parse(text)}`);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = e.target[0].value;
    console.log('form:', search);
    link(search);
  };

  return (
    <>
      <Helmet>
        <title>Releases - Search</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>

      <Container>
        {isFetching && <LoadingIndicator />}
        <Grid container>
          <Grid item xs={12} md={12}>
            <Typography fontSize="xx-large" fontWeight="bolder" ml="3px">
              Search
            </Typography>
            <form onSubmit={submit}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} width="100%">
                <TextField type="search" label="search" size="small" fullWidth autoComplete="off" />
                <Stack direction="row" spacing={1} width={{ xs: '100%', md: '225px' }}>
                  <Button size="small" variant="contained" fullWidth onClick={() => link('t:movies r:1080 v:true')}>
                    Movies
                  </Button>
                  <Button size="small" variant="contained" fullWidth onClick={() => link('t:anime u:true v:true')}>
                    Uncen
                  </Button>
                  <Button size="small" variant="contained" fullWidth onClick={() => link('t:anime b:true v:true')}>
                    Bluray
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Grid>
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
