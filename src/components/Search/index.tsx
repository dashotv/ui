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

import { SearchForm } from 'types/search_form';

const resolutions = [
  { label: '', value: '' },
  { label: '2160p', value: 2160 },
  { label: '1080p', value: 1080 },
  { label: '720p', value: 720 },
];
const types = [
  { label: '', value: '' },
  { label: 'tv', value: 'tv' },
  { label: 'anime', value: 'anime' },
  { label: 'movies', value: 'movies' },
];
const sources = [
  { label: '', value: '' },
  { label: 'anidex', value: 'anidex' },
  { label: 'extratorrent', value: 'extratorrent' },
  { label: 'eztv', value: 'eztv' },
  { label: 'geek', value: 'geek' },
  { label: 'hiddenbay', value: 'hiddenbay' },
  { label: 'horrible', value: 'horrible' },
  { label: 'kickass', value: 'kickass' },
  { label: 'lime', value: 'lime' },
  { label: 'monova', value: 'monova' },
  { label: 'nyaa', value: 'nyaa' },
  { label: 'piratebay', value: 'piratebay' },
  { label: 'rarbg', value: 'rarbg' },
  { label: 'shana', value: 'shana' },
  { label: 'showrss', value: 'showrss' },
  { label: 'yify', value: 'yify' },
];

export function Search(props) {
  const [data, setData] = useState<SearchForm>(props.form);
  const [defaults] = useState(props.defaults);

  const handleChange = ev => {
    setData({ ...data, [ev.target.name]: ev.target.value });
  };
  const handleChangeCheckbox = ev => {
    setData({ ...data, [ev.target.name]: ev.target.checked });
  };
  const handleSubmit = ev => {
    console.log('form:', data);
    props.setForm(data);
  };
  const handleReset = ev => {
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
          id="text"
          name="text"
          label="Name"
          variant="standard"
          margin="none"
          size="small"
          value={data.text}
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
          {resolutions.map(option => (
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
          {sources.map(option => (
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
          {types.map(option => (
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
