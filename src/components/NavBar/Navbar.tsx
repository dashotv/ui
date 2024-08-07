import React from 'react';
import { GrMultimedia } from 'react-icons/gr';

import { useSnackbar } from 'notistack';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DescriptionIcon from '@mui/icons-material/Description';
import FeedIcon from '@mui/icons-material/Feed';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SettingsIcon from '@mui/icons-material/Settings';
import TheatersIcon from '@mui/icons-material/Theaters';
import TvIcon from '@mui/icons-material/Tv';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import WatchIcon from '@mui/icons-material/Watch';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { Grid, IconButton, Theme, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MUIContainer from '@mui/material/Container';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';

import { Gauges } from 'components/Guages';
import { useSub } from 'hooks/sub';
import { EventNotice } from 'types/events';

import { Admin } from './Admin';
import { Messages } from './Messages';
import { NavDrawer, NavDrawerMobile } from './NavDrawer';
import './Navbar.scss';
import { Notice } from './Notice';
import { NavPageWithChildren } from './types';

const drawerWidth = 240;
const pages: NavPageWithChildren[] = [
  {
    icon: <HomeIcon fontSize="small" />,
    name: 'Home',
    page: '/',
    exact: true,
    children: [
      { icon: <UpcomingIcon fontSize="small" />, name: 'Upcoming', page: '/', exact: true },
      { icon: <CloudDownloadIcon fontSize="small" />, name: 'Downloads', page: '/downloads' },
      { icon: <VideoLibraryIcon fontSize="small" />, name: 'Collections', page: '/collections' },
    ],
  },
  {
    icon: <SvgIcon component={GrMultimedia} sx={{ height: '22px', width: '22px' }} />,
    name: 'Media',
    page: '/series',
    children: [
      { icon: <TvIcon fontSize="small" />, name: 'Series', page: '/series' },
      { icon: <TheatersIcon fontSize="small" />, name: 'Movies', page: '/movies' },
    ],
  },
  {
    icon: <LinkIcon fontSize="small" />,
    name: 'Runic',
    page: '/runic',
    children: [
      { icon: <CalendarMonthIcon fontSize="small" />, name: 'Popular', page: '/runic/popular' },
      { icon: <FindInPageIcon fontSize="small" />, name: 'Search', page: '/runic', exact: true },
      { icon: <FeedIcon fontSize="small" />, name: 'Indexers', page: '/runic/indexers' },
      { icon: <DescriptionIcon fontSize="small" />, name: 'Rift', page: '/rift' },
    ],
  },
  // {
  //   icon: <LinkIcon fontSize="small" />,
  //   name: 'Rift',
  //   page: '/rift',
  //   children: [
  //     { icon: <DescriptionIcon fontSize="small" />, name: 'Pages', page: '/rift', exact: true },
  //     { icon: <TourIcon fontSize="small" />, name: 'Visits', page: '/rift/visits', exact: true },
  //     { icon: <VideocamIcon fontSize="small" />, name: 'Videos', page: '/rift/videos', exact: true },
  //   ],
  // },
  // {
  //   icon: <ArticleIcon fontSize="small" />,
  //   name: 'Releases',
  //   page: '/releases',
  //   children: [
  //     { icon: <TodayIcon fontSize="small" />, name: 'Daily', page: '/releases', exact: true },
  //     { icon: <EventIcon fontSize="small" />, name: 'Weekly', page: '/releases/weekly' },
  //     { icon: <CalendarMonthIcon fontSize="small" />, name: 'Monthly', page: '/releases/monthly' },
  //     { icon: <FindInPageIcon fontSize="small" />, name: 'Search', page: '/releases/search' },
  //     { icon: <FeedIcon fontSize="small" />, name: 'Feeds', page: '/releases/feeds' },
  //   ],
  // },
  {
    icon: <Messages />,
    name: 'Admin',
    page: '/admin',
    exact: true,
    children: [
      { icon: <WorkHistoryIcon fontSize="small" />, name: 'Jobs', page: '/minion', exact: true },
      { icon: <WysiwygIcon fontSize="small" />, name: 'Messages', page: '/admin/logs' },
      { icon: <RecordVoiceOverIcon fontSize="small" />, name: 'Requests', page: '/admin/requests' },
      { icon: <PersonIcon fontSize="small" />, name: 'Users', page: '/admin/users' },
      { icon: <WatchIcon fontSize="small" />, name: 'Watches', page: '/admin/watches' },
      { icon: <SettingsIcon fontSize="small" />, name: 'Settings', page: '/admin/settings' },
      { icon: <SettingsIcon fontSize="small" />, name: 'Files', page: '/admin/files' },
    ],
  },
];

export const NavBar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    // if (!isClosing) {
    setMobileOpen(!mobileOpen);
    // }
  };

  useSub('tower.notices', (data: EventNotice) =>
    enqueueSnackbar('', {
      content: key => <Notice {...{ key, data }} />,
    }),
  );

  return (
    <>
      <AppBar position="static">
        <MUIContainer sx={{ overflow: 'hidden' }} maxWidth="xl">
          <Toolbar disableGutters sx={{ display: 'flex', ml: { xs: '0', md: '250px' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box flexGrow={1}></Box>
            {matches && (
              <Box sx={{ height: '54px', display: { xs: 'none', md: 'flex' } }}>
                <Gauges />
              </Box>
            )}
            <Admin />
          </Toolbar>
        </MUIContainer>
      </AppBar>
      <MUIContainer sx={{ display: { xs: 'flex', md: 'none' } }} maxWidth="xl">
        <Grid container>
          <Grid item xs={12}>
            <Gauges />
          </Grid>
        </Grid>
      </MUIContainer>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {matches && <NavDrawer {...{ pages, handleDrawerClose }} />}
        {!matches && (
          <NavDrawerMobile {...{ pages, mobileOpen, isClosing, handleDrawerClose, handleDrawerTransitionEnd }} />
        )}
      </Box>
    </>
  );
};
