import React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import QueueIcon from '@mui/icons-material/Queue';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { LoadingIndicator, Published, Row } from 'components/Common';
import { Container } from 'components/Layout';

import {
  Indexer,
  IndexerDialog,
  useIndexerCreateMutation,
  useIndexerDeleteMutation,
  useIndexerMutation,
  useIndexerSettingMutation,
  useIndexersAllQuery,
} from '.';

export const IndexersList = () => {
  const [selected, setSelected] = React.useState<Indexer | undefined>(undefined);
  const { isFetching, data } = useIndexersAllQuery();
  const indexer = useIndexerMutation();
  const setting = useIndexerSettingMutation();
  const create = useIndexerCreateMutation();
  const destroy = useIndexerDeleteMutation();

  const handleClose = (data?: Indexer) => {
    setSelected(undefined);

    if (data) {
      if (data.id === '') {
        create.mutate(data);
        return;
      }
      indexer.mutate(data);
    }
  };

  const view = (row: Indexer) => {
    setSelected(row);
  };

  const toggle = (id: string, name: string, value: boolean) => {
    setting.mutate({ id, setting: { setting: name, value: value } });
  };

  const newIndexer = () => {
    setSelected({
      id: '',
      name: '',
      url: '',
      active: false,
      categories: new Map<string, number[]>(),
    });
  };
  const deleteIndexer = (id: string) => {
    destroy.mutate(id);
  };

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Stack spacing={1} direction="row" justifyContent="start" alignItems="center">
              <Typography variant="h6" color="primary">
                Indexers
              </Typography>
              <IconButton aria-label="refresh" color="primary" onClick={() => newIndexer()}>
                <QueueIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid xs={12} md={6}></Grid>
        </Grid>
      </Container>
      <Container>
        {isFetching && <LoadingIndicator />}

        <Paper elevation={0} sx={{ width: '100%' }}>
          {data?.results?.map((row: Indexer) => (
            <Row key={row.id}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="center">
                <Stack
                  direction="row"
                  spacing={1}
                  width="100%"
                  maxWidth={{ xs: '100%', md: '900px' }}
                  pr="3px"
                  alignItems="center"
                >
                  <IconButton size="small" onClick={() => toggle(row.id, 'active', !row.active)} title="active">
                    <CheckCircleIcon color={row.active ? 'secondary' : 'disabled'} fontSize="small" />
                  </IconButton>
                  <Link href="#" onClick={() => view(row)}>
                    <Typography fontWeight="bolder" color="primary">
                      {row.name}
                    </Typography>
                  </Link>
                  <Typography variant="body1" color="secondary" fontWeight="bold">
                    tv
                  </Typography>
                  <Typography variant="body2" color="secondary.dark">
                    {row.categories['tv'].join(', ')}
                  </Typography>
                  <Typography variant="body1" color="secondary" fontWeight="bold">
                    anime
                  </Typography>
                  <Typography variant="body2" color="secondary.dark">
                    {row.categories['anime'].join(', ')}
                  </Typography>
                  <Typography variant="body1" color="secondary" fontWeight="bold">
                    movie
                  </Typography>
                  <Typography variant="body2" color="secondary.dark">
                    {row.categories['movie'].join(', ')}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" width="100%" justifyContent="end">
                  {row.processed_at && <Published date={row.processed_at} />}
                  <IconButton size="small" onClick={() => deleteIndexer(row.id)} title="active">
                    <DeleteForeverIcon color="error" fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Row>
          ))}
          {selected && <IndexerDialog handleClose={handleClose} indexer={selected} />}
        </Paper>
      </Container>
    </>
  );
};
