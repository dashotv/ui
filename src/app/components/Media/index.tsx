import * as React from 'react';
import { Link } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function Media(props) {
  function setDefaultSrc(ev) {
    ev.target.src = '/blank.png';
  }
  return (
    <ImageList cols={5}>
      {props.loading && <div>loading...</div>}
      {props.error && (
        <div>{`There is a problem fetching the post data - ${props.error}`}</div>
      )}
      {props.data.map(({ id, title, series_id, display, cover }) => (
        <Link key={id} to={`/media/series/${series_id}`}>
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
              sx={{ display: { xs: 'none', md: 'flex' } }}
            />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
}
