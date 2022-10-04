import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as React from 'react';
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
  const [date, setDate] = useState<string | null>(null);
  function pad(num: number) {
    return num.toString().padStart(2, '0');
  }

  useEffect(() => {
    const inc = new Date(props.text);
    const d = [
      inc.getFullYear(),
      pad(inc.getMonth() + 1),
      pad(inc.getDate() + 1),
    ].join('-');
    setDate(d);
  }, [date]);

  return (
    <div className="header">
      <div className="primary">{date}</div>
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
