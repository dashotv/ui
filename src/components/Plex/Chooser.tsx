import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

import { PlexClient } from 'components/Plex';

import { usePlexPlayers } from './query';

export const PlexChooser = ({ setPlayer }: { setPlayer: (v: PlexClient | undefined) => void }) => {
  const { isFetching, data: players } = usePlexPlayers();
  const [open, setOpen] = useState(true);

  const handleChoose = (player?: PlexClient) => {
    setPlayer(player);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Select a player</DialogTitle>
      <DialogContent>
        {isFetching && <Typography>Loading...</Typography>}
        <List sx={{ pt: 0 }}>
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleChoose(undefined)}>
              <ListItemText primary="None" />
            </ListItemButton>
          </ListItem>
          {players?.result.map(c => (
            <ListItem disableGutters key={c.clientIdentifier}>
              <ListItemButton onClick={() => handleChoose(c)}>
                <ListItemText primary={c.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};
