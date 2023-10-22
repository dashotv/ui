import * as React from 'react';
import { Link } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import Chip from '@mui/material/Chip';

import Chrono from 'components/Chrono';

import './small.scss';

export default function MediumSmall(props) {
  return (
    <div className="medium small">
      <Link to={`/${props.type}/${props.id}`}>
        <Hover text={props.description} />
        <Cover image={props.background} />
        <Header text={props.release} />
        <Icons
          active={props.active}
          download={props.download}
          downloadIcon={props.downloadIcon}
          unwatched={props.unwatched}
          completed={props.completed}
        />
        <Bar progress={props.progress} eta={props.eta} queue={props.queue} />
        <Footer primary={props.primary} secondary={props.secondary} />
      </Link>
    </div>
  );
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
  /* had to add day to deal with UTC time, not sure why tz prop doesn't work */
  return (
    <div className="header">
      <div className="primary">
        <Chrono special>{props.text}</Chrono>
      </div>
    </div>
  );
}

function Queue(props) {
  if (props.queue) {
    return <Chip label={props.queue} size="small" variant="filled" />;
  }
  return null;
}

function Icons(props) {
  return (
    <div className="icons">
      <Unwatched count={props.unwatched} />
      {props.active && <StarIcon fontSize="small" />}
      {props.download && props.downloadIcon}
      {props.completed && <CheckCircleIcon fontSize="small" />}
    </div>
  );
}

function Unwatched(props) {
  if (props.count === undefined || props.count === 0) {
    return <></>;
  }
  return <Chip label={props.count > 9 ? '9+' : props.count} variant="filled" size="small" />;
}

function BackImage(props) {
  return <div className={props.class} style={{ backgroundImage: `url(${props.image})` }}></div>;
}

function Cover(props) {
  return <BackImage class="cover" image={props.image} />;
}

function Hover(props) {
  return (
    <div className="hover">
      <div className="text">{props.text}</div>
    </div>
  );
}

export function Bar(props) {
  if (props.progress > 0) {
    return (
      <div className="bar-container">
        <div className="eta">
          <Queue queue={props.queue} />
          <Chrono fromNow>{props.eta}</Chrono>
        </div>
        <div className="bar" style={{ width: props.progress + '%' }} />
        <div className="bar-background" />
      </div>
    );
  }
  return null;
}
