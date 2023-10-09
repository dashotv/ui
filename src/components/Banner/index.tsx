import * as React from 'react';
import Moment from 'react-moment';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import ButtonMap from 'components/ButtonMap';

import './banner.scss';

export default function Banner(props) {
  function Unwatched(props) {
    if (props.count === undefined || props.count === 0) {
      return <></>;
    }
    return <Chip label={props.count > 9 ? '9+' : props.count} variant="filled" size="small" />;
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

  const actions = () => {
    // TODO: show these on hover
    // if (props.downloadIcon !== undefined) {
    //   return <ButtonMap size="small" buttons={props.buttons} />;
    // }
    return (
      <Icons
        active={props.active}
        download={props.download}
        downloadIcon={props.downloadIcon}
        unwatched={props.unwatched}
        completed={props.completed}
      />
    );
  };

  return (
    <div className="banner-container">
      <div className="banner">
        <div className="titlebar">
          <div className="title">
            <span>{props.title}</span>
            {!props.tertiary && (
              <Moment format="YYYY-MM-DD" add={{ days: 1 }}>
                {props.release_date}
              </Moment>
            )}
          </div>
          {props.subtitle && (
            <div className="subtitle">
              <span>{props.subtitle}</span>
            </div>
          )}
          <div className="download">
            <Stack spacing={1} direction="row">
              {props.tertiary}
              {props.downloadIcon}
              {props.queue > 0 && <Chip label={props.queue} size="small" />}
              {props.progress > 0 && <span>{props.progress}%</span>}
              {props.eta && <Moment fromNow>{props.eta}</Moment>}
            </Stack>
          </div>
          <div className="buttons">{actions()}</div>
        </div>
      </div>
      <div className="banner-dimmer"></div>
      <div className="banner-background">
        <img alt="background" src={props.background} />
      </div>
    </div>
  );
}
