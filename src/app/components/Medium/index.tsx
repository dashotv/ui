import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './styles.css';

export function MediumSmall(props) {
  return (
    <div className="medium">
      <Link to={`/media/series/${props.id}`}>
        <Background image={props.background} />
        <Header text={props.release} />
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
  return (
    <div className="header">
      <div className="primary">
        <Moment format="MM/DD">{props.text}</Moment>
      </div>
    </div>
  );
}

function Background(props) {
  function setDefaultSrc(ev) {
    ev.target.src = '/blank.png';
  }
  return (
    <div className="background">
      <img alt="cover" src={props.image} onError={setDefaultSrc} />
    </div>
  );
}
