import React from 'react';

import Stack from '@mui/material/Stack';

import { MediaIcon } from './Icon';
import './Media.scss';
import { Option } from './types';

export const MediaCover = ({
  option,
  type,
  imageOnly = false,
}: {
  option: Option;
  type?: string;
  imageOnly?: boolean;
}) => {
  return (
    <div className="mediaCover">
      {option.Image && <MediaCoverImage image={option.Image} />}
      {imageOnly || (
        <>
          <div className="title">{option.Title}</div>
          <div className="description">{option.Description}</div>
          <div className="release">
            <Stack direction="row" spacing={1}>
              <MediaIcon type={type || option.Type} />
              <span>{option.Date}</span>
            </Stack>
          </div>
        </>
      )}
    </div>
  );
};

export const MediaCoverImage = ({
  image,
  background = false,
  selected = false,
}: {
  image?: string;
  background?: boolean;
  selected?: boolean;
}) => {
  return (
    <div className="mediaCover">
      <div className={`image${background ? ' image-background' : ''}`}>
        <object data={image}>
          <img src="/blank.png" />
        </object>
      </div>
      {selected ? <div className="title">current</div> : null}
    </div>
  );
};
