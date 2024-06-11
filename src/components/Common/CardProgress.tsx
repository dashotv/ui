import * as React from 'react';

import { Box, Stack, useTheme } from '@mui/material';

export const CardProgress = ({
  progress,
  files,
  completed,
  wanted,
}: {
  multi?: boolean;
  progress?: number;
  files?: number;
  completed?: number;
  wanted?: number;
}) => {
  return (
    <>
      <CardMultiBar files={files} completed={completed} wanted={wanted} />
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

export const CardMultiBar = ({
  files = 0,
  completed = 0,
  wanted = 0,
}: {
  files?: number;
  completed?: number;
  wanted?: number;
}) => {
  if (files === 0 || files > 48) return null;

  const rows: React.ReactElement[] = [];
  for (let i = 0; i < files; i++) {
    rows.push(<CardMultiBarFile key={i} completed={i < completed} wanted={i < completed + wanted} />);
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
export const CardMultiBarFile = ({ completed, wanted }: { completed: boolean; wanted: boolean }) => {
  const theme = useTheme();
  const c = theme.palette.secondary.main;
  const w = theme.palette.secondary.dark;
  const grey = theme.palette.grey[700];
  const color = completed ? c : wanted ? w : grey;
  return <Box sx={{ height: '5px', width: '100%', backgroundColor: color }} className="file"></Box>;
};
