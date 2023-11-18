import React from 'react';
import { useForm } from 'react-hook-form';

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
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { Select, Text } from 'components/Form';
import { Option } from 'components/Form';

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
  const renderOption = (option: Option) => (
    <Stack spacing={1} direction="row">
      <span>{option.label}</span>
      <span style={{ width: '125px', overflow: 'hidden' }}>{option.value}</span>
    </Stack>
  );
  return (
    <Paper sx={{ mt: 2, p: 2, width: '100%' }}>
      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(data => console.log(data))}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <Select
            sx={{ width: { sm: '150px' } }}
            name="status"
            control={control}
            options={statuses}
            render={renderOption}
            onChange={handleChange}
          />
          <Text name="thash" control={control} onChange={handleChange} />
          <Text name="release_id" label="release" control={control} onChange={handleChange} />
          <Text name="url" control={control} onChange={handleChange} />
        </Stack>
      </Box>
    </Paper>
  );
};
