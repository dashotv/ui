import React, { useEffect, useState } from 'react';
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
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { Download } from 'types/download';

// export function DownloadInfo({
//   download: { release_id, url, status, thash },
//   deleter,
// }: {
//   download: Download;
//   deleter: () => void;
// }) {
//   const [data, setData] = useState({ torch: '', url: '', status: '', hash: '' });
//
//   useEffect(() => {
//     const tmp = {
//       torch: release_id,
//       url: url,
//       status: status,
//       hash: thash,
//     };
//     setData(tmp);
//   }, [release_id, url, status, thash]);

// const handleChange = ev => {
//   setData({ ...data, [ev.target.name]: ev.target.value });
//   console.log('handleChange:', data);
// };

// return (
//   <Stack padding={1} direction="row">
//     {data.hash && (
//       <Chip sx={{ maxWidth: '350px' }} label={`Hash: ${data.hash}`} variant="outlined" size="small" color="primary" />
//     )}
//     {data.url && (
//       <Chip
//         sx={{ maxWidth: '225px' }}
//         label={`URL: ${data.url}`}
//         onDelete={() => deleter()}
//         variant="outlined"
//         size="small"
//         color="primary"
//       />
//     )}
//     {data.torch && (
//       <Chip
//         sx={{ maxWidth: '225px' }}
//         label={`Torch: ${data.torch}`}
//         onDelete={() => deleter()}
//         variant="outlined"
//         size="small"
//         color="primary"
//       />
//     )}
//   </Stack>
// );

// return (
//   <Box component="form" noValidate autoComplete="off">
//     <TextField
//       sx={{ m: 1, width: '125px' }}
//       id="status"
//       name="status"
//       select
//       label="Status"
//       variant="standard"
//       margin="none"
//       size="small"
//       value={data.status}
//       onChange={handleChange}
//     >
//       {statuses.map(option => (
//         <MenuItem key={option.value} value={option.value}>
//           {option.label}
//         </MenuItem>
//       ))}
//     </TextField>
//     <TextField
//       sx={{ m: 1, width: '300px' }}
//       id="torch"
//       name="torch"
//       label="Torch"
//       variant="standard"
//       margin="none"
//       size="small"
//       value={data.torch}
//       onChange={handleChange}
//     />
//     <TextField
//       sx={{ m: 1, width: '300px' }}
//       id="url"
//       name="url"
//       label="URL"
//       variant="standard"
//       margin="none"
//       size="small"
//       value={data.url}
//       onChange={handleChange}
//     />
//     <TextField
//       sx={{ m: 1, width: '300px' }}
//       id="hash"
//       name="hash"
//       label="Infohash"
//       variant="standard"
//       margin="none"
//       size="small"
//       value={data.hash}
//       onChange={handleChange}
//     />
//   </Box>
// );
// }

// const statuses: string[] = [
//   'searching',
//   'loading',
//   'managing',
//   'reviewing',
//   'downloading',
//   'done',
//   'paused',
//   'deleted',
//   'held',
// ];
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
                  {option.label}
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
