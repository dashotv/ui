import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';

export default function Files(props) {
  // console.log('torrent:', props.torrent);
  return (
    <div className="files">
      <table className="vertical-table" aria-label="a dense table">
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
                torrentFile={props.torrent?.Files[row.num]}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

function FilesRow(props) {
  function size(raw) {
    if (raw === undefined) {
      return;
    }
    return Number(raw / 1000000).toFixed(2) + 'mb';
  }

  function progress(raw) {
    if (raw === undefined) {
      return;
    }
    return Number(raw).toFixed(2) + '%';
  }

  return (
    <tr>
      <th scope="row">{props.num + 1}</th>
      <td className="name">
        <div title={props.torrentFile?.name}>{props.torrentFile?.name}</div>
      </td>
      <td align="right">{size(props.torrentFile?.size)}</td>
      <td align="right">{progress(props.torrentFile?.progress)}</td>

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
