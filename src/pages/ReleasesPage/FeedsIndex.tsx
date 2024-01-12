import React from 'react';
import { Helmet } from 'react-helmet-async';

import QueueIcon from '@mui/icons-material/Queue';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { LoadingIndicator } from 'components/Common';
import { Container } from 'components/Layout';
import { Feed, FeedDialog, FeedsList, useFeedCreateMutation, useFeedsAllQuery } from 'components/Releases';

export default function FeedsIndex() {
  const [feed, setFeed] = React.useState<Feed | undefined>(undefined);
  const { isFetching, data } = useFeedsAllQuery();
  const creator = useFeedCreateMutation();
  const handleClose = (data?: Feed) => {
    setFeed(undefined);

    if (data) {
      console.log(data);
      creator.mutate(data);
    }
  };
  const newFeed = () => {
    setFeed({
      id: '',
      name: '',
      url: '',
      type: '',
      source: '',
      active: true,
    });
  };

  return (
    <>
      <Helmet>
        <title>Releases - Feeds</title>
      </Helmet>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1} direction="row" justifyContent="start" alignItems="center">
              <Typography variant="h6" color="primary">
                Feeds
              </Typography>
              <IconButton aria-label="refresh" color="primary" onClick={() => newFeed()}>
                <QueueIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}></Grid>
        </Grid>
      </Container>
      <Container>
        {isFetching && <LoadingIndicator />}
        {data && <FeedsList data={data} />}
      </Container>
      {feed && <FeedDialog {...{ feed, handleClose }} />}
    </>
  );
}
