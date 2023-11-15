import * as React from 'react';

import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
import IconButton from '@mui/material/IconButton';

import Chrono from 'components/Chrono';
import { Path } from 'types/path';

export default function Paths({ paths }: { paths: Path[] }) {
  return (
    <div className="files">
      <table
        className="vertical-table"
        // size="small"
        aria-label="a dense table"
      >
        <thead>
          <tr>
            <td className="number"></td>
            <td>File</td>
            <td className="date" align="right">
              Updated
            </td>
            <td className="actions" align="right">
              Actions
            </td>
          </tr>
        </thead>
        <tbody>
          {paths &&
            paths.map(({ extension, local, type, updated_at }, i) => (
              <PathsRow key={i} i={i} {...{ extension, local, type, updated_at }} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

function PathsRow({ i, extension, local, type, updated_at }: { i: number } & Path) {
  return (
    <tr key={i}>
      <th scope="row">
        {extension === 'jpg' && <ImageIcon />}
        {type === 'video' && <MovieIcon />}
        {type === 'subtitle' && <ClosedCaptionIcon />}
      </th>
      <td>
        {local}.{extension}
      </td>
      <td align="right">
        <Chrono fromNow>{updated_at?.toString()}</Chrono>
      </td>

      <td align="right">
        <IconButton size="small">
          <EditIcon />
        </IconButton>
        <IconButton size="small">
          <DeleteIcon />
        </IconButton>
        <IconButton size="small">
          <DeleteForeverIcon />
        </IconButton>
      </td>
    </tr>
  );
}
