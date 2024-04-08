import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Episode, Series as SeriesType } from 'client/tower';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import RecommendIcon from '@mui/icons-material/Recommend';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import StarsIcon from '@mui/icons-material/Stars';

import { ButtonMapButton } from 'components/Common';
import { Confirm } from 'components/Common/Confirm';
import { useDownloadCreateMutation } from 'components/Downloads';
import { Details, Downloads, Episodes, Paths, RoutingTabs, RoutingTabsRoute, Seasons, Watches } from 'components/Tabs';

import { MediumBanner, useSeriesDeleteMutation } from '.';
import './Media.scss';

export type SeriesProps = {
  id: string;
  series: SeriesType;
  currentSeason: number;
  episodes: Episode[];
  changeSeason: (season: number) => void;
  changeEpisode: (id: string, key: string, value) => void;
  change: (id: string, key: string, value) => void;
  queue: (name: string) => void;
};
export function Series({
  id,
  series,
  series: { kind, active, broken, favorite, seasons, paths },
  episodes,
  currentSeason,
  changeSeason,
  changeEpisode,
  queue,
  change,
}: SeriesProps) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();
  const download = useDownloadCreateMutation();
  const seriesDelete = useSeriesDeleteMutation();
  const tabsMap: RoutingTabsRoute[] = [
    {
      label: 'Episodes',
      to: '',
      element: (
        <>
          {seasons ? <Seasons current={currentSeason} seasons={seasons} changeSeason={changeSeason} /> : null}
          {kind && episodes ? <Episodes kind={kind} episodes={episodes} changeEpisode={changeEpisode} /> : null}
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
      element: <Downloads medium_id={id} />,
    },
    {
      label: 'Watches',
      to: `watches`,
      element: <Watches medium_id={id} />,
    },
  ];

  const deleteSeries = useCallback(ev => {
    ev.preventDefault(); // for the buttons inside the Link component
    setMessage('Are you sure you want to delete this series?');
    setOpen(true);
  }, []);

  const deleteConfirm = useCallback(() => {
    seriesDelete.mutate(id, {
      onSuccess: () => {
        navigate('/series');
      },
    });
  }, [navigate]);

  const buttons: ButtonMapButton[] = [
    {
      Icon: CloudCircleIcon,
      color: 'primary',
      click: () => {
        download.mutate(id, {
          onSuccess: data => {
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
        queue('refresh');
      },
      title: 'refresh',
    },
    {
      Icon: RepeatOnIcon,
      color: 'warning',
      click: () => {
        queue('files');
      },
      title: 'files',
    },
    {
      Icon: RestorePageIcon,
      color: 'warning',
      click: () => {
        queue('paths');
      },
      title: 'paths',
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
      click: deleteSeries,
      title: 'delete',
    },
  ];

  return (
    <div className="medium large">
      <MediumBanner id={id} variant="large" medium={series} buttons={buttons} />
      <RoutingTabs data={tabsMap} route={`/series/${id}`} />
      <Confirm {...{ open, setOpen, message, ok: deleteConfirm }} />
    </div>
  );
}
