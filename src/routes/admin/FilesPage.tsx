import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';

import TopicIcon from '@mui/icons-material/Topic';
import { Breadcrumbs, Grid, Typography } from '@mui/material';

import { LoadingIndicator, Pagination, RoutingTabs, RoutingTabsRoute } from '@dashotv/components';

import { Container } from 'components/Common';
import { DirectoriesList, useQueryDirectories } from 'components/Directories';
import { FilesList, useQueryFiles, useQueryFilesMissing } from 'components/Files';
import { useQueryMedium } from 'components/Media';

export const FilesTabs = () => {
  const tabsMap: RoutingTabsRoute[] = [
    {
      label: 'Unmatched',
      to: 'unmatched',
      element: <FilesUnmatchedPage />,
    },
    {
      label: 'Files',
      to: '',
      path: '/*',
      element: <FilesRouter />,
    },
  ];
  return <RoutingTabs data={tabsMap} mount={'/admin/files'} />;
};

export const FilesRouter = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<DirectoriesPage />} />
        <Route path=":library" element={<DirectoriesPage />} />
        <Route path=":library/:medium" element={<FilesPage />} />
      </Routes>
      <Outlet />
    </>
  );
};
export const FilesPage = () => {
  const { library, medium } = useParams();
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
          <FilesBreadcrumbs library={library} medium={medium} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Pagination size="small" count={pages} page={page} total={total} onChange={onChange} />
        </Grid>
      </Grid>
      {isLoading ? <LoadingIndicator /> : null}
      <FilesList data={data?.result} />
    </Container>
  );
};

export const FilesUnmatchedPage = () => {
  const { medium } = useParams();
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useQueryFilesMissing(page, medium);
  const total = data?.total || 0;
  const pages = Math.ceil(total / 50);

  const onChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FilesBreadcrumbs library={'unmatched'} medium={medium} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Pagination size="small" count={pages} page={page} total={total} onChange={onChange} />
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
          <FilesBreadcrumbs library={library} medium={medium} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Pagination size="small" count={pages} page={page} total={total} onChange={onChange} />
        </Grid>
      </Grid>
      {isLoading ? <LoadingIndicator /> : null}
      <DirectoriesList data={data?.result} />
    </Container>
  );
};

const FilesBreadcrumbs = ({ library, medium }: { library?: string; medium?: string }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ pt: 2 }}>
      <Link to="/admin/files">
        <Typography variant="button" color="primary">
          <TopicIcon fontSize="small" />
        </Typography>
      </Link>
      {library ? (
        <Link to={`/admin/files/${library}`}>
          <Typography variant="button" color="primary">
            {library}
          </Typography>
        </Link>
      ) : null}
      {medium ? <MediaTitle id={medium} /> : null}
      {!library && !medium ? (
        <Typography variant="button" color="primary">
          Libraries
        </Typography>
      ) : null}
    </Breadcrumbs>
  );
};

const MediaTitle = ({ id }: { id?: string }) => {
  if (!id) {
    return <Typography>...</Typography>;
  }
  const { data } = useQueryMedium(id);
  return (
    <Typography variant="body1" noWrap width="300px">
      {data?.result.display || data?.result.title || 'unknown'}
    </Typography>
  );
};

export default FilesTabs;
