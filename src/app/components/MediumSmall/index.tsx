import * as React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone'; // for tz prop on react-moment
import StarIcon from '@mui/icons-material/Star';
import './small.scss';
import Chip from '@mui/material/Chip';

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
        />
        <Bar progress={props.progress} />
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
  const calendarStrings = {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[last] dddd',
    nextWeek: 'dddd',
    sameElse: 'YYYY-MM-DD',
  };

  /* had to add day to deal with UTC time, not sure why tz prop doesn't work */
  return (
    <div className="header">
      <div className="primary">
        <Moment calendar={calendarStrings} add={{ days: 1 }}>
          {props.text}
        </Moment>
      </div>
    </div>
  );
}

function Icons(props) {
  return (
    <div className="icons">
      <Unwatched count={props.unwatched} />
      {props.active && <StarIcon />}
      {props.download && props.downloadIcon}
    </div>
  );
}

function Unwatched(props) {
  if (props.count === undefined || props.count === 0) {
    return <></>;
  }
  return (
    <Chip
      label={props.count > 9 ? '9+' : props.count}
      variant="filled"
      size="small"
    />
  );
}

function BackImage(props) {
  return (
    <div
      className={props.class}
      style={{ backgroundImage: `url(${props.image})` }}
    ></div>
  );
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

function Bar(props) {
  return (
    <div className="bar-container">
      <div className="bar" style={{ width: props.progress + '%' }} />
      <div className="bar-background" />
    </div>
  );
}
