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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

import { Option, Select, Text } from 'components/Form';

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

export interface DownloadInfoValues {
  thash?: string;
  status?: string;
  tag?: string;
  url?: string;
}
export type DownloadInfoProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  thash?: string;
  status?: string;
  url?: string;
  tag?: string;
  changer: (data: DownloadInfoValues) => void;
};
export const DownloadInfo = ({ open, setOpen, tag, url, status, thash, changer }: DownloadInfoProps) => {
  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<DownloadInfoValues>({
    values: { thash, status, tag, url },
    defaultValues: { thash: '', status: 'searching', tag: '', url: '' },
  });
  // const [data, setData] = useState<DownloadInfoValues>(values);
  const submit = (data: DownloadInfoValues) => {
    setOpen(false);
    if (data.status === 'searching') {
      data.url = '';
    }
    changer(data);
  };
  const renderOption = (option: Option) => (
    <Stack spacing={1} direction="row">
      <span>{option.label}</span>
      <span style={{ width: '125px', overflow: 'hidden' }}>{option.value}</span>
    </Stack>
  );
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle>Download Info</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
          <Stack direction="column" spacing={1}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
              <Select name="status" control={control} options={statuses} render={renderOption} />
              <Text name="thash" control={control} />
            </Stack>
            <Text name="url" control={control} />
            <Text name="tag" control={control} />
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
            <Button variant="contained" fullWidth onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" fullWidth type="submit">
              Ok
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
