import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';

import { Breadcrumbs, Grid, Typography } from '@mui/material';

import { Container, LoadingIndicator, Pagination } from '@dashotv/components';

import { DirectoriesList, useQueryDirectories } from 'components/Directories';
import { FilesList, useQueryFiles } from 'components/Files';

export const FilesRouter = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<DirectoriesPage />} />
        <Route path="missing" element={<FilesPage />} />
        <Route path=":library" element={<DirectoriesPage />} />
        <Route path=":library/:medium" element={<FilesPage />} />
      </Routes>
      <Outlet />
    </>
  );
};

export const FilesPage = () => {
  const { medium } = useParams();
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useQueryFiles(page, medium);
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
            <Link to="/admin/files">Files</Link>
            {medium ? <Typography color="primary">{medium}</Typography> : null}
            {!medium ? <Typography color="primary">Libraries</Typography> : null}
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

export const DirectoriesPage = () => {
  const { library, medium } = useParams();
  const path = medium ? `${library}/${medium}` : library ? library : '';
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useQueryDirectories(path, page);
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
            <Link to="/admin/files">Files</Link>
            {library ? <Typography color="primary">{library}</Typography> : null}
            {medium ? <Typography color="primary">{medium}</Typography> : null}
            {!library && !medium ? <Typography color="primary">Libraries</Typography> : null}
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} md={6}>
          <Pagination count={pages} page={page} total={total} onChange={onChange} />
        </Grid>
      </Grid>
      {isLoading ? <LoadingIndicator /> : null}
      <DirectoriesList data={data?.result} />
    </Container>
  );
};
export default FilesRouter;
