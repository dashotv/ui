import React, { useState } from 'react';

import { DialogActions, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

import { Indexer, IndexersReleases, useRunicParseQuery } from '.';

export const IndexersParse = ({ indexer, handleClose }: { indexer: Indexer; handleClose: () => void }) => {
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
  const { data } = useRunicParseQuery(indexer.name, cats);
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
              Parse
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
      <DialogContent>{data?.results ? <IndexersReleases data={data?.results} /> : null}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => close()}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
