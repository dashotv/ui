import React from 'react';

import { SearchResult } from 'client/scry';

import Stack from '@mui/material/Stack';

import { MediaIcon } from './Icon';
import './Media.scss';

export const MediaCover = ({
  option,
  type,
  imageOnly = false,
}: {
  option: SearchResult;
  type?: string;
  imageOnly?: boolean;
}) => {
  return (
    <div className="mediaCover">
      {option.image && <MediaCoverImage image={option.image} />}
      {imageOnly || (
        <>
          <div className="title">{option.title}</div>
          <div className="description">{option.description}</div>
          <div className="release">
            <Stack direction="row" spacing={1}>
              <MediaIcon type={type || option.type} />
              <span>{option.date}</span>
            </Stack>
          </div>
        </>
      )}
    </div>
  );
};

export const MediaCoverImage = ({
  image,
  updated,
  background = false,
  selected = false,
}: {
  image?: string;
  updated?: number;
  background?: boolean;
  selected?: boolean;
}) => {
  if (!image || image === '') {
    return (
      <div className="mediaCover">
        <div className="image">
          <img src="/blank.png" />
        </div>
      </div>
    );
  }
  return (
    <div className={`mediaCover${selected ? ' mediaCoverSelected' : ''}`}>
      <div className={`image${background ? ' image-background' : ''}`}>
        <object data={`${image}?updated=${updated}`}>
          <img src="/blank.png" />
        </object>
      </div>
    </div>
  );
};
