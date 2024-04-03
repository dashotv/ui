import React from 'react';
import { useNavigate } from 'react-router-dom';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

import { ButtonMapButton } from 'components/Common';
import { useDownloadCreateMutation } from 'components/Downloads';
import { MediumBanner } from 'components/Media';

import { MovieType } from './types';

export type MovieBannerProps = {
  id: string;
  movie: MovieType;
  change: (id: string, key: string, value) => void;
  refresh: () => void;
};
export const MovieBanner = ({
  id,
  refresh,
  change,
  movie,
  movie: { broken, downloaded, completed },
}: MovieBannerProps) => {
  const navigate = useNavigate();
  const download = useDownloadCreateMutation();
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
    {
      Icon: RemoveCircleIcon,
      color: 'error',
      click: () => {},
      title: 'delete',
    },
  ];
  return <MediumBanner id={id} variant="large" medium={movie} buttons={buttons} />;
};
