import * as React from 'react';
import ImageSmall from '../MediumLarge/ImageSmall';
import Moment from 'react-moment';
import Buttons from '../MediumLarge/Buttons';
import './banner.scss';

export function Banner(props) {
  return (
    <div className="banner">
      <div className="titlebar">
        <div className="title">
          <span>{props.title}</span>
          <Moment format="YYYY-MM-DD" add={{ days: 1 }}>
            {props.release_date}
          </Moment>
        </div>
        <Buttons
          id={props.id}
          favorite={props.favorite}
          broken={props.broken}
          active={props.active}
          change={props.change}
        />
      </div>
    </div>
  );
}
