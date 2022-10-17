import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import styled from 'styled-components/macro';
import { MediumSmall } from '../Medium';

export default function Media(props) {
  return (
    <div>
      {props.data.map(
        ({
          id,
          series_id,
          title,
          display,
          description,
          cover,
          release_date,
          active,
        }) => (
          <MediumSmall
            key={id}
            id={series_id || id}
            background={cover}
            primary={title}
            secondary={display}
            release={release_date}
            active={active}
            description={description}
          />
        ),
      )}
    </div>
  );
}
