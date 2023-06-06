import * as React from 'react';
import FeedIcon from '@mui/icons-material/Feed';
import Typography from '@mui/material/Typography';

export function NzbsGauge(props) {
  return (
    <div>
      <Typography variant="overline">
        <FeedIcon />
        {props.down} KB/s
      </Typography>
    </div>
  );
}
