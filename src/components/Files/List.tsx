import React from 'react';

import { File } from 'client/tower';

import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import { Paper, Stack, Typography } from '@mui/material';

import { PathIcon } from 'components/Paths';

export const FilesList = ({ data }: { data?: File[] }) => {
  return (
    <Paper elevation={0} sx={{ p: 1, mb: 2 }}>
      {data?.map((file: File) => <FileRow key={file.id} file={file} />)}
    </Paper>
  );
};

const FileRow = ({ file }: { file: File }) => {
  return (
    <Stack direction="row" spacing={1}>
      <PathIcon extension={file.extension} type={file.type} />
      <CheckCircleOutline
        fontSize="small"
        color={file.medium_id !== '000000000000000000000000' ? 'primary' : 'disabled'}
      />

      <Typography variant="body1" color="primary">
        {file.name !== '' && file.extension !== '' ? `${file.name}.${file.extension}` : file.path}
      </Typography>
    </Stack>
  );
};
