import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Moment from 'react-moment';

import { Button, IconButton, ButtonGroup } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

import { Medium } from '../../../types/medium';

import './styles.css';
import axios from 'axios';

const tags = [
  {
    name: 'Release',
    value: '2022-10-11',
  },
  {
    name: 'Source',
    value: 'TVDB',
  },
  {
    name: 'Source ID',
    value: '1238435',
  },
];

export function MediumSmall(props) {
  return (
    <div className="medium small">
      <Link to={`/media/series/${props.id}`}>
        <Cover image={props.background} />
        <Header text={props.release} />
        <Footer primary={props.primary} secondary={props.secondary} />
      </Link>
    </div>
  );
}

interface MediumLargeProps {
  data?: Medium;
}

export function MediumLarge(props) {
  function clickSeason(ev) {
    const id = ev.currentTarget.id;
    console.log(`clickSeason: ${id}`);
    props.changeSeason(id);
  }

  return (
    <div className="medium large">
      {/*<Background image={props.data.background} />*/}
      {/*<div className="overlay" />*/}
      <div className="menu">
        {/*<Cover image={props.data.cover} />*/}
        <div className="cover-sm">
          <img alt="cover" src={props.data.cover} />
        </div>
        <div className="background-sm">
          <img alt="background" src={props.data.background} />
        </div>
      </div>
      <div className="main">
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
        <div className="seasons">
          <ButtonGroup>
            {props.seasons.map(s => (
              <Button key={s} id={s} onClick={clickSeason}>
                {s}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <div className="episodes">
          <TableContainer component="div">
            <Table
              sx={{ minWidth: 650, width: '100%' }}
              // size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Ep</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Release</TableCell>
                  <TableCell>Actions</TableCell>
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
                          color={props.data.skipped ? 'primary' : 'action'}
                        />
                      </IconButton>
                      <IconButton size="small">
                        <ArrowDropDownCircleIcon
                          color={props.data.downloaded ? 'primary' : 'action'}
                        />
                      </IconButton>
                      <IconButton size="small">
                        <CheckCircleIcon
                          color={
                            props.data.completed === true ? 'primary' : 'action'
                          }
                        />
                      </IconButton>
                      <IconButton size="small">
                        <VisibilityIcon
                          color={props.data.watched ? 'warning' : 'action'}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
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
  return (
    <div className="header">
      <div className="primary">
        <Moment format="MM/DD">{props.text}</Moment>
      </div>
    </div>
  );
}

function BackImage(props) {
  function setDefaultSrc(ev) {
    ev.target.src = '/blank.png';
  }
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
