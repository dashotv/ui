import * as React from 'react';

import FolderIcon from '@mui/icons-material/Folder';
import Typography from '@mui/material/Typography';

export function DiskGauge(props) {
  return (
    <div>
      <Typography variant="overline">
        <FolderIcon />
        {props.free} GB
      </Typography>
    </div>
  );
}
