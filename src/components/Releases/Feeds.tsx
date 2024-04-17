import React from 'react';
import { useForm } from 'react-hook-form';

import { Feed } from 'client/tower';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import QueueIcon from '@mui/icons-material/Queue';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { LoadingIndicator } from '@dashotv/components';
import { Published, Row } from '@dashotv/components';
import { Container } from '@dashotv/components';

import { IconCheckbox, Select, Text } from 'components/Form';
import { ReleaseSources, ReleaseTypes } from 'types/constants';

import { useFeedCreateMutation, useFeedMutation, useFeedSettingMutation, useFeedsAllQuery } from '.';

export type FeedsListProps = {
  data: Feed[];
};
export function FeedsList() {
  const [selected, setSelected] = React.useState<Feed | undefined>(undefined);
  const { isFetching, data } = useFeedsAllQuery();
  const feed = useFeedMutation();
  const setting = useFeedSettingMutation();
  const create = useFeedCreateMutation();

  const handleClose = (data?: Feed) => {
    setSelected(undefined);

    if (data) {
      if (data.id === '') {
        create.mutate(data);
        return;
      }
      feed.mutate(data);
    }
  };

  const view = (row: Feed) => {
    setSelected(row);
  };
  const newFeed = () => {
    setSelected({
      id: '',
      name: '',
      url: '',
      type: '',
      source: '',
      active: true,
    });
  };

  const toggle = (id: string, name: string, value: boolean) => {
    setting.mutate({ id, setting: { name: name, value: value } });
  };

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Stack spacing={1} direction="row" justifyContent="start" alignItems="center">
              <Typography variant="h6" color="primary">
                Feeds
              </Typography>
              <IconButton aria-label="refresh" color="primary" onClick={() => newFeed()}>
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
          {data?.result.map((row: Feed) => (
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
                  <IconButton size="small" onClick={() => toggle(row.id!, 'active', !row.active)} title="active">
                    <CheckCircleIcon color={row.active ? 'secondary' : 'disabled'} fontSize="small" />
                  </IconButton>
                  <Link href="#" onClick={() => view(row)}>
                    <Typography fontWeight="bolder" color="primary">
                      {row.name}
                    </Typography>
                  </Link>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" width="100%" justifyContent="end">
                  <Typography variant="subtitle2" color="textSecondary">
                    {row.source}:{row.type}
                  </Typography>
                  {row.processed && <Published date={row.processed} />}
                </Stack>
              </Stack>
            </Row>
          ))}
          {selected && <FeedDialog handleClose={handleClose} feed={selected} />}
        </Paper>
      </Container>
    </>
  );
}

export type FeedDialogProps = {
  feed: Feed;
  handleClose: (data?: Feed) => void;
};
export const FeedDialog = ({ feed, handleClose }: FeedDialogProps) => {
  const { control, handleSubmit } = useForm<Feed>({ values: feed });
  const [open, setOpen] = React.useState(true);
  const close = () => {
    setOpen(false);
    handleClose();
  };
  const submit = (data: Feed) => {
    setOpen(false);
    handleClose(data);
  };
  return (
    <Dialog open={open} onClose={() => close()} fullWidth={true} maxWidth="sm">
      <DialogTitle>Edit Feed</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
          <Stack direction="column" spacing={1}>
            <Text name="name" control={control} />
            <Select name="source" control={control} options={ReleaseSources} />
            <Select name="type" control={control} options={ReleaseTypes} />
            <Text name="url" control={control} />
            <IconCheckbox
              name="active"
              label="Active"
              control={control}
              icon={<CircleOutlinedIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
              <Button variant="contained" fullWidth onClick={() => close()}>
                Cancel
              </Button>
              <Button variant="contained" fullWidth type="submit">
                Ok
              </Button>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
