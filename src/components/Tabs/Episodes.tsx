import { useState } from 'react';
import * as React from 'react';

import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import Chrono from 'components/Date';

export default function Episodes(props) {
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
          {props.episodes &&
            props.episodes.map(row => (
              <EpisodeRow
                key={row.id}
                id={row.id}
                number={row.episode_number}
                title={row.title}
                release={row.release_date}
                skipped={row.skipped}
                downloaded={row.downloaded}
                completed={row.completed}
                watched={row.watched}
                changeEpisode={props.changeEpisode}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

function EpisodeRow(props) {
  const [skipped, setSkipped] = useState(props.skipped);
  const [watched, setWatched] = useState(props.watched);
  const [completed, setCompleted] = useState(props.completed);
  const [downloaded, setDownloaded] = useState(props.downloaded);
  return (
    <tr>
      <th scope="row">{props.number}</th>
      <td>{props.title}</td>
      <td align="right">
        <Chrono format="YYYY-MM-DD">
          {props.release}
        </Chrono>
      </td>
      <td style={{ width: '225px' }} align="right">
        <IconButton size="small">
          <CloudCircleIcon color="primary" />
        </IconButton>
        <IconButton
          size="small"
          onClick={ev => {
            props.changeEpisode(props.id, 'skipped', !skipped);
            setSkipped(!skipped);
          }}
        >
          <NextPlanIcon color={skipped ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton
          size="small"
          onClick={ev => {
            props.changeEpisode(props.id, 'downloaded', !downloaded);
            setDownloaded(!downloaded);
          }}
        >
          <ArrowDropDownCircleIcon color={downloaded ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton
          size="small"
          onClick={ev => {
            props.changeEpisode(props.id, 'completed', !completed);
            setCompleted(!completed);
          }}
        >
          <CheckCircleIcon color={completed === true ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton
          size="small"
          onClick={ev => {
            props.changeEpisode(props.id, 'watched', !watched);
            setWatched(!watched);
          }}
        >
          <VisibilityIcon color={watched === true ? 'secondary' : 'action'} />
        </IconButton>
      </td>
    </tr>
  );
}
