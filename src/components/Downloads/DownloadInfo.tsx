import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import ErrorIcon from '@mui/icons-material/Error';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PendingIcon from '@mui/icons-material/Pending';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import SearchIcon from '@mui/icons-material/Search';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const statuses = [
  { label: <SearchIcon fontSize="small" />, value: 'searching' },
  { label: <YoutubeSearchedForIcon fontSize="small" />, value: 'loading' },
  { label: <ManageSearchIcon fontSize="small" />, value: 'managing' },
  { label: <ErrorIcon fontSize="small" />, value: 'reviewing' },
  { label: <CloudDownloadIcon fontSize="small" />, value: 'downloading' },
  { label: <DownloadDoneIcon fontSize="small" />, value: 'done' },
  { label: <PauseCircleIcon fontSize="small" />, value: 'paused' },
  { label: <RemoveCircleIcon fontSize="small" />, value: 'deleted' },
  { label: <PendingIcon fontSize="small" />, value: 'hold' },
];
export type DownloadInfoValues = {
  thash: string;
  status: string;
  release_id: string;
  url: string;
};
export type DownloadInfoProps = {
  thash: string;
  status: string;
  release_id: string;
  url: string;
  changer: (name, value) => void;
};
export const DownloadInfo = ({ release_id, url, status, thash, changer }: DownloadInfoProps) => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<DownloadInfoValues>({
    values: { thash, status, release_id, url },
    defaultValues: { thash: '', status: 'searching', release_id: '', url: '' },
  });
  // const [data, setData] = useState<DownloadInfoValues>(values);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    changer(ev.target.name, ev.target.value);
  };
  console.log('status:', status);
  return (
    <>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(data => console.log(data))}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              sx={{ mt: 2, mr: 1, width: '75px' }}
              id="status"
              label="Status"
              margin="none"
              size="small"
              inputProps={register('status', {
                required: 'status',
              })}
              onChange={handleChange}
            >
              {statuses.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  <Stack spacing={1} direction="row">
                    <span>{option.label}</span>
                    <span style={{ width: '125px', overflow: 'hidden' }}>{option.value}</span>
                  </Stack>
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <TextField
          sx={{ mt: 2, mr: 1, width: { xs: '75px', sm: '360px' } }}
          id="hash"
          label="Hash"
          margin="none"
          size="small"
          autoComplete="off"
          {...register('thash', { required: true, onChange: handleChange })}
        />
        <TextField
          sx={{ mt: 2, mr: 1, width: { xs: '75px', sm: '360px' } }}
          id="release"
          label="Release"
          margin="none"
          size="small"
          autoComplete="off"
          {...register('release_id', { required: true, onChange: handleChange })}
        />
        <TextField
          sx={{ mt: 2, mr: 1, width: { xs: '75px', sm: '360px' } }}
          id="url"
          label="URL"
          margin="none"
          size="small"
          autoComplete="off"
          {...register('url', { required: true, onChange: handleChange })}
        />
      </Box>
    </>
  );
};
