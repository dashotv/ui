import * as React from 'react';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BuildIcon from '@mui/icons-material/Build';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Moment from 'react-moment';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { TabPanel } from '../TabPanel';

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
            props.changeSeries(props.id, 'favorite', !props.active);
            props.favorite = !props.favorite;
          }}
        >
          <FavoriteIcon color={props.favorite ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton
          size="small"
          onClick={ev => {
            props.changeSeries(props.id, 'broken', !props.active);
            props.broken = !props.broken;
          }}
        >
          <BuildIcon color={props.broken ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton
          size="small"
          onClick={ev => {
            props.changeSeries(props.id, 'active', !props.active);
            props.active = !props.active;
          }}
        >
          <StarIcon color={props.active ? 'secondary' : 'action'} />
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
            variant={season == s ? 'contained' : 'outlined'}
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
      <TableContainer component="div">
        <Table
          sx={{ minWidth: 650 }}
          // size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Release</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.episodes.map(row => (
              <TableRow
                key={row.episode_number}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.episode_number}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell align="right">
                  <Moment format="YYYY-MM-DD">{row.release_date}</Moment>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small">
                    <CloudCircleIcon color="primary" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={ev => {
                      props.changeEpisode(row.id, 'skipped', !row.skipped);
                      row.skipped = !row.skipped;
                    }}
                  >
                    <NextPlanIcon
                      color={row.skipped ? 'secondary' : 'action'}
                    />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={ev => {
                      props.changeEpisode(
                        row.id,
                        'downloaded',
                        !row.downloaded,
                      );
                      row.downloaded = !row.downloaded;
                    }}
                  >
                    <ArrowDropDownCircleIcon
                      color={row.downloaded ? 'secondary' : 'action'}
                    />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={ev => {
                      props.changeEpisode(row.id, 'completed', !row.completed);
                      row.completed = !row.completed;
                    }}
                  >
                    <CheckCircleIcon
                      color={row.completed === true ? 'secondary' : 'action'}
                    />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={ev => {
                      props.changeEpisode(row.id, 'watched', !row.watched);
                      row.watched = !row.watched;
                    }}
                  >
                    <VisibilityIcon
                      color={row.watched ? 'secondary' : 'action'}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function Details(props) {
  return (
    <div className="details">
      <TableContainer component="div">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableBody>
            <TableRow>
              <TableCell>Display</TableCell>
              <TableCell>{props.data.display}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Search</TableCell>
              <TableCell>{props.data.search}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Directory</TableCell>
              <TableCell>{props.data.directory}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>{props.data.title}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>{props.data.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Release</TableCell>
              <TableCell>
                <Moment format="YYYY-MM-DD">{props.data.release_date}</Moment>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Source</TableCell>
              <TableCell>
                {props.data.source} {props.data.source_id}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Updated</TableCell>
              <TableCell>
                <Moment fromNow>{props.data.updated_at}</Moment>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
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
