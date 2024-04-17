import * as React from 'react';

import { Box, Stack, useTheme } from '@mui/material';

export const CardProgress = ({
  progress,
  files,
  completed,
}: {
  progress?: number;
  files?: number;
  completed?: number;
}) => {
  return (
    <>
      {files && completed && <CardMultiBar files={files} completed={completed} />}
      {progress && <CardProgressBar progress={progress} />}
    </>
  );
};

export const CardProgressBar = ({ progress }: { progress: number }) => {
  const theme = useTheme();
  const grey = theme.palette.grey[700];
  return (
    <>
      <Box
        className="cardProgressBar"
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          height: '5px',
          width: '100%',
          backgroundColor: grey,
        }}
      >
        <Box className="cardProgress" sx={{ height: '100%', width: `${progress}%`, backgroundColor: 'primary.main' }} />
      </Box>
    </>
  );
};

export const CardMultiBar = ({ files, completed }: { files: number; completed: number }) => {
  if (files === 0 || files > 48) return null;

  const rows: React.ReactElement[] = [];
  for (let i = 0; i < files; i++) {
    rows.push(<CardMultiBarFile completed={i < completed} />);
  }
  return (
    <>
      <Box className="cardMultiBar" sx={{ position: 'absolute', top: 0, right: 0, left: 0, height: '5px' }}>
        <Stack sx={{ width: '100%' }} direction="row" spacing="2px" className="multibar">
          {rows}
        </Stack>
      </Box>
    </>
  );
};
export const CardMultiBarFile = ({ completed }: { completed: boolean }) => {
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const grey = theme.palette.grey[700];
  return (
    <Box sx={{ height: '5px', width: '100%', backgroundColor: completed ? secondary : grey }} className="file"></Box>
  );
};
