import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TheatersIcon from '@mui/icons-material/Theaters';
import TvIcon from '@mui/icons-material/Tv';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
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
    if (type === 'movie') {
      type = 'movies';
    }
    setSelected(null);
    navigate(`/${type}/${selected.id}`);
  }, [selected, navigate]);

  const icon = option => {
    switch (option.type) {
      case 'series':
        return <TvIcon fontSize="small" />;
      case 'movie':
        return <TheatersIcon fontSize="small" />;
    }
    return null;
  };

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
      filterOptions={(options: Medium[], state: any) => options}
      getOptionLabel={option => option.name}
      options={data ? data : []}
      loading={isFetching}
      renderOption={(props, option) => (
        <Box key={option.id} component="li" sx={{ '& > svg': { mr: 2, flexShrink: 0 } }} {...props}>
          {icon(option)} {option.name}
        </Box>
      )}
      renderInput={params => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            size: 'small',
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
