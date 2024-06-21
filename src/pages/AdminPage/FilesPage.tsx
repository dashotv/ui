import React from 'react';

import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';

import { Container, LoadingIndicator, Pagination } from '@dashotv/components';

import { FilesList, useQueryFiles } from 'components/Files';

export const SettingsPage = () => {
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useQueryFiles(page);
  const total = data?.total || 0;
  const pages = Math.ceil(total / 50);

  const onChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ pt: 2 }}>
            <Link underline="hover" color="inherit" href="/">
              Files
            </Link>
            <Typography color="primary">All</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} md={6}>
          <Pagination count={pages} page={page} total={total} onChange={onChange} />
        </Grid>
      </Grid>
      {isLoading ? <LoadingIndicator /> : null}
      <FilesList data={data?.result} />
    </Container>
  );
};
export default SettingsPage;
