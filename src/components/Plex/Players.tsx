import React from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { usePlexPlayers } from './query';

export const PlexPlayers = ({ player, setPlayer }: { player: string; setPlayer: (v: string) => void }) => {
  const { isFetching, data: players } = usePlexPlayers();

  const handleChange = (event: SelectChangeEvent) => {
    setPlayer(event.target.value as string);
  };

  return (
    <FormControl sx={{ width: '300px' }} fullWidth>
      <InputLabel id="demo-simple-select-label">Player</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={player}
        label="Age"
        onChange={handleChange}
        disabled={isFetching}
      >
        <MenuItem value="">Select a player</MenuItem>
        {players?.map(c => (
          <MenuItem key={c.clientIdentifier} value={c.clientIdentifier}>
            {c.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
