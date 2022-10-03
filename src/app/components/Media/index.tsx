import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import styled from 'styled-components/macro';
import './styles.css';

export default function Media(props) {
  return (
    <div>
      {props.data.map(
        ({ id, title, series_id, display, cover, release_date }) => (
          <Medium key={id} id={series_id || id} title={title} display={display}>
            <Background image={cover} />
            <Header text={release_date} />
            <Footer primary={title} secondary={display} />
          </Medium>
        ),
      )}
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
      pad(inc.getDate()),
    ].join('-');
    setDate(d);
  }, []);
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

function Medium(props) {
  return (
    <div className="medium">
      <Link to={`/media/series/${props.id}`}>{props.children}</Link>
    </div>
  );
}
// const Wrapper = styled.div`
//   height: 295px;
//   width: 200px;
//   margin: 0.5rem;
//   float: left;
// `;

/*
        <ImageList cols={5}>
          {props.data.map(({id, title, series_id, display, cover}) => (
              <Link key={id} to={`/media/series/${series_id || id}`}>
                <ImageListItem>
                  <img
                      src={`${cover}?w=135&h=200`}
                      alt="cover"
                      loading="lazy"
                      onError={setDefaultSrc}
                  />
                  <ImageListItemBar
                      title={title}
                      subtitle={display}
                      sx={{display: {xs: 'none', md: 'flex'}}}
                  />
                </ImageListItem>
              </Link>
          ))}
        </ImageList>
        */
