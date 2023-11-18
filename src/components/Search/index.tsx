import React, { useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { ReleaseSources, ReleaseTypes, Resolutions } from 'types/constants';
import { SearchForm } from 'types/search_form';

export function Search({
  form,
  defaults: initialDefaults,
  setForm,
}: {
  form: SearchForm;
  defaults?: SearchForm;
  setForm: React.Dispatch<React.SetStateAction<SearchForm>>;
}) {
  const [data, setData] = useState<SearchForm>(form);
  const [defaults] = useState<SearchForm>(initialDefaults || form);

  const handleChange = ev => {
    setData({ ...data, [ev.target.name]: ev.target.value });
  };
  const handleChangeCheckbox = ev => {
    setData({ ...data, [ev.target.name]: ev.target.checked });
  };
  const handleSubmit = () => {
    console.log('form:', data);
    setForm(data);
  };
  const handleReset = () => {
    setData(defaults);
  };
  return (
    <>
      <Box
        component="form"
        // sx={{
        //   '& > :not(style)': { m: 1 },
        // }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{ m: 1, width: '75px' }}
          id="search"
          name="text"
          label="Name"
          variant="standard"
          margin="none"
          size="small"
          value={data.text}
          autoComplete="off"
          onChange={handleChange}
        />
        <TextField
          sx={{ m: 1, width: '50px' }}
          id="year"
          name="year"
          label="Year"
          variant="standard"
          margin="none"
          size="small"
          value={data.year}
          onChange={handleChange}
        />
        <TextField
          sx={{ m: 1, width: '50px' }}
          id="season"
          name="season"
          label="Season"
          variant="standard"
          margin="none"
          size="small"
          value={data.season}
          onChange={handleChange}
        />
        <TextField
          sx={{ m: 1, width: '50px' }}
          id="episode"
          name="episode"
          label="Episode"
          variant="standard"
          margin="none"
          size="small"
          value={data.episode}
          onChange={handleChange}
        />
        <TextField
          sx={{ m: 1, width: '50px' }}
          id="group"
          name="group"
          label="Group"
          variant="standard"
          margin="none"
          size="small"
          value={data.group}
          onChange={handleChange}
        />
        <TextField
          sx={{ m: 1, width: '50px' }}
          id="author"
          name="author"
          label="Author"
          variant="standard"
          margin="none"
          size="small"
          value={data.author}
          onChange={handleChange}
        />
        <TextField
          sx={{ m: 1, width: '75px' }}
          id="resolution"
          name="resolution"
          select
          label="Res"
          variant="standard"
          margin="none"
          size="small"
          value={data.resolution}
          onChange={handleChange}
        >
          {Resolutions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{ m: 1, width: '75px' }}
          id="source"
          name="source"
          select
          label="Source"
          variant="standard"
          margin="none"
          size="small"
          value={data.source}
          onChange={handleChange}
        >
          {ReleaseSources.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{ m: 1, width: '75px' }}
          id="type"
          name="type"
          select
          label="Type"
          variant="standard"
          margin="none"
          size="small"
          value={data.type}
          onChange={handleChange}
        >
          {ReleaseTypes.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Checkbox
          sx={{ mt: 2 }}
          name="exact"
          icon={<CircleOutlinedIcon />}
          checkedIcon={<CircleIcon />}
          checked={data.exact}
          onChange={handleChangeCheckbox}
        />
        <Checkbox
          sx={{ mt: 2 }}
          name="verified"
          icon={<CheckCircleOutlineIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={data.verified}
          onChange={handleChangeCheckbox}
        />
        <Button sx={{ mt: 2 }} onClick={handleSubmit}>
          Go
        </Button>
        <Button sx={{ mt: 2 }} onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </>
  );
}
