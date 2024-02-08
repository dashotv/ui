import React from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { usePlexPlayers } from './query';

export const Players = ({ player, setPlayer }: { player: string; setPlayer: (v: string) => void }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setPlayer(event.target.value as string);
  };
  const { isFetching, data: players } = usePlexPlayers();
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
        {players?.map(player => (
          <MenuItem key={player.clientIdentifier} value={player.clientIdentifier}>
            {player.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
