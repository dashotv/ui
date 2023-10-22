import React from 'react';
import { Link } from 'react-router-dom';

import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WavesIcon from '@mui/icons-material/Waves';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Chrono from 'components/Chrono';
import { useReleaseGroup } from 'hooks/useReleaseGroup';
import { useReleaseResolution } from 'hooks/useReleaseResolution';
import { useReleaseSettingMutation } from 'query/releases';

export function ReleasesList({ data, actions }) {
  const { resolution } = useReleaseResolution();
  const { group } = useReleaseGroup();
  const releaseUpdate = useReleaseSettingMutation();

  const toggleVerified = row => {
    releaseUpdate.mutate({ id: row.id, setting: { setting: 'verified', value: !row.verified } });
  };

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
                  <IconButton size="small" onClick={ev => toggleVerified(row)} title="verified">
                    <CheckCircleIcon color={row.verified ? 'secondary' : 'action'} fontSize="small" />
                  </IconButton>
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
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '525px' }}>
                        <Typography variant="subtitle1" noWrap color="primary">
                          {row.display}
                        </Typography>
                      </div>
                    </Link>
                    {resolution(row.resolution)}
                    {group(row.group, row.author)}
                  </Stack>
                </td>
                <td align="right">{row.published_at && <Chrono fromNow>{row.published_at}</Chrono>}</td>
                <td align="right">{actions && actions(row)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
