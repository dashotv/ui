import { useCallback } from 'react';
import * as React from 'react';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import RecommendIcon from '@mui/icons-material/Recommend';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import StarsIcon from '@mui/icons-material/Stars';

import { ButtonMapButton } from 'components/Common';
import { Details, Episodes, MediumTabs, Paths, Seasons, Watches } from 'components/Tabs';

import { Episode, MediumBanner, SeriesType } from '.';
import './Media.scss';

export type SeriesProps = {
  id: string;
  series: SeriesType;
  currentSeason: number;
  episodes: Episode[];
  changeSeason: (season: number) => void;
  changeEpisode: (id: string, key: string, value) => void;
  change: (id: string, key: string, value) => void;
  refresh: () => void;
};
export function Series({
  id,
  series,
  series: { active, broken, favorite, seasons, watches, paths },
  episodes,
  currentSeason,
  changeSeason,
  changeEpisode,
  refresh,
  change,
}: SeriesProps) {
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
    Details: <Details medium={series} />,
  };

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
      Icon: RecommendIcon,
      color: favorite ? 'secondary' : 'action',
      click: () => {
        change(id, 'favorite', !favorite);
      },
      title: 'favorite',
    },
    {
      Icon: StarsIcon,
      color: active ? 'secondary' : 'action',
      click: () => {
        change(id, 'active', !active);
      },
      title: 'active',
    },
    {
      Icon: RemoveCircleIcon,
      color: 'error',
      click: complete,
      title: 'delete',
    },
  ];

  return (
    <div className="medium large">
      <MediumBanner id={id} variant="large" medium={series} buttons={buttons} />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
