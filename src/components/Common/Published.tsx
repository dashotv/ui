import React from 'react';

import Typography from '@mui/material/Typography';

import { Chrono } from 'components/Common';

export const Published = ({ date }: { date: string }) => {
  return (
    <Typography variant="subtitle2" color="gray" pl="3px" noWrap>
      <Chrono fromNow>{date}</Chrono>
    </Typography>
  );
};
