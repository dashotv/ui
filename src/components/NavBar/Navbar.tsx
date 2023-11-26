import React from 'react';
import { GrMultimedia } from 'react-icons/gr';
import { useLocation } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import MUIContainer from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/system/Box';

import { Gauges } from 'components/Guages';
import { useSub } from 'hooks/useSub';
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
    name: <HomeIcon />,
    page: '/',
    exact: true,
    children: [
      { name: 'Upcoming', page: '/', exact: true },
      { name: 'Recent', page: '/recent' },
    ],
  },
  {
    name: <SvgIcon component={GrMultimedia} sx={{ height: '22px', width: '22px' }} />,
    page: '/series',
    children: [
      { name: 'Series', page: '/series' },
      { name: 'Movies', page: '/movies' },
    ],
  },
  // {
  //   name: <TheatersIcon />,
  //   page: '/movies',
  //   children: [{ name: 'Movies', page: '/movies' }],
  // },
  {
    name: <ArticleIcon />,
    page: '/releases',
    children: [
      { name: 'Daily', page: '/releases', exact: true },
      { name: 'Weekly', page: '/releases/weekly' },
      { name: 'Monthly', page: '/releases/monthly' },
      { name: 'Search', page: '/releases/search' },
      { name: 'Feeds', page: '/releases/feeds' },
    ],
  },
  {
    name: <Messages />,
    page: '/admin',
    exact: true,
    children: [
      { name: 'Messages', page: '/admin', exact: true },
      { name: 'Jobs', page: '/admin/jobs' },
      { name: 'Requests', page: '/admin/requests' },
      { name: 'Users', page: '/admin/users' },
    ],
  },
];

export const NavBar = () => {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

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
          <Toolbar disableGutters sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Nav {...{ pages, matchPath, matchAny }} />
            <Box sx={{ height: '54px' }}>
              <Gauges />
            </Box>
            <Admin />
          </Toolbar>
          <Toolbar disableGutters sx={{ display: { xs: 'flex', md: 'none' } }}>
            <NavSmall {...{ pages, matchPath, matchAny }} />
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
