import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import { useSearchQuery } from 'query/search';
import { Medium } from 'types/medium';

import './Search.css';

export default function Search(props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [selected, setSelected] = useState<Medium | null>(null);
  const { isFetching, data } = useSearchQuery(search);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!selected) {
      return;
    }
    let type = selected.type;
    if (type == 'movie') {
      type = 'movies';
    }
    setSelected(null);
    navigate(`/${type}/${selected.id}`);
  }, [selected]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onChange={(event: any, newValue: Medium | null) => {
        setSelected(newValue);
      }}
      onInputChange={(event: any, newValue: string) => {
        setSearch(newValue);
      }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) =>
        value === undefined || option?.id?.toString() === (value?.id ?? value)?.toString()
      }
      getOptionLabel={option => option.display + (option.kind ? ` (${option.kind})` : '')}
      options={data ? data : []}
      loading={isFetching}
      renderInput={params => (
        <TextField
          {...params}
          label="Search"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isFetching ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
