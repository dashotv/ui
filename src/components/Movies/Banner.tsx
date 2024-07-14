import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Movie } from 'client/tower';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import RestorePageIcon from '@mui/icons-material/RestorePage';

import { ButtonMapButton } from '@dashotv/components';

import { Confirm, MenuMapItem } from 'components/Common';
import { useDownloadCreateMutation } from 'components/Downloads';
import { MediumBanner } from 'components/Media';
import { postMovieJob, putMovieRefresh, useMovieDeleteMutation, useMovieSettingMutation } from 'components/Movies';

export type MovieBannerProps = {
  id: string;
  movie: Movie;
};
export const MovieBanner = ({ id, movie }: MovieBannerProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const movieSetting = useMovieSettingMutation(id);
  const navigate = useNavigate();
  const download = useDownloadCreateMutation();
  const movieDelete = useMovieDeleteMutation();

  const { downloaded, completed, broken } = movie || {};

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

  const buttons: ButtonMapButton[] = [
    {
      Icon: CloudCircleIcon,
      color: 'primary',
      click: () => {
        download.mutate(
          { medium_id: id },
          {
            onSuccess: data => {
              navigate(`/downloads/${data.id}`);
            },
          },
        );
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
      <MediumBanner id={id} variant="large" medium={movie} buttons={buttons} menu={menu} />
      <Confirm {...{ open, setOpen, message, ok: deleteConfirm }} />
    </>
  );
};
