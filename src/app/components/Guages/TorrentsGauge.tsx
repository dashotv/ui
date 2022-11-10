import * as React from 'react';
import WaterIcon from '@mui/icons-material/Water';

export function TorrentsGauge(props) {
  return (
    <div className="torrents">
      <WaterIcon />
      {props.down}
    </div>
  );
}
