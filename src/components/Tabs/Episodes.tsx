import { useState } from 'react';
import * as React from 'react';

import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';

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
  episode: { id, title, episode_number: number, release_date: release, ...episode },
  changeEpisode,
}: {
  episode: Episode;
  changeEpisode: (id: string, field: string, value: boolean) => void;
}) {
  const [skipped, setSkipped] = useState(episode.skipped);
  const [watched, setWatched] = useState(episode.watched);
  const [completed, setCompleted] = useState(episode.completed);
  const [downloaded, setDownloaded] = useState(episode.downloaded);
  return (
    <tr>
      <th scope="row">{number}</th>
      <td>{title}</td>
      <td align="right">
        <Chrono format="YYYY-MM-DD">{release?.toString()}</Chrono>
      </td>
      <td style={{ width: '225px' }} align="right">
        <IconButton size="small">
          <CloudCircleIcon color="primary" />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            changeEpisode(id, 'skipped', !skipped);
            setSkipped(!skipped);
          }}
        >
          <NextPlanIcon color={skipped ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            changeEpisode(id, 'downloaded', !downloaded);
            setDownloaded(!downloaded);
          }}
        >
          <ArrowDropDownCircleIcon color={downloaded ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            changeEpisode(id, 'completed', !completed);
            setCompleted(!completed);
          }}
        >
          <CheckCircleIcon color={completed === true ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            changeEpisode(id, 'watched', !watched);
            setWatched(!watched);
          }}
        >
          <VisibilityIcon color={watched === true ? 'secondary' : 'action'} />
        </IconButton>
      </td>
    </tr>
  );
}
