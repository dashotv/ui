import React from 'react';
import { GrMultimedia } from 'react-icons/gr';
import { useLocation } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import ArticleIcon from '@mui/icons-material/Article';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import EventIcon from '@mui/icons-material/Event';
import FeedIcon from '@mui/icons-material/Feed';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import TheatersIcon from '@mui/icons-material/Theaters';
import TodayIcon from '@mui/icons-material/Today';
import TvIcon from '@mui/icons-material/Tv';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import WatchIcon from '@mui/icons-material/Watch';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import { Theme, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MUIContainer from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/system/Box';

import { Gauges } from 'components/Guages';
import { useSub } from 'hooks/sub';
import { EventNotice } from 'types/events';

import { Admin } from './Admin';
import { Messages } from './Messages';
import { Nav } from './Nav';
import { NavSmall } from './NavSmall';
import './Navbar.scss';
import { Notice } from './Notice';
import { Subnav } from './Subnav';
import { NavPage, NavPageWithChildren } from './types';

const pages: NavPageWithChildren[] = [
  {
    icon: <HomeIcon />,
    name: 'Home',
    page: '/',
    exact: true,
    children: [
      { icon: <UpcomingIcon />, name: 'Upcoming', page: '/', exact: true },
      { icon: <CloudDownloadIcon />, name: 'Downloads', page: '/downloads' },
      { icon: <VideoLibraryIcon />, name: 'Collections', page: '/collections' },
    ],
  },
  {
    icon: <SvgIcon component={GrMultimedia} sx={{ height: '22px', width: '22px' }} />,
    name: 'Media',
    page: '/series',
    children: [
      { icon: <TvIcon />, name: 'Series', page: '/series' },
      { icon: <TheatersIcon />, name: 'Movies', page: '/movies' },
    ],
  },
  {
    icon: <ArticleIcon />,
    name: 'Releases',
    page: '/releases',
    children: [
      { icon: <TodayIcon />, name: 'Daily', page: '/releases', exact: true },
      { icon: <EventIcon />, name: 'Weekly', page: '/releases/weekly' },
      { icon: <CalendarMonthIcon />, name: 'Monthly', page: '/releases/monthly' },
      { icon: <FindInPageIcon />, name: 'Search', page: '/releases/search' },
      { icon: <FeedIcon />, name: 'Feeds', page: '/releases/feeds' },
    ],
  },
  {
    icon: <Messages />,
    name: 'Admin',
    page: '/admin',
    exact: true,
    children: [
      { icon: <WorkHistoryIcon />, name: 'Jobs', page: '/admin', exact: true },
      { icon: <WysiwygIcon />, name: 'Messages', page: '/admin/logs' },
      { icon: <RecordVoiceOverIcon />, name: 'Requests', page: '/admin/requests' },
      { icon: <PersonIcon />, name: 'Users', page: '/admin/users' },
      { icon: <WatchIcon />, name: 'Watches', page: '/admin/watches' },
    ],
  },
];

export const NavBar = () => {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const matchPath = (path: string, exact?: boolean): boolean => {
    if (exact) {
      return path === location.pathname;
    }
    return location.pathname.startsWith(path);
  };

  const matchAny = (path: string, exact?: boolean, children?: NavPage[]): boolean => {
    if (children && children?.length > 0) {
      return children.some(({ page, exact }) => matchPath(page, exact)) || matchPath(path, exact);
    }
    return matchPath(path, exact);
  };

  const matchChildren = (pages: NavPageWithChildren[]): number => {
    for (let i = 0; i < pages.length; i++) {
      if (matchAny(pages[i].page, pages[i].exact, pages[i].children)) {
        return i;
      }
    }
    return 0;
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
          <Toolbar disableGutters sx={{ display: 'flex' }}>
            <Stack spacing={0} direction="row" alignItems="center" flexGrow={1}>
              {matches ? <Nav {...{ pages, matchPath, matchAny }} /> : <NavSmall {...{ pages, matchPath, matchAny }} />}
            </Stack>
            <Box sx={{ height: '54px', display: { xs: 'none', md: 'flex' } }}>
              <Gauges />
            </Box>
            <Admin />
          </Toolbar>
        </MUIContainer>
      </AppBar>
      <MUIContainer sx={{ display: { xs: 'flex', md: 'none' } }} maxWidth="xl">
        <Grid container>
          <Grid item xs={12}>
            <Gauges />
          </Grid>
          <Grid item xs={12}>
            <Subnav items={pages[matchChildren(pages)].children} />
          </Grid>
        </Grid>
      </MUIContainer>
    </>
  );
};
