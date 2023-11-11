import { useCallback, useState } from 'react';
import * as React from 'react';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import RecommendIcon from '@mui/icons-material/Recommend';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import StarsIcon from '@mui/icons-material/Stars';

import { MediumBanner } from 'components/Banner';
import Details from 'components/Tabs/Details';
import Episodes from 'components/Tabs/Episodes';
import { MediumTabs } from 'components/Tabs/MediumTabs';
import Paths from 'components/Tabs/Paths';
import Seasons from 'components/Tabs/Seasons';
import Watches from 'components/Tabs/Watches';

import './Media.scss';

export function Series({
  id,
  type,
  data,
  paths,
  seasons,
  currentSeason,
  episodes,
  changeSeason,
  changeEpisode,
  change,
  watches,
}) {
  const { cover, background, active, broken, favorite, completed } = data;
  const [activeCurrent, setActive] = useState(active);
  const [favoriteCurrent, setFavorite] = useState(favorite);
  const [brokenCurrent, setBroken] = useState(broken);
  const [completedCurrent, setCompleted] = useState(completed);

  const tabsMap = {
    Episodes: (
      <>
        <Seasons current={currentSeason} seasons={seasons} changeSeason={changeSeason} />
        <Episodes episodes={episodes} changeEpisode={changeEpisode} />
      </>
    ),
    Paths: <Paths paths={paths} />,
    Downloads: <div>downloads</div>,
    Watches: <Watches data={watches} />,
    Details: <Details data={data} cover={cover} background={background} />,
  };

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
      icon: <RecommendIcon color={favoriteCurrent ? 'secondary' : 'action'} />,
      click: () => {
        change(id, 'favorite', !favoriteCurrent);
        setFavorite(!favoriteCurrent);
      },
      title: 'favorite',
    },
    {
      icon: <StarsIcon color={activeCurrent ? 'secondary' : 'action'} />,
      click: () => {
        change(id, 'active', !activeCurrent);
        setActive(!activeCurrent);
      },
      title: 'active',
    },
    {
      icon: <RemoveCircleIcon color="error" />,
      click: complete,
      title: 'delete',
    },
  ];

  return (
    <div className="medium large">
      <MediumBanner id={id} variant="large" medium={data} buttons={buttons} />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
