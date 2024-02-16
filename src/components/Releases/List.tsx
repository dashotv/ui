import React from 'react';
import { HiOutlineNewspaper } from 'react-icons/hi2';
import { SiUtorrent } from 'react-icons/si';
import { Link } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import VideocamIcon from '@mui/icons-material/Videocam';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Chrono, Group, Resolution, Row } from 'components/Common';

import { Release, useReleaseSettingMutation } from '.';

export type ReleasesListProps = {
  data: Release[];
  actions?: (row: Release) => JSX.Element;
  selected?: { release_id: string; url: string };
};
export function ReleasesList({ data, actions, selected }: ReleasesListProps) {
  const releaseUpdate = useReleaseSettingMutation();
  const [open, setOpen] = React.useState(false);
  const [viewing, setViewing] = React.useState<Release | null>(null);

  const toggleVerified = row => {
    releaseUpdate.mutate(
      { id: row.id, setting: { setting: 'verified', value: !row.verified } },
      {
        onSuccess: () => {
          row.verified = !row.verified;
        },
      },
    );
  };

  const handleClose = () => setOpen(false);

  const view = (row: Release) => {
    setViewing(row);
    setOpen(true);
  };

  const isSelected = (row: Release) => {
    if (!selected) {
      return false;
    }
    return row.id === selected.release_id || row.download === selected.url;
  };

  return (
    <Paper elevation={0} sx={{ width: '100%' }}>
      {data?.map((row: Release) => (
        <Row key={row.id} variant={isSelected(row) ? 'selected' : undefined}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 0, md: 1 }} alignItems="center">
            <Stack
              direction="row"
              spacing={1}
              width="100%"
              maxWidth={{ xs: '100%', md: '800px' }}
              pr="3px"
              alignItems="center"
            >
              <Stack direction="row" alignItems="center" spacing={0}>
                <IconButton size="small" sx={{ pr: '2px', pl: '2px' }}>
                  {row.nzb ? (
                    <SvgIcon
                      sx={{ width: '20px', height: '20px' }}
                      component={HiOutlineNewspaper}
                      inheritViewBox
                      fontSize="small"
                      color="disabled"
                    />
                  ) : (
                    <SvgIcon
                      sx={{ width: '18px', height: '18px' }}
                      component={SiUtorrent}
                      inheritViewBox
                      fontSize="small"
                      color="disabled"
                    />
                  )}
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => toggleVerified(row)}
                  title="verified"
                  sx={{ pr: '2px', pl: '2px' }}
                >
                  <CheckCircleIcon color={row.verified ? 'secondary' : 'disabled'} fontSize="small" />
                </IconButton>
                <IconButton size="small" title="bluray" sx={{ pr: '2px', pl: '2px' }}>
                  <VideocamIcon color={row.bluray ? 'secondary' : 'disabled'} fontSize="small" />
                </IconButton>
                <IconButton size="small" title="uncensored" sx={{ pr: '2px', pl: '2px' }}>
                  <SportsBarIcon color={row.uncensored ? 'secondary' : 'disabled'} fontSize="small" />
                </IconButton>
              </Stack>
              <Typography fontWeight="bolder" noWrap color="primary" sx={{ '& a': { color: 'primary.main' } }}>
                <Link to="#" onClick={() => view(row)} title={row.raw}>
                  {row.display || row.name}
                </Link>
              </Typography>
              <Stack
                display={{ xs: 'none', md: 'inherit' }}
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ pl: 1 }}
              >
                <Resolution resolution={row.resolution} variant="default" />
                <Group group={row.group} author={row.author} variant="default" />
                <Typography variant="subtitle2" noWrap color="textSecondary">
                  {row.source}:{row.type}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ width: '100%', justifyContent: { xs: 'start', md: 'end' } }}
            >
              <Stack
                display={{ xs: 'inherit', md: 'none' }}
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ pl: 1 }}
              >
                <Resolution resolution={row.resolution} variant="default" />
                <Group group={row.group} author={row.author} variant="default" />
                <Typography display={{ xs: 'none', md: 'inherit' }} variant="subtitle2" noWrap color="textSecondary">
                  {row.source}:{row.type}
                </Typography>
              </Stack>
              <Stack
                width={{ xs: '100%', md: 'auto' }}
                direction="row"
                spacing={1}
                alignItems="center"
                border="1px solid red"
              >
                {row.size && (
                  <Typography
                    display={{ xs: 'none', md: 'inherit' }}
                    variant="subtitle2"
                    color="textSecondary"
                    pl="3px"
                  >
                    {row.size}
                  </Typography>
                )}
                <Typography noWrap variant="subtitle2" color="gray" pl="3px" width="100%">
                  {row.published_at && <Chrono fromNow>{row.published_at}</Chrono>}
                </Typography>
                <Box>{actions && actions(row)}</Box>
              </Stack>
            </Stack>
          </Stack>
        </Row>
      ))}
      {viewing && <ReleaseDialog {...{ open, handleClose }} release={viewing} actions={actions} />}
    </Paper>
  );
}

export type ReleaseDialogProps = {
  open: boolean;
  handleClose: () => void;
  release: Release;
  actions?: (row: Release) => JSX.Element;
};
export const ReleaseDialog = ({
  open,
  handleClose,
  actions,
  release,
  release: {
    title,
    display,
    raw,
    description,
    published_at,
    nzb,
    source,
    type,
    group,
    author,
    resolution,
    size,
    verified,
    view,
    download,
    infohash,
    checksum,
    created_at,
    updated_at,
    tags,
  },
}: ReleaseDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Dialog open={open} onClose={handleClose} fullWidth fullScreen={fullScreen} maxWidth="md">
      <DialogTitle>
        <Typography noWrap color="primary" variant="h6">
          {display || title}
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems="center">
          <Stack width={{ xs: '100%', md: 'inherit' }} direction="row" alignItems="center">
            <IconButton size="small" title="verified">
              <CheckCircleIcon color={verified ? 'secondary' : 'disabled'} fontSize="small" />
            </IconButton>
            <IconButton size="small">
              {nzb ? (
                <SvgIcon
                  sx={{ width: '20px', height: '20px' }}
                  component={HiOutlineNewspaper}
                  inheritViewBox
                  fontSize="small"
                  color="disabled"
                />
              ) : (
                <SvgIcon
                  sx={{ width: '18px', height: '18px' }}
                  component={SiUtorrent}
                  inheritViewBox
                  fontSize="small"
                  color="disabled"
                />
              )}
            </IconButton>
            <Stack direction="row" spacing={1} alignItems="center">
              <Resolution resolution={resolution} variant="default" />
              <Group group={group} author={author} variant="default" />
            </Stack>
          </Stack>
          <Stack width={{ xs: '100%', md: 'inherit' }} direction="row" spacing={1} alignItems="center">
            <Typography variant="subtitle2" color="textSecondary" pl="3px">
              {source}:{type}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" pl="3px">
              {size ? `${size}mb` : ''}
            </Typography>
            <Typography variant="subtitle2" color="gray" pl="3px">
              {published_at && <Chrono fromNow>{published_at}</Chrono>}
            </Typography>
          </Stack>
        </Stack>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack width="100%" direction="column" spacing={1}>
          <Typography variant="subtitle2" color="textSecondary" sx={{ position: 'relative', bottom: '-4px' }}>
            Title
          </Typography>
          <Typography minHeight="24px" variant="body1" color="primary">
            {title}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" sx={{ position: 'relative', bottom: '-4px' }}>
            Raw
          </Typography>
          <Typography minHeight="24px" variant="body1" color="primary">
            {raw}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" sx={{ position: 'relative', bottom: '-4px' }}>
            Size
          </Typography>
          <Typography minHeight="24px" variant="body1" color="primary">
            {size || '?'}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" sx={{ position: 'relative', bottom: '-4px' }}>
            Links
          </Typography>
          <div>
            {view && (
              <Link style={{ color: theme.palette.primary.main }} to={view}>
                <Typography minHeight="24px" variant="body1" color="primary">
                  View
                </Typography>
              </Link>
            )}
          </div>
          <div>
            {download && (
              <Link style={{ color: theme.palette.primary.main }} to={download}>
                <Typography minHeight="24px" variant="body1" color="primary">
                  Download
                </Typography>
              </Link>
            )}
          </div>
          <Typography variant="subtitle2" color="textSecondary" sx={{ position: 'relative', bottom: '-4px' }}>
            Hash
          </Typography>
          <Typography minHeight="24px" variant="body1" color="primary">
            {infohash}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" sx={{ position: 'relative', bottom: '-4px' }}>
            Checksum
          </Typography>
          <Typography minHeight="24px" variant="body1" color="primary">
            {checksum}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" sx={{ position: 'relative', bottom: '-4px' }}>
            Tags
          </Typography>
          <Typography minHeight="24px" variant="body1" color="primary">
            {tags}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" sx={{ position: 'relative', bottom: '-4px' }}>
            Created
          </Typography>
          <Typography minHeight="24px" variant="body1" color="primary">
            {created_at}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" sx={{ position: 'relative', bottom: '-4px' }}>
            Updated
          </Typography>
          <Typography minHeight="24px" variant="body1" color="primary">
            {updated_at}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" sx={{ position: 'relative', bottom: '-4px' }}>
            Description
          </Typography>
          <Box>{description && <div dangerouslySetInnerHTML={{ __html: description }} />}</Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Box>{actions && actions(release)}</Box>
      </DialogActions>
    </Dialog>
  );
};
