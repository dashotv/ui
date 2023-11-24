import { useCallback } from 'react';
import * as React from 'react';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import StarsIcon from '@mui/icons-material/Stars';
import IconButton from '@mui/material/IconButton';

import { DownloadFile } from 'components/Downloads';
import { Torrent } from 'types/torrents';

export function Files({
  files,
  torrent,
  open,
  clear,
}: {
  files?: DownloadFile[];
  torrent?: Torrent;
  open: (num: number, name: string | undefined) => void;
  clear: (num: number) => void;
}) {
  // console.log('files:', props.files);
  // console.log('torrent:', props.torrent);
  const sortedFiles = useCallback((files?: DownloadFile[], torrent?: Torrent) => {
    if (!files) {
      return [];
    }
    if (torrent) {
      for (let i = 0; i < files.length; i++) {
        files[i].torrent_file = torrent.Files[files[i].num];
      }
      return files.sort((a, b) => a.torrent_file!.name.localeCompare(b.torrent_file!.name));
    }
    return files.sort((a, b) => a.num - b.num);
  }, []);

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
          {sortedFiles(files, torrent).map(row => (
            <FilesRow key={row.num} file={row} open={open} clear={clear} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FilesRow({
  open,
  clear,
  file: { num, torrent_file, medium },
}: {
  open: (num: number, name: string | undefined) => void;
  clear: (num: number) => void;
  file: DownloadFile;
}) {
  const { season_number, episode_number, title, display } = medium || {};
  function size(raw: number | undefined) {
    if (raw === undefined) {
      return;
    }
    return Number(raw / 1000000).toFixed(2) + 'mb';
  }

  function progress(raw: number | undefined) {
    if (raw === undefined) {
      return;
    }
    return Number(raw).toFixed(2) + '%';
  }

  function name(raw: string | undefined) {
    if (raw === undefined) {
      return;
    }
    return raw.split('/').pop();
  }

  return (
    <tr>
      <th scope="row">{num + 1}</th>
      <td className="name">
        <div title={torrent_file?.name}>{name(torrent_file?.name)}</div>
        {medium && (
          <div className="media">
            {season_number}x{episode_number} {title} {display}
          </div>
        )}
      </td>
      <td align="right">{size(torrent_file?.size)}</td>
      <td align="right">{progress(torrent_file?.progress)}</td>

      <td align="right">
        <IconButton
          size="small"
          onClick={() => {
            clear(num);
          }}
        >
          <CancelIcon />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            open(num, name(torrent_file?.name));
          }}
        >
          <PlaylistAddCircleIcon color={medium ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton size="small">
          <CheckCircleIcon color={medium?.downloaded ? 'secondary' : 'action'} />
        </IconButton>
        <IconButton size="small">
          <StarsIcon color={torrent_file?.priority && torrent_file.priority > 0 ? 'secondary' : 'action'} />
        </IconButton>
      </td>
    </tr>
  );
}
