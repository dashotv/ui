import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';

export function AllMovies() {
  return (
    <>
      <Helmet>
        <title>Series</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <Container sx={{ padding: 2 }} style={{ overflow: 'auto' }} maxWidth="xl">
        <Grid container>
          <Grid item xs={6}>
            <Link to="/media">
              <Button>Series</Button>
            </Link>
            <Link to="/media/movies">
              <Button variant="outlined">Movies</Button>
            </Link>
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Container>
    </>
  );
}
