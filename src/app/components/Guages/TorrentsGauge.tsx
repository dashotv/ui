import * as React from 'react';
import WaterIcon from '@mui/icons-material/Water';
import Typography from '@mui/material/Typography';

export function TorrentsGauge(props) {
  return (
    <div className="torrents">
      <Typography variant="overline">
        <WaterIcon /> {props.down} KB/s
      </Typography>
    </div>
  );
}
