import { useCallback } from 'react';
import * as React from 'react';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

import { ButtonMapButton } from 'components/Common';
import { Details, Paths, RoutingTabs, RoutingTabsRoute } from 'components/Tabs';

import { MediumBanner } from '.';
import './Media.scss';
import { Movie as MovieType } from './types';

export type MovieProps = {
  id: string;
  movie: MovieType;
  change: (id: string, key: string, value) => void;
  refresh: () => void;
};
// TODO: watches
export default function Movie({
  id,
  movie,
  movie: { paths, broken, downloaded, completed },
  change,
  refresh,
}: MovieProps) {
  const complete = useCallback(ev => {
    console.log('clicked complete');
    ev.preventDefault(); // for the buttons inside the Link component
  }, []);

  const buttons: ButtonMapButton[] = [
    {
      Icon: CloudCircleIcon,
      color: 'primary',
      click: complete,
      title: 'create download',
    },
    {
      Icon: ReplayCircleFilledIcon,
      color: 'primary',
      click: () => {
        refresh();
      },
      title: 'refresh',
    },
    {
      Icon: BuildCircleIcon,
      color: broken ? 'secondary' : 'action',
      click: () => {
        change(id, 'broken', !broken);
      },
      title: 'broken',
    },
    {
      Icon: DownloadForOfflineIcon,
      color: downloaded ? 'secondary' : 'action',
      click: () => {
        change(id, 'downloaded', !downloaded);
      },
      title: 'downloaded',
    },
    {
      Icon: CheckCircleIcon,
      color: completed ? 'secondary' : 'action',
      click: () => {
        change(id, 'completed', !completed);
      },
      title: 'completed',
    },
    {
      Icon: RemoveCircleIcon,
      color: 'error',
      click: complete,
      title: 'delete',
    },
  ];

  const tabsMap: RoutingTabsRoute[] = [
    {
      label: 'Paths',
      to: '',
      element: <Paths paths={paths} />,
    },
    {
      label: 'Details',
      to: 'details',
      element: <Details medium={movie} />,
    },
    {
      label: 'Downloads',
      to: 'downloads',
      element: <div>downloads</div>,
    },
    {
      label: 'Watches',
      to: 'watches',
      element: <div>watches</div>,
    },
  ];

  return (
    <div className="medium large">
      <MediumBanner id={id} variant="large" medium={movie} buttons={buttons} />
      <RoutingTabs data={tabsMap} route={`/movies/${id}`} />
    </div>
  );
}
