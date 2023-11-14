import React, { useEffect, useState } from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { Download } from 'types/download';

// const statuses = [
//   { label: 'searching', value: 'searching' },
//   { label: 'loading', value: 'loading' },
//   { label: 'managing', value: 'managing' },
//   { label: 'downloading', value: 'downloading' },
//   { label: 'reviewing', value: 'reviewing' },
//   { label: 'done', value: 'done' },
//   { label: 'paused', value: 'paused' },
//   { label: 'deleted', value: 'deleted' },
//   { label: 'hold', value: 'hold' },
// ];

export function DownloadInfo({
  download: { release_id, url, status, thash },
  deleter,
}: {
  download: Download;
  deleter: () => void;
}) {
  const [data, setData] = useState({ torch: '', url: '', status: '', hash: '' });

  useEffect(() => {
    const tmp = {
      torch: release_id,
      url: url,
      status: status,
      hash: thash,
    };
    setData(tmp);
  }, [release_id, url, status, thash]);

  // const handleChange = ev => {
  //   setData({ ...data, [ev.target.name]: ev.target.value });
  //   console.log('handleChange:', data);
  // };

  return (
    <Stack padding={1} direction="row">
      {data.hash && (
        <Chip sx={{ maxWidth: '350px' }} label={`Hash: ${data.hash}`} variant="outlined" size="small" color="primary" />
      )}
      {data.url && (
        <Chip
          sx={{ maxWidth: '225px' }}
          label={`URL: ${data.url}`}
          onDelete={() => deleter()}
          variant="outlined"
          size="small"
          color="primary"
        />
      )}
      {data.torch && (
        <Chip
          sx={{ maxWidth: '225px' }}
          label={`Torch: ${data.torch}`}
          onDelete={() => deleter()}
          variant="outlined"
          size="small"
          color="primary"
        />
      )}
    </Stack>
  );

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
}
