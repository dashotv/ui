import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import RecommendIcon from '@mui/icons-material/Recommend';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import StarsIcon from '@mui/icons-material/Stars';

import { ButtonMapButton } from 'components/Common';
import { useDownloadCreateMutation } from 'components/Downloads';
import { Details, Episodes, Paths, RoutingTabs, RoutingTabsRoute, Seasons, Watches } from 'components/Tabs';

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
  series: { kind, active, broken, favorite, seasons, paths },
  episodes,
  currentSeason,
  changeSeason,
  changeEpisode,
  refresh,
  change,
}: SeriesProps) {
  const navigate = useNavigate();
  const download = useDownloadCreateMutation();
  const tabsMap: RoutingTabsRoute[] = [
    {
      label: 'Episodes',
      to: '',
      element: (
        <>
          <Seasons current={currentSeason} seasons={seasons} changeSeason={changeSeason} />
          <Episodes kind={kind} episodes={episodes} changeEpisode={changeEpisode} />
        </>
      ),
    },
    {
      label: 'Paths',
      to: `paths`,
      element: <Paths paths={paths} />,
    },
    {
      label: 'Details',
      to: `details`,
      element: <Details medium={series} />,
    },
    {
      label: 'Downloads',
      to: `downloads`,
      element: <div>downloads</div>,
    },
    {
      label: 'Watches',
      to: `watches`,
      element: <Watches medium_id={id} />,
    },
  ];

  const complete = useCallback(ev => {
    console.log('clicked complete');
    ev.preventDefault(); // for the buttons inside the Link component
  }, []);

  const buttons: ButtonMapButton[] = [
    {
      Icon: CloudCircleIcon,
      color: 'primary',
      click: () => {
        download.mutate(id, {
          onSuccess: data => {
            if (data.error) {
              console.error('error: ', data.error);
              return;
            }
            navigate(`/downloads/${data.id}`);
          },
        });
      },
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
      <RoutingTabs data={tabsMap} route={`/series/${id}`} />
    </div>
  );
}
