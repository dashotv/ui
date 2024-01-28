import React, { useState } from 'react';

import { DialogActions, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

import { Megabytes, Row } from 'components/Common';

import { Indexer, NZB, useRunicReadQuery } from '.';

export const IndexersRead = ({ indexer, handleClose }: { indexer: Indexer; handleClose: () => void }) => {
  const [open, setOpen] = useState(true);
  const [kind, setKind] = useState<string>('all');
  const allCats = () => {
    return [].concat(
      indexer.categories['tv'] ?? [5000],
      indexer.categories['movie'] ?? [2000],
      indexer.categories['anime'] ?? [5070],
    );
  };
  const [cats, setCats] = useState<number[]>(allCats());
  const { isFetching, data } = useRunicReadQuery(indexer.name, cats);
  const close = () => {
    setOpen(false);
    handleClose();
  };
  const handleChange = event => {
    setKind(event.target.value);
    if (event.target.value === 'all') {
      setCats(allCats());
      return;
    }
    setCats(indexer.categories[event.target.value]);
  };

  return (
    <Dialog open={open} onClose={() => close()} fullWidth={true} maxWidth="xl">
      <DialogTitle>
        <Stack direction="row" spacing={2} width="100%" alignItems="baseline" justifyContent="space-between">
          <Stack direction="row" spacing={2} width="100%" alignItems="baseline">
            <Typography fontWeight="bolder" noWrap color="primary">
              Read
            </Typography>
            <Typography fontWeight="bolder" noWrap color="primary.dark">
              {indexer.name}
            </Typography>
            <Typography noWrap color="gray">
              ({data?.results?.length})
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} width="100%" alignItems="baseline" justifyContent="end">
            <Typography noWrap color="gray">
              {cats.join(',')}
            </Typography>
            <Select variant="standard" label="Kind" value={kind} onChange={handleChange} sx={{ width: '100px' }}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="tv">TV</MenuItem>
              <MenuItem value="anime">Anime</MenuItem>
              <MenuItem value="movie">Movie</MenuItem>
            </Select>
          </Stack>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Paper elevation={0} sx={{ width: '100%', p: 1 }}>
          {isFetching && <Typography variant="body1">Loading...</Typography>}
          {data?.results?.map((nzb: NZB) => (
            <Row key={nzb.id || nzb.infohash}>
              <Stack direction="row" spacing={1} width="100%" alignItems="baseline" justifyContent="space-between">
                <Typography fontWeight="bolder" minWidth="300px" noWrap color="primary">
                  {nzb.title}
                </Typography>
                <Stack direction="row" spacing={1} minWidth="225px" alignItems="baseline" justifyContent="end">
                  <Typography fontWeight="bolder" minWidth="125px" noWrap color="gray">
                    {nzb.category.join(',')}
                  </Typography>
                  <Megabytes value={nzb.size} ord="bytes" />
                </Stack>
              </Stack>
            </Row>
          ))}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => close()}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
