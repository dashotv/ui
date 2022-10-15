import * as React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { Button, IconButton, ButtonGroup } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BuildIcon from '@mui/icons-material/Build';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Medium } from '../../../types/medium';

import './styles.css';

export function MediumSmall(props) {
  return (
    <div className="medium small">
      <Link to={`/media/series/${props.id}`}>
        <Cover image={props.background} />
        <Header text={props.release} />
        <Icons active={props.active} download={props.download} />
        <Footer primary={props.primary} secondary={props.secondary} />
      </Link>
    </div>
  );
}

export function MediumLarge(props) {
  const [value, setValue] = React.useState(0);
  const [season, setSeason] = React.useState(1);
  function clickSeason(ev) {
    const id = ev.currentTarget.id;
    console.log(`clickSeason: ${id}`);
    setSeason(id);
    props.changeSeason(id);
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="medium large">
      {/*<Background image={props.data.background} />*/}
      {/*<div className="overlay" />*/}
      {/*<div className="menu">*/}
      {/*  <ImageSmall class="cover-sm" alt="cover" src={props.data.cover} />*/}
      {/*  <ImageSmall*/}
      {/*    class="background-sm"*/}
      {/*    alt="background"*/}
      {/*    src={props.data.background}*/}
      {/*  />*/}
      {/*</div>*/}
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
              <IconButton size="small">
                <FavoriteIcon />
              </IconButton>
              <IconButton size="small">
                <BuildIcon />
              </IconButton>
              <IconButton size="small">
                <StarIcon />
              </IconButton>
              <IconButton size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </ButtonGroup>
          </div>
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
                        <IconButton size="small">
                          <NextPlanIcon
                            color={row.skipped ? 'secondary' : 'action'}
                          />
                        </IconButton>
                        <IconButton size="small">
                          <ArrowDropDownCircleIcon
                            color={row.downloaded ? 'secondary' : 'action'}
                          />
                        </IconButton>
                        <IconButton size="small">
                          <CheckCircleIcon
                            color={
                              row.completed === true ? 'secondary' : 'action'
                            }
                          />
                        </IconButton>
                        <IconButton size="small">
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
        </TabPanel>
        <TabPanel index={1} value={value}>
          <div className="details">
            <TableContainer component="div">
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
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
                      <Moment format="YYYY-MM-DD">
                        {props.data.release_date}
                      </Moment>
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
        </TabPanel>
      </div>
    </div>
  );
}

function Title(props) {
  return (
    <div className="title">
      <h4 className="primary">{props.text}</h4>
    </div>
  );
}

function Description(props) {
  return <div className="description">{props.children}</div>;
}

function Footer(props) {
  return (
    <div className="footer">
      <div className="primary">{props.primary}</div>
      <div className="secondary">{props.secondary}</div>
    </div>
  );
}

function Header(props) {
  const calendarStrings = {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[last] dddd',
    nextWeek: 'dddd',
    sameElse: 'L',
  };
  console.log('header text=' + props.text);
  return (
    <div className="header">
      <div className="primary">
        <Moment calendar={calendarStrings}>{props.text}</Moment>
      </div>
    </div>
  );
}

function Icons(props) {
  return (
    <div className="icons">
      {props.active && <StarIcon />}
      {props.download && <CloudCircleIcon />}
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

function BackImage(props) {
  const style = {
    'background-image': `url(${props.image})`,
  };
  return (
    <div
      className={props.class}
      style={{ backgroundImage: `url(${props.image})` }}
    >
      {/*<img alt={props.class} src={props.image} onError={setDefaultSrc} />*/}
    </div>
  );
}

function Background(props) {
  return <BackImage class="background" image={props.image} />;
}

function Cover(props) {
  return <BackImage class="cover" image={props.image} />;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }} component="div">
          {children}
        </Box>
      )}
    </div>
  );
}
