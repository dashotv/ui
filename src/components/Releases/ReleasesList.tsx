import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WavesIcon from '@mui/icons-material/Waves';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useReleaseGroup } from 'hooks/useReleaseGroup';
import { useReleaseResolution } from 'hooks/useReleaseResolution';

export function ReleasesList({ data, actions }) {
  const { resolution } = useReleaseResolution();
  const { group } = useReleaseGroup();
  return (
    <div className="releases">
      <table className="vertical-table">
        <thead>
          <tr>
            <td className="number"></td>
            <td className="number"></td>
            <td className="date">Type</td>
            <td>Title</td>
            <td className="actions" align="right">
              Published
            </td>
            <td className="actions" align="right">
              Actions
            </td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map(row => (
              <tr key={row.id}>
                <td>
                  <CheckCircleIcon color={row.verified ? 'secondary' : 'action'} fontSize="small" />
                </td>
                <td>{row.nzb ? <ArticleIcon fontSize="small" /> : <WavesIcon fontSize="small" />}</td>
                <td>
                  <Typography variant="overline">
                    {row.source}:{row.type}
                  </Typography>
                </td>
                <td>
                  <Stack spacing={1} direction="row">
                    <Link to={row.id} title={row.raw}>
                      <Typography variant="subtitle1">{row.display}</Typography>
                    </Link>
                    {resolution(row.resolution)}
                    {group(row.group, row.author)}
                  </Stack>
                </td>
                <td align="right">
                  <Moment fromNow>{row.published}</Moment>
                </td>
                <td align="right">{actions && actions(row)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
