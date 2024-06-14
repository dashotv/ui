import React from 'react';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import RecommendIcon from '@mui/icons-material/Recommend';
import StarsIcon from '@mui/icons-material/Stars';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import { Box, Chip, Stack, Typography } from '@mui/material';

import { ButtonMap, ButtonMapButton, Chrono } from '@dashotv/components';

import { DownloadIcon } from 'components/Downloads';

import { CardProgress } from './CardProgress';
import { FiCard, FiCardActions, FiCardContent, FiCardFooter, FiCardMedia } from './FiCard';

export interface MediaCardProps {
  id: string;
  type: string;
  variant?: 'banner' | 'cover';
  image?: string;
  title: string;
  subtitle?: React.ReactNode;
  description?: string;
  kind?: string;
  source?: string;
  source_id?: string;
  release_date?: string;
  count?: number;
  // downloads
  multi?: boolean;
  progress?: number;
  filesSelected?: number;
  filesCompleted?: number;
  filesWanted?: number;
  queue?: string | number;
  status?: string;
  eta?: string;
  // icons
  buttons?: ButtonMapButton[]; // not sure we'll use this
  icons?: MediaCardIconsProps;
  // actions
  actions?: boolean;
}
export const MediaCard = ({
  variant = 'banner',
  type,
  title,
  subtitle,
  description,
  kind,
  source,
  source_id,
  release_date,
  image,
  count,
  progress,
  filesSelected,
  filesCompleted,
  filesWanted,
  queue,
  eta,
  status,
  icons,
  buttons,
  actions = true,
}: MediaCardProps) => {
  return (
    <FiCard variant={variant}>
      {image && <FiCardMedia image={image} title={title} />}
      <FiCardContent>
        <Stack direction="column" spacing={0} sx={{ m: 0.5 }}>
          <Typography variant="body2" fontSize="large" fontWeight="bolder" component="div" noWrap minWidth="0">
            {title}
          </Typography>
          {subtitle && subtitle !== title && (
            <Typography variant="body2" fontSize="small" noWrap minWidth="0">
              {subtitle}
            </Typography>
          )}
          <Stack direction="row" spacing={1}>
            {kind ? (
              <Typography variant="body2" fontWeight="bolder" color="primary">
                {kind}
              </Typography>
            ) : null}
            {source ? (
              <Typography variant="body2" fontWeight="bolder" color="secondary" title={source_id}>
                {source}
              </Typography>
            ) : null}
            {type === 'download' && release_date ? (
              <Typography variant="body2" color="gray">
                <Chrono fromNow special stamp={release_date} />
              </Typography>
            ) : null}
          </Stack>
          <Box sx={{ maxHeight: '37px', overflow: 'hidden' }}>
            <Typography className="coverDescription" variant="body2" sx={{ display: 'none' }}>
              {description}
            </Typography>
          </Box>
        </Stack>
      </FiCardContent>
      <FiCardFooter>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
          {type === 'download' && status ? (
            <Stack direction="row" spacing={1} width="100%" alignItems="center" justifyContent="space-between">
              <MediaCardStatus status={status} queue={queue} progress={progress} eta={eta} />
              <MediaCardIcons {...icons} />
            </Stack>
          ) : (
            <>
              <Stack direction="row" spacing={1} alignItems="center">
                {release_date ? (
                  <Typography variant="body2" color="gray">
                    <Chrono fromNow special stamp={release_date} />
                  </Typography>
                ) : null}
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <MediaCardIcons {...icons} />
                {count && count > 0 ? <Chip label={count} color="primary" size="small" /> : null}
              </Stack>
            </>
          )}
        </Stack>
      </FiCardFooter>
      <FiCardActions>{actions && buttons?.length ? <ButtonMap buttons={buttons} size="small" /> : null}</FiCardActions>
      <CardProgress progress={progress} files={filesSelected} completed={filesCompleted} wanted={filesWanted} />
    </FiCard>
  );
};

export type MediaCardIconsProps = {
  active?: boolean;
  favorite?: boolean;
  broken?: boolean;
  downloaded?: boolean;
  completed?: boolean;
  auto?: boolean;
  multi?: boolean;
  force?: boolean;
};
export function MediaCardIcons({
  active,
  favorite,
  broken,
  completed,
  downloaded,
  auto,
  multi,
  force,
}: MediaCardIconsProps) {
  return (
    <Stack spacing={'2px'} direction="row">
      {broken && <BuildCircleIcon fontSize="small" color="action" />}
      {downloaded && <DownloadForOfflineIcon fontSize="small" color="action" />}
      {completed && <CheckCircleIcon fontSize="small" color="action" />}
      {favorite && <RecommendIcon fontSize="small" color="action" />}
      {active && <StarsIcon fontSize="small" color="action" />}
      {auto && <OfflineBoltIcon fontSize="small" color="action" />}
      {multi && <PlaylistAddCheckCircleIcon fontSize="small" color="action" />}
      {force && <SwapHorizontalCircleIcon fontSize="small" color="action" />}
    </Stack>
  );
}

export const MediaCardStatus = ({
  status,
  queue,
  progress,
  eta,
}: {
  status?: string;
  queue?: string | number;
  progress?: number;
  eta?: string;
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {queue ? <Chip label={queue} size="small" color="secondary" /> : null}
      <DownloadIcon status={status} />
      {progress ? <span>{progress.toFixed(1)}%</span> : null}
      {eta ? <Chrono fromNow>{eta}</Chrono> : null}
    </Stack>
  );
};

// export const MediaCardButtons = ({ id, type, icons }: { id: string; type: string; icons?: MediaCardIconsProps }) => {
//   let buttons: ButtonMapButton[] = [];
//
//   switch (type.toLowerCase()) {
//     case 'upcoming':
//       buttons = [
//         {
//           Icon: StarsIcon,
//           color: icons?.active ? 'secondary' : 'disabled',
//           click: () => console.log('click', id, type),
//           title: 'Active',
//         },
//         {
//           Icon: CloudCircleIcon,
//           color: 'primary',
//           click: () => console.log('click', id, type),
//           title: 'Download',
//         },
//       ];
//       break;
//     case 'download':
//       buttons = [
//         {
//           Icon: CheckCircleIcon,
//           color: 'primary',
//           click: () => console.log('click', id, type),
//           title: 'Done',
//         },
//         {
//           Icon: CancelIcon,
//           color: 'error',
//           click: () => console.log('click', id, type),
//           title: 'Delete',
//         },
//       ];
//       break;
//     case 'series':
//       buttons = [
//         {
//           Icon: BuildCircleIcon,
//           color: icons?.broken ? 'secondary' : 'disabled',
//           click: () => console.log('click', id, type),
//           title: 'Broken',
//         },
//         {
//           Icon: RecommendIcon,
//           color: icons?.favorite ? 'secondary' : 'disabled',
//           click: () => console.log('click', id, type),
//           title: 'Favorite',
//         },
//         {
//           Icon: StarsIcon,
//           color: icons?.active ? 'secondary' : 'disabled',
//           click: () => console.log('click', id, type),
//           title: 'Active',
//         },
//         {
//           Icon: CloudCircleIcon,
//           color: 'primary',
//           click: () => console.log('click', id, type),
//           title: 'Download',
//         },
//         {
//           Icon: ReplayCircleFilledIcon,
//           color: 'primary',
//           click: () => console.log('click', id, type),
//           title: 'Update',
//         },
//         {
//           Icon: RemoveCircleIcon,
//           color: 'error',
//           click: () => console.log('click', id, type),
//           title: 'Delete',
//         },
//       ];
//       break;
//     case 'movie':
//       buttons = [
//         {
//           Icon: BuildCircleIcon,
//           color: icons?.broken ? 'secondary' : 'disabled',
//           click: () => console.log('click', id, type),
//           title: 'Broken',
//         },
//         {
//           Icon: DownloadForOfflineIcon,
//           color: icons?.downloaded ? 'secondary' : 'disabled',
//           click: () => console.log('click', id, type),
//           title: 'Broken',
//         },
//         {
//           Icon: CheckCircleIcon,
//           color: icons?.completed ? 'secondary' : 'disabled',
//           click: () => console.log('click', id, type),
//           title: 'Broken',
//         },
//         {
//           Icon: CloudCircleIcon,
//           color: 'primary',
//           click: () => console.log('click', id, type),
//           title: 'Download',
//         },
//         {
//           Icon: ReplayCircleFilledIcon,
//           color: 'primary',
//           click: () => console.log('click', id, type),
//           title: 'Update',
//         },
//         {
//           Icon: RemoveCircleIcon,
//           color: 'error',
//           click: () => console.log('click', id, type),
//           title: 'Delete',
//         },
//       ];
//       break;
//     default:
//       buttons = [];
//   }
//   if (!buttons.length) {
//     return null;
//   }
//   return <ButtonMap buttons={buttons} size="small" />;
// };

// export const MediaCardMenu = ({ id, type }: { id: string; type: string }) => {
//   // const [icon, setIcon] = React.useState<React.ReactNode>(<MoreVertIcon fontSize="small" />);
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleClick = event => {
//     setAnchorEl(event.currentTarget);
//     event.stopPropagation();
//     event.nativeEvent.stopImmediatePropagation();
//     event.preventDefault();
//     return false;
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   return (
//     <>
//       <IconButton
//         size="small"
//         aria-controls={open ? 'basic-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         <MoreVertIcon fontSize="small" />
//       </IconButton>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           'aria-labelledby': 'basic-button',
//         }}
//       >
//         <MenuItem onClick={handleClose}>Profile</MenuItem>
//         <MenuItem onClick={handleClose}>My account</MenuItem>
//         <MenuItem onClick={handleClose}>Logout</MenuItem>
//       </Menu>
//     </>
//   );
// };
//
// export const MediaCardMenuContent = ({
//   id,
//   type,
//   open,
//   anchorEl,
//   handleClose,
// }: {
//   id: string;
//   type: string;
//   anchorEl: null | HTMLElement;
//   open: boolean;
//   handleClose: () => void;
// }) => {
//   switch (type) {
//     default:
//       return (
//         <Menu
//           id="basic-menu"
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleClose}
//           MenuListProps={{
//             'aria-labelledby': 'basic-button',
//           }}
//         >
//           <MenuItem onClick={handleClose}>Profile</MenuItem>
//           <MenuItem onClick={handleClose}>My account</MenuItem>
//           <MenuItem onClick={handleClose}>Logout</MenuItem>
//         </Menu>
//       );
//   }
// };

// export const MediaDownloadCard = ({
//   variant = 'default',
//   title,
//   subtitle,
//   // description,
//   kind,
//   source,
//   source_id,
//   image,
//   count,
//   progress,
//   buttons,
//   files,
//   completed,
//   queue,
//   status,
//   eta,
//   icons,
//   actions = true,
// }: MediaCardProps) => {
//   if (variant === 'row') {
//     return (
//       <MediaRow {...{ title, subtitle, kind, source, source_id, image, count, progress, buttons, files, completed }} />
//     );
//   }
//   return (
//     <FiCard variant={variant}>
//       {image && <FiCardMedia image={image} title={title} />}
//       <FiCardContent>
//         <Stack direction="column" spacing={0} sx={{ m: 0.5 }}>
//           <Typography variant="body2" fontSize="large" fontWeight="bolder" component="div" noWrap minWidth="0">
//             {title}
//           </Typography>
//           {subtitle && subtitle !== title && (
//             <Typography variant="body2" fontSize="small" noWrap minWidth="0">
//               {subtitle}
//             </Typography>
//           )}
//         </Stack>
//       </FiCardContent>
//       <FiCardFooter>
//         <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
//           <Stack direction="row" spacing={1} alignItems="center">
//             <DownloadIcon status={status} />
//             {queue ? <Chip label={queue} size="small" color="secondary" /> : null}
//             {progress ? <span>{progress.toFixed(1)}%</span> : null}
//             {eta ? <Chrono fromNow>{eta}</Chrono> : null}
//           </Stack>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <MediaCardIcons {...icons} />
//             {count && count > 0 ? <Chip label={count} color="primary" size="small" /> : null}
//           </Stack>
//         </Stack>
//       </FiCardFooter>
//       <FiCardActions>
//         <Stack direction="row" spacing={1} alignItems="center" justifyContent="end">
//           {buttons ? <ButtonMap buttons={buttons} /> : null}
//           {count && count > 0 ? <Chip label={count} color="primary" size="small" /> : null}
//         </Stack>
//       </FiCardActions>
//       <CardProgress progress={progress} files={files} completed={completed} />
//     </FiCard>
//   );
// };
