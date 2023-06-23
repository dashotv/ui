import * as React from 'react';
import Moment from 'react-moment';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import ButtonMap from 'components/ButtonMap';

import './banner.scss';

export default function Banner(props) {
  return (
    <div className="banner-container">
      <div className="banner">
        <div className="titlebar">
          <div className="title">
            <span>{props.title}</span>
            <Moment format="YYYY-MM-DD" add={{ days: 1 }}>
              {props.release_date}
            </Moment>
          </div>
          {props.subtitle && (
            <div className="subtitle">
              <span>{props.subtitle}</span>
            </div>
          )}
          <div className="download">
            <Stack spacing={1} direction="row">
              {props.downloadIcon}
              {props.queue > 0 && <Chip label={props.queue} size="small" />}
              {props.progress > 0 && <span>{props.progress}%</span>}
              {props.eta && <Moment fromNow>{props.eta}</Moment>}
            </Stack>
          </div>
          <div className="buttons">
            <ButtonMap size="small" buttons={props.buttons} />
          </div>
        </div>
      </div>
      <div className="banner-dimmer"></div>
      <div className="banner-background">
        <img alt="background" src={props.background} />
      </div>
    </div>
  );
}
