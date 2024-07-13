import React from 'react';

import { Box, Chip, LinearProgress, Stack, Typography, useTheme } from '@mui/material';

import { ButtonMap, ButtonMapButton, Row } from '@dashotv/components';

export interface CoverRowProps {
  title: string;
  subtitle?: React.ReactNode;
  description?: string;
  image?: string;
  kind: string;
  source?: string;
  source_id?: string;
  count?: number;
  progress?: number;
  buttons?: ButtonMapButton[];
  files?: number;
  completed?: number;
}
export const CoverRow = ({
  title,
  subtitle,
  //   description,
  kind,
  source,
  source_id,
  image,
  count,
  progress,
  buttons,
  files,
  completed,
}: CoverRowProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        border: '1px solid #323232',
        mb: 1,
        ':before': {
          content: '" "',
          display: 'block',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          opacity: '0.1',
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          overflow: 'hidden',
        },
      }}
    >
      <Row>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ pr: 1, pl: 1, width: '100%', position: 'relative' }}
        >
          <Stack direction="column" sx={{ width: '100%' }}>
            <Typography variant="body2" fontSize="large" fontWeight="bolder" component="div" noWrap minWidth="0">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" noWrap minWidth="0">
                {subtitle}
              </Typography>
            )}
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" fontWeight="bolder" color="primary">
                {kind}
              </Typography>
              <Typography variant="body2" fontWeight="bolder" color="secondary" title={source_id}>
                {source}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={1}
            alignItems="center"
            justifyContent="end"
            sx={{ p: 1, maxWidth: '200px' }}
          >
            <CoverRowProgress progress={progress} />
            <CoverRowMulti files={files} completed={completed} />
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="end" width="100%">
              {buttons && <ButtonMap buttons={buttons} size="small" />}
              <CoverRowCount count={count} />
            </Stack>
          </Stack>
        </Stack>
      </Row>
    </Box>
  );
};

const CoverRowProgress = ({ progress }: { progress?: number }) => {
  if (!progress || progress <= 0) return null;
  return (
    <Box sx={{ width: '200px' }}>
      <LinearProgress variant="determinate" value={progress} color="primary" />
    </Box>
  );
};
const CoverRowMulti = ({ files, completed }: { files?: number; completed?: number }) => {
  if (!files || completed === undefined || files === 0 || files > 48) return null;

  const rows: React.ReactElement[] = [];
  for (let i = 0; i < files; i++) {
    rows.push(<CoverRowMultiFile completed={i < completed} />);
  }
  return (
    <>
      <Box sx={{ height: '4px', width: '200px' }}>
        <Stack sx={{ width: '100%' }} direction="row" spacing="2px" className="multibar">
          {rows}
        </Stack>
      </Box>
    </>
  );
};

export const CoverRowMultiFile = ({ completed }: { completed: boolean }) => {
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const grey = theme.palette.grey[700];
  return <Box sx={{ height: '4px', width: '100%', backgroundColor: completed ? secondary : grey }}></Box>;
};

const CoverRowCount = ({ count }: { count?: number }) => {
  if (!count || count <= 0) return null;
  return <Chip label={count} color="primary" size="small" />;
};
