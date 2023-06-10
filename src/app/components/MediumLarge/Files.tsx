import * as React from 'react';
import Moment from 'react-moment';

import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import MovieIcon from '@mui/icons-material/Movie';
import IconButton from '@mui/material/IconButton';

export default function Files(props) {
  // console.log('files:', props.files);
  // console.log('torrent:', props.torrent);

  return (
    <div className="files">
      <table
        className="vertical-table"
        // size="small"
        aria-label="a dense table"
      >
        <thead>
          <tr>
            <td className="number">#</td>
            <td>File</td>
            <td className="date" align="right">
              Size
            </td>
            <td className="date" align="right">
              Progress
            </td>
            <td className="actions" align="right">
              Actions
            </td>
          </tr>
        </thead>
        <tbody>
          {props.files &&
            props.files.map(row => (
              <FilesRow
                key={row.id}
                id={row.id}
                num={row.num}
                mediumid={row.medium_id}
                torrentFile={props.torrent ? props.torrent.Files[row.num] : null}
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
      <th scope="row">{props.num + 1}</th>
      <td>{props.torrentFile.name}</td>
      <td align="right">{Number(props.torrentFile.size / 1000000).toFixed(2)}mb</td>
      <td align="right">{Number(props.torrentFile.progress).toFixed(2)}%</td>

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
