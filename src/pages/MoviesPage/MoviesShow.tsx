import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import RestorePageIcon from '@mui/icons-material/RestorePage';

import { ButtonMapButton, Container, LoadingIndicator, RoutingTabs, RoutingTabsRoute } from '@dashotv/components';
import { useQueryClient } from '@tanstack/react-query';

import { Confirm, MenuMapItem } from 'components/Common';
import { useDownloadCreateMutation } from 'components/Downloads';
import { MediumBanner } from 'components/Media';
import {
  postMovieJob,
  putMovieRefresh,
  useMovieDeleteMutation,
  useMovieQuery,
  useMovieSettingMutation,
} from 'components/Movies';
import { Details, Downloads, Paths, Watches } from 'components/Tabs';
import { useSub } from 'hooks/sub';
import { EventMovie } from 'types/events';

export default function MoviesShow() {
  const { id } = useParams();
  if (!id) {
    throw new Error('Series id is required');
  }
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const { isFetching, data: movie } = useMovieQuery(id);
  const queryClient = useQueryClient();
  const movieSetting = useMovieSettingMutation(id);
  const navigate = useNavigate();
  const download = useDownloadCreateMutation();
  const { downloaded, completed, broken, paths } = movie?.result || {};
  const movieDelete = useMovieDeleteMutation();

  const change = (id: string, setting, value) => {
    movieSetting.mutate({ name: setting, value: value });
  };

  const refresh = () => {
    if (!id) {
      return;
    }
    putMovieRefresh(id);
  };

  const queue = (name: string) => {
    if (!id || !name) {
      return;
    }
    postMovieJob(id, name);
  };

  const deleteMovie = useCallback(() => {
    // ev.preventDefault(); // for the buttons inside the Link component
    console.log('deleteMovie');
    setMessage('Are you sure you want to delete this movie?');
    setOpen(true);
  }, []);

  const deleteConfirm = useCallback(() => {
    movieDelete.mutate(id, {
      onSuccess: () => {
        navigate('/movies');
      },
    });
  }, [navigate]);

  useSub('tower.movies', (data: EventMovie) => {
    if (data.id !== id) {
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['movies', id] });
  });

  const tabsMap: RoutingTabsRoute[] = [
    {
      label: 'Paths',
      to: '',
      element: <Paths paths={paths} medium_id={id} />,
    },
    {
      label: 'Details',
      to: 'details',
      element: movie?.result ? <Details medium={movie?.result} /> : <div>details</div>,
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
      Icon: DownloadForOfflineIcon,
      color: downloaded ? 'secondary' : 'action',
      click: () => {
        change(id, 'downloaded', !downloaded);
      },
      title: 'downloaded',
    },
    {
      Icon: CheckCircleIcon,
      color: completed ? 'secondary' : 'action',
      click: () => {
        change(id, 'completed', !completed);
      },
      title: 'completed',
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
      name: 'Delete',
      icon: <RemoveCircleIcon fontSize="small" color="error" />,
      action: () => deleteMovie(),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Movie{movie ? ` - ${movie?.result.title}` : ''}</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container>
        {isFetching && <LoadingIndicator />}
        {movie?.result && (
          <div className="medium large">
            <MediumBanner id={id} variant="large" medium={movie?.result} buttons={buttons} menu={menu} />
            {/* <MovieBanner {...{ id, movie, refresh, change }} /> */}
            <RoutingTabs data={tabsMap} mount={`/movies/${id}`} />
            <Confirm {...{ open, setOpen, message, ok: deleteConfirm }} />
          </div>
        )}
      </Container>
    </>
  );
}
