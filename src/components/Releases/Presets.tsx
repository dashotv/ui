import React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { SearchForm } from '.';

export type ReleasesPresetsProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setForm: React.Dispatch<React.SetStateAction<SearchForm>>;
  formDefaults: SearchForm;
};
export const ReleasesPresets = ({ setPage, setForm, formDefaults }: ReleasesPresetsProps) => {
  return (
    <Stack direction="row" spacing={1}>
      <Button
        onClick={() => {
          setPage(1);
          setForm(() => {
            return { ...formDefaults, type: 'movies', resolution: 1080, verified: true };
          });
        }}
        size="small"
        variant="contained"
      >
        Movies
      </Button>
      <Button
        onClick={() => {
          setPage(1);
          setForm(() => {
            return { ...formDefaults, verified: true, type: 'anime', uncensored: true };
          });
        }}
        size="small"
        variant="contained"
      >
        UN
      </Button>
      <Button
        onClick={() => {
          setPage(1);
          setForm(() => {
            return { ...formDefaults, verified: true, type: 'anime', bluray: true };
          });
        }}
        size="small"
        variant="contained"
      >
        BD
      </Button>
      <Button
        onClick={() => {
          setPage(1);
          setForm(() => {
            return { ...formDefaults, type: 'anime', resolution: 2160 };
          });
        }}
        size="small"
        variant="contained"
      >
        4K
      </Button>
    </Stack>
  );
};
