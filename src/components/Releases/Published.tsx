import React from 'react';

import Typography from '@mui/material/Typography';

import Chrono from 'components/Chrono';

export const Published = ({ date }: { date: string }) => {
  return (
    <Typography variant="subtitle2" color="gray" pl="3px">
      <Chrono fromNow>{date}</Chrono>
    </Typography>
  );
};
