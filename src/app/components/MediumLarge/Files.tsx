import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import StarsIcon from '@mui/icons-material/Stars';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';

export default function Files(props) {
  // console.log('files:', props.files);
  // console.log('torrent:', props.torrent);
  function sortedFiles(files, torrent) {
    if (!torrent) {
      return [];
    }
    for (let i = 0; i < files.length; i++) {
      files[i].torrentFile = torrent.Files[files[i].num];
    }
    return files.sort((a, b) => a.torrentFile.name.localeCompare(b.torrentFile.name));
  }
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
          {sortedFiles(props.files, props.torrent).map(row => (
            <FilesRow
              key={row.num}
              id={row.id}
              num={row.num}
              medium={row.medium}
              mediumid={row.medium_id}
              downloadFile={row}
              torrentFile={row.torrentFile}
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

  function name(raw) {
    if (raw === undefined) {
      return;
    }
    return raw.split('/').pop();
  }

  return (
    <tr>
      <th scope="row">{props.num + 1}</th>
      <td className="name">
        <div title={props.torrentFile?.name}>{name(props.torrentFile?.name)}</div>
        <div className="media">{props.medium?.display}</div>
      </td>
      <td align="right">{size(props.torrentFile?.size)}</td>
      <td align="right">{progress(props.torrentFile?.progress)}</td>

      <td align="right">
        <IconButton size="small">
          <CancelIcon />
        </IconButton>
        <IconButton size="small">
          <PlaylistAddCheckCircleIcon color={props.medium ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton size="small">
          <CheckCircleIcon />
        </IconButton>
        <IconButton size="small">
          <StarsIcon color={props.torrentFile?.priority > 0 ? 'secondary' : 'action'} />
        </IconButton>
      </td>
    </tr>
  );
}
