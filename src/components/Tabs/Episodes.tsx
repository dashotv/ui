import { useState } from 'react';
import * as React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { ButtonMap } from 'components/ButtonMap';
import Chrono from 'components/Chrono';
import { Episode } from 'types/medium';

export default function Episodes({
  episodes,
  changeEpisode,
}: {
  episodes: Episode[];
  changeEpisode: (id: string, field: string, value: boolean) => void;
}) {
  return (
    <div className="episodes">
      <table
        className="vertical-table"
        // size="small"
        aria-label="a dense table"
      >
        <thead>
          <tr>
            <td className="number">#</td>
            <td>Title</td>
            <td className="date" align="right">
              Release
            </td>
            <td className="actions" align="right">
              Actions
            </td>
          </tr>
        </thead>
        <tbody>
          {episodes && episodes.map(row => <EpisodeRow key={row.id} episode={row} changeEpisode={changeEpisode} />)}
        </tbody>
      </table>
    </div>
  );
}

function EpisodeRow({
  episode: { id, title, watched, episode_number: number, release_date: release, ...episode },
  changeEpisode,
}: {
  episode: Episode;
  changeEpisode: (id: string, field: string, value: boolean) => void;
}) {
  const [skipped, setSkipped] = useState(episode.skipped);
  const [completed, setCompleted] = useState(episode.completed);
  const [downloaded, setDownloaded] = useState(episode.downloaded);

  const buttons = [
    {
      icon: <CloudCircleIcon color="primary" />,
      click: () => {},
      title: 'create download',
    },
    {
      icon: <NextPlanIcon color={skipped ? 'secondary' : 'action'} />,
      click: () => {
        changeEpisode(id, 'skipped', !skipped);
        setSkipped(!skipped);
      },
      title: 'refresh',
    },
    {
      icon: <DownloadForOfflineIcon color={downloaded ? 'secondary' : 'action'} />,
      click: () => {
        changeEpisode(id, 'downloaded', !downloaded);
        setDownloaded(!downloaded);
      },
      title: 'broken',
    },
    {
      icon: <CheckCircleIcon color={completed ? 'secondary' : 'action'} />,
      click: () => {
        changeEpisode(id, 'completed', !completed);
        setCompleted(!completed);
      },
      title: 'favorite',
    },
    {
      icon: <VisibilityIcon color={watched ? 'secondary' : 'action'} />,
      click: () => {
        console.log("can't change watched yet");
      },
      title: 'active',
    },
  ];

  return (
    <tr>
      <th scope="row">{number}</th>
      <td>{title}</td>
      <td align="right">
        <Chrono format="YYYY-MM-DD">{release?.toString()}</Chrono>
      </td>
      <td align="right">
        <ButtonMap buttons={buttons} />
      </td>
    </tr>
  );
}
