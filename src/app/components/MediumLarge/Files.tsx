import * as React from 'react';
import Moment from 'react-moment';
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Files(props) {
  return (
    <div className="files">
      <table
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
            props.paths.map(row => (
              <FilesRow
                key={row.id}
                id={row.id}
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

function FilesRow(props) {
  return (
    <tr>
      <th scope="row">
        {props.extension === 'jpg' && <ImageIcon />}
        {props.type === 'video' && <MovieIcon />}
      </th>
      <td>
        {props.local}.{props.extension}
      </td>
      <td align="right">
        <Moment format="YYYY-MM-DD">{props.updated}</Moment>
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
