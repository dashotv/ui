import * as React from 'react';

import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { ButtonMap, ButtonMapButton } from 'components/Common';
import { DownloadType } from 'components/Downloads';
import { useDownloading } from 'hooks/downloading';

export interface CoverProps {
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
export const Cover = ({
  title,
  subtitle,
  description,
  kind,
  source,
  source_id,
  image,
  count,
  progress,
  buttons,
  files,
  completed,
}: CoverProps) => {
  return (
    <FiCard>
      {image && <FiCardMedia image={image} title={title} />}
      <FiCardContent>
        <Stack direction="column" spacing={1} sx={{ m: 1 }}>
          <Typography variant="body2" fontSize="large" fontWeight="bolder" component="div" noWrap minWidth="0">
            {title}
          </Typography>
          {subtitle && subtitle !== title && (
            <Typography variant="body2" noWrap minWidth="0">
              {subtitle}
            </Typography>
          )}
        </Stack>
        <Box sx={{ flexGrow: 1, m: 0.5, overflow: 'hidden' }}>
          <Typography className="coverDescription" variant="body2" sx={{ display: 'none' }}>
            {description}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ m: 1 }} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" fontWeight="bolder" color="primary">
              {kind}
            </Typography>
            <Typography variant="body2" fontWeight="bolder" color="secondary" title={source_id}>
              {source}
            </Typography>
          </Stack>
          {count && count > 0 && <Chip label={count} color="primary" size="small" />}
        </Stack>
      </FiCardContent>
      <FiCardActions>{buttons && <ButtonMap buttons={buttons} />}</FiCardActions>
      <CardProgress progress={progress} files={files} completed={completed} />
    </FiCard>
  );
};

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
          top: 0,
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
      <Box className="cardMultiBar" sx={{ position: 'absolute', top: '6px', right: 0, left: 0, height: '5px' }}>
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

export const FiCard = ({ children }: { children: React.ReactNode }) => (
  <Card
    sx={{
      width: { xs: '100%', sm: '150px' },
      height: { xs: '125px', sm: '225px' },
      position: 'relative',
      '&:hover': {
        '& .fiCardActions': { display: 'block' },
        '& .coverDescription': { display: 'block' },
        '& .fiCardContent': { backgroundColor: 'rgba(0,0,0,0.8)' },
      },
    }}
  >
    {children}
  </Card>
);

export const FiCardActionArea = ({ children }: { children: React.ReactNode }) => (
  <CardActionArea sx={{ position: 'relative' }}>{children}</CardActionArea>
);

export const FiCardActions = ({ children }: { children: React.ReactNode }) => (
  <CardActions
    className="fiCardActions"
    sx={{
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      pb: 1.5,
      display: 'none',
      backgroundColor: 'rgba(0,0,0,0.6)',
    }}
  >
    {children}
  </CardActions>
);

export const FiCardContent = ({ children }: { children: React.ReactNode }) => (
  <CardContent
    className="fiCardContent"
    sx={{
      p: '3px',
      position: 'relative',
      backgroundColor: 'rgba(0,0,0,0.6)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    }}
  >
    {children}
  </CardContent>
);

export const FiCardMedia = ({ image, title }: { image: string; title: string }) => (
  <CardMedia
    className="fiCardMedia"
    sx={{
      position: 'absolute',
      top: 0,
      right: 0,
      height: '100%',
      width: '100%',
    }}
    image={image}
    title={title}
  />
);

export const CoverDownload = ({ download, buttons }: { download: DownloadType; buttons?: ButtonMapButton[] }) => {
  const { get } = useDownloading();
  const { title, display, kind, source, background } = download.medium;
  const {
    progress,
    // eta,
    queue,
    files: { completed: files, selected: total },
    // torrent_state: torrentState,
  } = get(download.id);
  return (
    <Cover
      title={title}
      subtitle={display}
      kind={kind}
      source={source}
      image={background}
      progress={Number(progress)}
      count={queue}
      files={total}
      completed={files}
      buttons={buttons}
    />
  );
};
