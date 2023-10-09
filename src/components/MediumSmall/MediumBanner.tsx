import { useCallback, useState } from 'react';
import * as React from 'react';
import Moment from 'react-moment';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import RecommendIcon from '@mui/icons-material/Recommend';
import StarsIcon from '@mui/icons-material/Stars';

import Banner from 'components/Banner';

function Release({ date }: { date: string }) {
  const calendarStrings = {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[last] dddd',
    nextWeek: 'dddd',
    sameElse: 'YYYY-MM-DD',
  };
  /* had to add day to deal with UTC time, not sure why tz prop doesn't work */
  return (
    <div className="header">
      <div className="primary">
        <Moment calendar={calendarStrings} add={{ days: 1 }}>
          {date}
        </Moment>
      </div>
    </div>
  );
}
type MediumBannerProps = {
  id: string;
  type?: string;
  change?: any;
  cover: string;
  background: string;
  title: string;
  display: string;
  release_date: string;
  description?: string;
  unwatched: number;
  completed?: boolean;
  favorite: boolean;
  broken: boolean;
  active: boolean;
};

export default function MediumBanner({
  id,
  type,
  change,
  cover,
  background,
  title,
  display,
  release_date,
  description,
  unwatched,
  completed,
  favorite,
  broken,
  active,
}: MediumBannerProps) {
  const [activeCurrent, setActive] = useState(active);
  const [favoriteCurrent, setFavorite] = useState(favorite);
  // const [brokenCurrent, setBroken] = useState(broken);

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
    // {
    //   icon: <VisibilityOffIcon color="primary" />,
    //   click: complete,
    //   title: 'history???',
    // },
    // {
    //   icon: <ReplayCircleFilledIcon color="primary" />,
    //   click: complete,
    //   title: 'refresh',
    // },
    {
      icon: <RecommendIcon color={favorite ? 'secondary' : 'action'} />,
      click: ev => {
        change(id, 'favorite', !favoriteCurrent);
        setFavorite(!favoriteCurrent);
      },
      title: 'favorite',
    },
    // {
    //   icon: <BuildCircleIcon color={broken ? 'secondary' : 'action'} />,
    //   click: ev => {
    //     change(id, 'broken', !brokenCurrent);
    //     setBroken(!brokenCurrent);
    //   },
    //   title: 'broken',
    // },
    {
      icon: <StarsIcon color={active ? 'secondary' : 'action'} />,
      click: ev => {
        change(id, 'active', !activeCurrent);
        setActive(!activeCurrent);
      },
      title: 'active',
    },
    // {
    //   icon: <RemoveCircleIcon color="error" />,
    //   click: complete,
    //   title: 'delete',
    // },
  ];
  return (
    <Banner
      id={id}
      cover={cover}
      background={background}
      title={title}
      subtitle={display}
      release_date={release_date}
      favorite={favorite}
      broken={broken}
      active={active}
      //   change={change}
      buttons={buttons}
      unwatched={unwatched}
      tertiary={<Release date={release_date} />}
    />
  );
}
