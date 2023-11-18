import { useCallback } from 'react';
import * as React from 'react';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

import { MediumBanner } from 'components/Banner';
import Details from 'components/Tabs/Details';
import { MediumTabs } from 'components/Tabs/MediumTabs';
import Paths from 'components/Tabs/Paths';
import { Movie as MovieType } from 'types/medium';

import './Media.scss';

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

  const buttons = [
    {
      icon: <DownloadForOfflineIcon color="primary" />,
      click: complete,
      title: 'create download',
    },
    {
      icon: <ReplayCircleFilledIcon color="primary" />,
      click: () => {
        refresh();
      },
      title: 'refresh',
    },
    {
      icon: <BuildCircleIcon color={broken ? 'secondary' : 'action'} />,
      click: () => {
        change(id, 'broken', !broken);
      },
      title: 'broken',
    },
    {
      icon: <DownloadForOfflineIcon color={downloaded ? 'secondary' : 'action'} />,
      click: () => {
        change(id, 'downloaded', !downloaded);
      },
      title: 'downloaded',
    },
    {
      icon: <CheckCircleIcon color={completed ? 'secondary' : 'action'} />,
      click: () => {
        change(id, 'completed', !completed);
      },
      title: 'completed',
    },
    {
      icon: <RemoveCircleIcon color="error" />,
      click: complete,
      title: 'delete',
    },
  ];

  const tabsMap = {
    Paths: <Paths paths={paths} />,
    Downloads: <div>downloads</div>,
    Watches: <div>watches</div>,
    Details: <Details medium={movie} />,
  };

  return (
    <div className="medium large">
      <MediumBanner id={id} variant="large" medium={movie} buttons={buttons} />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
