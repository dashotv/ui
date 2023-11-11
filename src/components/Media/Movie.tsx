import { useCallback, useState } from 'react';
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

import './Media.scss';

// TODO: watches
export default function Movie({ id, type, data, paths, change }) {
  const { cover, background, active, broken, favorite, completed } = data;
  const [activeCurrent, setActive] = useState(active);
  const [favoriteCurrent, setFavorite] = useState(favorite);
  const [brokenCurrent, setBroken] = useState(broken);
  const [completedCurrent, setCompleted] = useState(completed);
  // TODO: handle downloaded, completed

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
      click: complete,
      title: 'refresh',
    },
    {
      icon: <BuildCircleIcon color={brokenCurrent ? 'secondary' : 'action'} />,
      click: () => {
        change(id, 'broken', !brokenCurrent);
        setBroken(!brokenCurrent);
      },
      title: 'broken',
    },
    {
      icon: <CheckCircleIcon color={completedCurrent ? 'secondary' : 'action'} />,
      click: () => {
        change(id, 'completed', !completedCurrent);
        setCompleted(!completedCurrent);
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
    Details: <Details data={data} cover={cover} background={background} />,
  };

  return (
    <div className="medium large">
      <MediumBanner id={id} variant="large" medium={data} buttons={buttons} />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
