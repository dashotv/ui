import { useCallback } from 'react';
import * as React from 'react';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
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
import { Episode, Series as SeriesType } from 'types/medium';

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
  series: {
    cover,
    background,
    active,
    broken,
    favorite,
    seasons,
    watches,
    paths,
    display,
    search,
    directory,
    title,
    description,
    release_date,
    source,
    source_id,
    created_at,
    updated_at,
  },
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
    Details: (
      <Details
        {...{
          cover,
          background,
          display,
          search,
          directory,
          title,
          description,
          release_date,
          source,
          source_id,
          created_at,
          updated_at,
        }}
      />
    ),
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
      icon: <RecommendIcon color={favorite ? 'secondary' : 'action'} />,
      click: () => {
        change(id, 'favorite', !favorite);
      },
      title: 'favorite',
    },
    {
      icon: <StarsIcon color={active ? 'secondary' : 'action'} />,
      click: () => {
        change(id, 'active', !active);
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
      <MediumBanner id={id} variant="large" medium={series} buttons={buttons} />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
