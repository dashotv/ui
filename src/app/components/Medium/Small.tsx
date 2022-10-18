import * as React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone'; // for tz prop on react-moment
import StarIcon from '@mui/icons-material/Star';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import './small.scss';

export function MediumSmall(props) {
  return (
    <div className="medium small">
      <Link to={`/media/series/${props.id}`}>
        <Hover text={props.description} />
        <Cover image={props.background} />
        <Header text={props.release} />
        <Icons active={props.active} download={props.download} />
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
    sameElse: 'L',
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
      {props.active && <StarIcon />}
      {props.download && <CloudCircleIcon />}
    </div>
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
