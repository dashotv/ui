import * as React from 'react';

import { Chip, Stack, Typography } from '@mui/material';

import { ButtonMap, ButtonMapButton, Chrono } from '@dashotv/components';

import { DownloadType } from 'components/Downloads';
import { useDownloading } from 'hooks/downloading';

import { CardProgress } from './CardProgress';
import { FiCard, FiCardActions, FiCardContent, FiCardFooter, FiCardMedia } from './FiCard';

export interface CoverProps {
  title: string;
  subtitle?: React.ReactNode;
  description?: string;
  image?: string;
  kind: string;
  source?: string;
  source_id?: string;
  release_date?: string;
  count?: number;
  progress?: number;
  buttons?: ButtonMapButton[];
  files?: number;
  completed?: number;
  actions?: boolean;
}
export const Cover = ({
  title,
  subtitle,
  // description,
  kind,
  source,
  source_id,
  release_date,
  image,
  count,
  progress,
  buttons,
  files,
  completed,
  actions = true,
}: CoverProps) => {
  return (
    <FiCard>
      {image && <FiCardMedia image={image} title={title} />}
      <FiCardContent>
        <Stack direction="column" spacing={0} sx={{ m: 0.5 }}>
          <Typography variant="body2" fontSize="large" fontWeight="bolder" component="div" noWrap minWidth="0">
            {title}
          </Typography>
          {subtitle && subtitle !== title && (
            <Typography variant="caption" noWrap minWidth="0">
              {subtitle}
            </Typography>
          )}
        </Stack>
        {/* <Box sx={{ flex: 2, ml: 0.5, mr: 0.5, overflow: 'hidden' }}>
          <Typography className="coverDescription" variant="body2" sx={{ display: 'none' }}>
            {description}
          </Typography>
        </Box> */}
      </FiCardContent>
      <FiCardFooter>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center">
            {release_date ? <Chrono fromNow stamp={release_date} /> : null}
            <Typography variant="body2" fontWeight="bolder" color="primary">
              {kind}
            </Typography>
            <Typography variant="body2" fontWeight="bolder" color="secondary" title={source_id}>
              {source}
            </Typography>
          </Stack>
          {count && count > 0 ? <Chip label={count} color="primary" size="small" /> : null}
        </Stack>
      </FiCardFooter>
      {actions ? <FiCardActions>{buttons ? <ButtonMap buttons={buttons} /> : null}</FiCardActions> : null}
      <CardProgress progress={progress} files={files} completed={completed} />
    </FiCard>
  );
};

export const CoverDownload = ({ download, buttons }: { download: DownloadType; buttons?: ButtonMapButton[] }) => {
  const { get } = useDownloading();
  const { title, display, kind, source, background } = download.medium;
  const {
    progress,
    // eta,
    queue,
    files,
    // torrent_state: torrentState,
  } = get(download.id);
  const { completed, selected } = files || {};
  return (
    <Cover
      title={title}
      subtitle={display}
      kind={kind}
      source={source}
      image={background}
      progress={Number(progress)}
      count={queue}
      files={selected}
      completed={completed}
      buttons={buttons}
    />
  );
};
