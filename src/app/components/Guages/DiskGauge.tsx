import * as React from 'react';
import FolderIcon from '@mui/icons-material/Folder';

export function DiskGauge(props) {
  return (
    <div>
      <FolderIcon /> {props.free} GB
    </div>
  );
}
