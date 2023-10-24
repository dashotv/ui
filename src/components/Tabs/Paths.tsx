import * as React from 'react';

import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
import IconButton from '@mui/material/IconButton';

import Chrono from 'components/Chrono';

export default function Paths(props) {
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
          {props.paths &&
            props.paths.map((row, i) => (
              <PathsRow
                key={i}
                id={i}
                type={row.type}
                local={row.local}
                extension={row.extension}
                updated={row.updated_at}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

function PathsRow({ id, extension, local, type, updated }) {
  return (
    <tr key={id}>
      <th scope="row">
        {extension === 'jpg' && <ImageIcon />}
        {type === 'video' && <MovieIcon />}
        {type === 'subtitle' && <ClosedCaptionIcon />}
      </th>
      <td>
        {local}.{extension}
      </td>
      <td align="right">
        <Chrono fromNow>{updated}</Chrono>
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
