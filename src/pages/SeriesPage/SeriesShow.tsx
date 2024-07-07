import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import RecommendIcon from '@mui/icons-material/Recommend';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import StarsIcon from '@mui/icons-material/Stars';

import { ButtonMapButton, Container, LoadingIndicator } from '@dashotv/components';
import { useQueryClient } from '@tanstack/react-query';

import { Confirm, MenuMapItem } from 'components/Common';
import { useDownloadCreateMutation } from 'components/Downloads';
import { MediumBanner } from 'components/Media';
import { postSeriesJob, useSeriesDeleteMutation, useSeriesQuery, useSeriesSettingMutation } from 'components/Series';
import { Details, Downloads, Episodes, Paths, RoutingTabs, RoutingTabsRoute, Watches } from 'components/Tabs';
import { useSub } from 'hooks/sub';
import { EventSeries } from 'types/events';

export default function SeriesShow() {
  const { id } = useParams();
  if (!id) {
    throw new Error('Series id is required');
  }
  const { isFetching, data: series } = useSeriesQuery(id);
  // const [currentSeason, setCurrentSeason] = useState(1);
  // const { isFetching: episodesFetching, data: episodes } = useSeriesSeasonEpisodesQuery(id, currentSeason.toString());
  const queryClient = useQueryClient();
  const seriesSetting = useSeriesSettingMutation(id);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();
  const download = useDownloadCreateMutation();
  const seriesDelete = useSeriesDeleteMutation();
  // const episodeSetting = useEpisodeSettingMutation();
  const { kind, active, broken, favorite, seasons, currentSeason, paths } = series?.result || {};

  const queue = (name: string) => {
    if (!id || !name) {
      return;
    }
    postSeriesJob(id, name);
  };

  // function changeEpisodeSetting(id, key, value) {
  //   episodeSetting.mutate({ id: id, setting: { name: key, value: value } });
  // }

  function change(id: string, key: string, value) {
    seriesSetting.mutate({ name: key, value: value });
  }

  const deleteSeries = useCallback(() => {
    // ev.preventDefault(); // for the buttons inside the Link component
    console.log('deleteSeries');
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

  useSub('tower.series', (data: EventSeries) => {
    if (data.id !== id) {
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['series', id] });
  });

  const tabsMap: RoutingTabsRoute[] = [
    {
      label: 'Episodes',
      to: '',
      element: (
        <>
          {kind && currentSeason && seasons ? (
            <Episodes kind={kind} series_id={id} season={currentSeason} seasons={seasons} />
          ) : null}
        </>
      ),
    },
    {
      label: 'Paths',
      to: `paths`,
      element: <Paths paths={paths} medium_id={id} />,
    },
    {
      label: 'Details',
      to: `details`,
      element: <>{series?.result && <Details medium={series?.result} />}</>,
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
  ];

  const menu: MenuMapItem[] = [
    {
      name: 'Paths',
      icon: <RestorePageIcon fontSize="small" color="warning" />,
      action: () => {
        queue('paths');
      },
    },
    {
      name: 'Rename',
      icon: <DriveFileMoveIcon fontSize="small" color="warning" />,
      action: () => {
        queue('rename');
      },
    },
    {
      name: 'Delete',
      icon: <RemoveCircleIcon fontSize="small" color="error" />,
      action: () => deleteSeries(),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Series{series?.result ? ` - ${series?.result?.title}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        {isFetching && <LoadingIndicator />}
        {series?.result?.id && (
          <div className="medium large">
            <MediumBanner id={id} variant="large" medium={series?.result} buttons={buttons} menu={menu} />
            <RoutingTabs data={tabsMap} route={`/series/${id}`} />
            <Confirm {...{ open, setOpen, message, ok: deleteConfirm }} />
          </div>
        )}
      </Container>
    </>
  );
}
