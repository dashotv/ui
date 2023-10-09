import { useCallback, useState } from 'react';
import * as React from 'react';
import Moment from 'react-moment';

import BuildIcon from '@mui/icons-material/Build';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplayIcon from '@mui/icons-material/Replay';
import StarIcon from '@mui/icons-material/Star';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Banner from 'components/Banner';

function Release({ date }) {
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

export default function MediumBanner({
  id,
  type,
  //   change,
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
}) {
  const complete = useCallback(ev => {
    console.log('clicked complete');
    ev.preventDefault(); // for the buttons inside the Link component
  }, []);

  const buttons = [
    {
      icon: <CloudDownloadIcon color="primary" />,
      click: complete,
      title: 'create download',
    },
    {
      icon: <VisibilityOffIcon color="primary" />,
      click: complete,
      title: 'history???',
    },
    {
      icon: <ReplayIcon color="primary" />,
      click: complete,
      title: 'refresh',
    },
    // {
    //   icon: <FavoriteIcon color={favorite ? 'secondary' : 'action'} />,
    //   click: ev => {
    //     props.change(props.id, 'favorite', !favorite);
    //     setFavorite(!favorite);
    //   },
    //   title: 'favorite',
    // },
    // {
    //   icon: <BuildIcon color={broken ? 'secondary' : 'action'} />,
    //   click: ev => {
    //     props.change(props.id, 'broken', !broken);
    //     setBroken(!broken);
    //   },
    //   title: 'broken',
    // },
    // {
    //   icon: <StarIcon color={active ? 'secondary' : 'action'} />,
    //   click: ev => {
    //     props.change(props.id, 'active', !active);
    //     setActive(!active);
    //   },
    //   title: 'active',
    // },
    {
      icon: <DeleteIcon color="error" />,
      click: complete,
      title: 'delete',
    },
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
      tertiary={<Release date={release_date} />}
    />
  );
}
