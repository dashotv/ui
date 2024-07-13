import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Series } from 'client/tower';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import RecommendIcon from '@mui/icons-material/Recommend';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import StarsIcon from '@mui/icons-material/Stars';

import { ButtonMapButton } from '@dashotv/components';

import { Confirm, MenuMapItem } from 'components/Common';
import { useDownloadCreateMutation } from 'components/Downloads';
import { MediumBanner } from 'components/Media';
import { postSeriesJob, useSeriesDeleteMutation, useSeriesSettingMutation } from 'components/Series';

export const SeriesBanner = ({ id, series }: { id: string; series: Series }) => {
  const { active, broken, favorite } = series || {};
  const seriesSetting = useSeriesSettingMutation(id);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const download = useDownloadCreateMutation();
  const seriesDelete = useSeriesDeleteMutation();

  const queue = (name: string) => {
    if (!name) {
      return;
    }
    postSeriesJob(id, name);
  };

  function change(id: string, key: string, value) {
    seriesSetting.mutate({ name: key, value: value });
  }

  const deleteSeries = useCallback(() => {
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

  const buttons: ButtonMapButton[] = [
    {
      Icon: CloudCircleIcon,
      color: 'primary',
      click: () => {
        download.mutate(
          { medium_id: id, multi: true },
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
      <MediumBanner id={id} variant="large" medium={series} buttons={buttons} menu={menu} />
      <Confirm {...{ open, setOpen, message, ok: deleteConfirm }} />
    </>
  );
};
