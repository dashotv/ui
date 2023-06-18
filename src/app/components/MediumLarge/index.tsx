import { useCallback, useState } from 'react';
import * as React from 'react';

import BuildIcon from '@mui/icons-material/Build';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReplayIcon from '@mui/icons-material/Replay';
import StarIcon from '@mui/icons-material/Star';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Banner from '../Banner';
import Details from './Details';
import Episodes from './Episodes';
import { MediumTabs } from './MediumTabs';
import Paths from './Paths';
import Seasons from './Seasons';
import Watches from './Watches';
import './large.scss';

export default function MediumLarge(props) {
  const [active, setActive] = useState(props.data.active);
  const [favorite, setFavorite] = useState(props.data.favorite);
  const [broken, setBroken] = useState(props.data.broken);

  const tabsMap = {
    Episodes: (
      <>
        <Seasons current={props.currentSeason} seasons={props.seasons} changeSeason={props.changeSeason} />
        <Episodes episodes={props.episodes} changeEpisode={props.changeEpisode} />
      </>
    ),
    Paths: <Paths paths={props.paths} />,
    Downloads: <div>downloads</div>,
    Watches: <Watches data={props.watches} />,
    Details: <Details data={props.data} cover={props.data.cover} background={props.data.background} />,
  };

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
    {
      icon: <FavoriteIcon color={favorite ? 'secondary' : 'action'} />,
      click: ev => {
        props.change(props.id, 'favorite', !favorite);
        setFavorite(!favorite);
      },
      title: 'toggle favorite',
    },
    {
      icon: <BuildIcon color={broken ? 'secondary' : 'action'} />,
      click: ev => {
        props.change(props.id, 'broken', !broken);
        setBroken(!broken);
      },
      title: 'toggle broken',
    },
    {
      icon: <StarIcon color={active ? 'secondary' : 'action'} />,
      click: ev => {
        props.change(props.id, 'active', !active);
        setActive(!active);
      },
      title: 'toggle active',
    },
    {
      icon: <DeleteIcon color="error" />,
      click: complete,
      title: 'delete',
    },
  ];

  return (
    <div className="medium large">
      <Banner
        title={props.data.title}
        release_date={props.data.release_date}
        id={props.data.id}
        change={props.change}
        background={props.data.background}
        buttons={buttons}
      />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
