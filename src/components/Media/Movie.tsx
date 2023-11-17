import { useCallback, useState } from 'react';
import * as React from 'react';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

import { MediumBanner } from 'components/Banner';
import Details from 'components/Tabs/Details';
import { MediumTabs } from 'components/Tabs/MediumTabs';
import Paths from 'components/Tabs/Paths';
import { Movie as MovieType } from 'types/medium';

import './Media.scss';

export type MovieProps = {
  id: string;
  movie: MovieType;
  change: (id: string, key: string, value) => void;
};
// TODO: watches
export default function Movie({
  id,
  movie,
  movie: {
    kind,
    cover,
    background,
    paths,
    broken,
    downloaded,
    completed,
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
  change,
}: MovieProps) {
  const [brokenCurrent, setBroken] = useState(broken);
  const [completedCurrent, setCompleted] = useState(completed);
  const [downloadedCurrent, setDownloaded] = useState(downloaded);
  // TODO: handle downloaded, completed

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
      click: complete,
      title: 'refresh',
    },
    {
      icon: <BuildCircleIcon color={brokenCurrent ? 'secondary' : 'action'} />,
      click: () => {
        change(id, 'broken', !brokenCurrent);
        setBroken(!brokenCurrent);
      },
      title: 'broken',
    },
    {
      icon: <DownloadForOfflineIcon color={downloadedCurrent ? 'secondary' : 'action'} />,
      click: () => {
        change(id, 'downloaded', !downloadedCurrent);
        setDownloaded(!downloadedCurrent);
      },
      title: 'downloaded',
    },
    {
      icon: <CheckCircleIcon color={completedCurrent ? 'secondary' : 'action'} />,
      click: () => {
        change(id, 'completed', !completedCurrent);
        setCompleted(!completedCurrent);
      },
      title: 'completed',
    },
    {
      icon: <RemoveCircleIcon color="error" />,
      click: complete,
      title: 'delete',
    },
  ];

  const tabsMap = {
    Paths: <Paths paths={paths} />,
    Downloads: <div>downloads</div>,
    Watches: <div>watches</div>,
    Details: (
      <Details
        {...{
          kind,
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

  return (
    <div className="medium large">
      <MediumBanner id={id} variant="large" medium={movie} buttons={buttons} />
      <MediumTabs data={tabsMap} />
    </div>
  );
}
