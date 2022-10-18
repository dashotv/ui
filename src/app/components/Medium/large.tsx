import * as React from 'react';
import { useState } from 'react';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Moment from 'react-moment';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BuildIcon from '@mui/icons-material/Build';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { TabPanel } from '../TabPanel';

import './large.scss';

export function MediumLarge(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="medium large">
      <div className="main">
        <div className="menu">
          <ImageSmall class="cover-sm" alt="cover" src={props.data.cover} />
          <ImageSmall
            class="background-sm"
            alt="background"
            src={props.data.background}
          />
        </div>
        <div className="titlebar">
          <div className="title">
            <span>{props.data.title}</span>
          </div>
          <Buttons
            id={props.data.id}
            favorite={props.data.favorite}
            broken={props.data.broken}
            active={props.data.active}
            changeSeries={props.changeSeries}
          />
        </div>
        <Box maxWidth="xl">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Episodes" id="simple-tabs-0" />
              <Tab label="Details" id="simple-tabs-1" />
              <Tab label="Files" id="simple-tabs-2" />
              <Tab label="Downloads" id="simple-tabs-3" />
            </Tabs>
          </Box>
        </Box>
        <TabPanel index={0} value={value}>
          <Seasons seasons={props.seasons} changeSeason={props.changeSeason} />
          <Episodes
            episodes={props.episodes}
            changeEpisode={props.changeEpisode}
          />
        </TabPanel>
        <TabPanel index={1} value={value}>
          <Details data={props.data} />
        </TabPanel>
      </div>
    </div>
  );
}

function Buttons(props) {
  const [active, setActive] = useState(props.active);
  const [favorite, setFavorite] = useState(props.favorite);
  const [broken, setBroken] = useState(props.broken);
  return (
    <div className="buttons">
      <ButtonGroup>
        <IconButton size="small">
          <CloudDownloadIcon />
        </IconButton>
        <IconButton size="small">
          <VisibilityOffIcon />
        </IconButton>
        <IconButton size="small">
          <ReplayIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={ev => {
            props.changeSeries(props.id, 'favorite', !favorite);
            setFavorite(!favorite);
          }}
        >
          <FavoriteIcon color={favorite ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton
          size="small"
          onClick={ev => {
            props.changeSeries(props.id, 'broken', !broken);
            setBroken(!broken);
          }}
        >
          <BuildIcon color={broken ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton
          size="small"
          onClick={ev => {
            props.changeSeries(props.id, 'active', !active);
            setActive(!active);
          }}
        >
          <StarIcon color={active ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton size="small" color="error">
          <DeleteIcon />
        </IconButton>
      </ButtonGroup>
    </div>
  );
}

function Seasons(props) {
  const [season, setSeason] = React.useState(1);
  function clickSeason(ev) {
    const id = ev.currentTarget.id;
    console.log(`clickSeason: ${id}`);
    setSeason(id);
    props.changeSeason(id);
  }
  return (
    <div className="seasons">
      <ButtonGroup>
        {props.seasons.map(s => (
          <Button
            variant={season === s ? 'contained' : 'outlined'}
            key={s}
            id={s}
            onClick={clickSeason}
          >
            {s}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}

function Episodes(props) {
  return (
    <div className="episodes">
      <table
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
          {props.episodes.map(row => (
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
        <Moment format="YYYY-MM-DD">{props.release_date}</Moment>
      </td>
      <td align="right">
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
          <ArrowDropDownCircleIcon
            color={downloaded ? 'secondary' : 'action'}
          />
        </IconButton>
        <IconButton
          size="small"
          onClick={ev => {
            props.changeEpisode(props.id, 'completed', !completed);
            setCompleted(!completed);
          }}
        >
          <CheckCircleIcon
            color={completed === true ? 'secondary' : 'action'}
          />
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

function Details(props) {
  return (
    <div className="details">
      <table aria-label="a dense table">
        <tbody>
          <tr>
            <th>Display</th>
            <td>{props.data.display}</td>
          </tr>
          <tr>
            <th>Search</th>
            <td>{props.data.search}</td>
          </tr>
          <tr>
            <th>Directory</th>
            <td>{props.data.directory}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{props.data.title}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{props.data.description}</td>
          </tr>
          <tr>
            <th>Release</th>
            <td>
              <Moment format="YYYY-MM-DD">{props.data.release_date}</Moment>
            </td>
          </tr>
          <tr>
            <th>Source</th>
            <td>
              {props.data.source} {props.data.source_id}
            </td>
          </tr>
          <tr>
            <th>Updated</th>
            <td>
              <Moment fromNow>{props.data.updated_at}</Moment>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ImageSmall(props) {
  function setDefaultSrc(ev) {
    ev.target.onerror = null;
    ev.target.src = '/blank.png';
  }
  return (
    <div className={props.class}>
      <img alt={props.alt} src={props.src} onError={setDefaultSrc} />
    </div>
  );
}
