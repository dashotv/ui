import * as React from 'react';
import FeedIcon from '@mui/icons-material/Feed';

export function NzbsGauge(props) {
  return (
    <div>
      <FeedIcon />
      {props.down}
    </div>
  );
}
