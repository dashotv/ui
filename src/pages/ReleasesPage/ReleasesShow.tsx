import * as React from 'react';
import { useParams } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FourKIcon from '@mui/icons-material/FourK';
import TwoKIcon from '@mui/icons-material/TwoK';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import LoadingIndicator from 'components/Loading';
import { useReleaseQuery } from 'query/releases';

export default function ReleasesShow(props) {
  let { id } = useParams();
  const { isFetching, data, error } = useReleaseQuery(id);

  function resolution(r) {
    switch (r) {
      case '2160':
        return <FourKIcon color="primary" fontSize="small" />;
      case '1080':
        return <TwoKIcon color="secondary" fontSize="small" />;
      default:
        return '';
    }
  }

  function group(group, author) {
    if (group) {
      return (
        <Typography className="spacer" variant="caption">
          {group}
        </Typography>
      );
    }
    if (author) {
      return (
        <Typography className="spacer" variant="caption">
          [{author}]
        </Typography>
      );
    }
    return '';
  }

  if (error instanceof Error) {
    console.error(error.message);
    return <Container maxWidth="xl">Error: {error.message}</Container>;
  }

  if (isFetching) {
    return <LoadingIndicator />;
  }

  return (
    <Container maxWidth="xl">
      {data && (
        <div className="release">
          <div className="titlebar">
            <div className="title">
              <span className="title">
                {data.verified ? (
                  <CheckCircleIcon color="primary" fontSize="small" />
                ) : (
                  <CheckCircleOutlineIcon fontSize="small" />
                )}{' '}
                {data.name} {data.season}x{data.episode} {resolution(data.resolution)}
              </span>
              {group(data.group, data.author)}
            </div>
          </div>
          <div>
            <table className="horizontal-table">
              <tr>
                <th>Name</th>
                <td>{data.name}</td>
              </tr>
              <tr>
                <th>Source:Type</th>
                <td>
                  <Typography variant="caption">
                    {data.source}:{data.type}
                  </Typography>
                </td>
              </tr>
              <tr>
                <th>Season/Episode</th>
                <td>
                  {data.season}x{data.episode}
                </td>
              </tr>
              <tr>
                <th>Group</th>
                <td>{data.group}</td>
              </tr>
              <tr>
                <th>Author</th>
                <td>{data.author}</td>
              </tr>
              <tr>
                <th>Verified</th>
                <td>{data.verified ? 'TRUE' : 'FALSE'}</td>
              </tr>
              <tr>
                <th>NZB</th>
                <td>{data.nzb ? 'TRUE' : 'FALSE'}</td>
              </tr>
              <tr>
                <th>Title</th>
                <td>{data.title}</td>
              </tr>
              <tr>
                <th>Raw</th>
                <td>{data.raw}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{data.description}</td>
              </tr>
              <tr>
                <th>Size</th>
                <td>{data.size}</td>
              </tr>
              <tr>
                <th>Links</th>
                <td>
                  <a href={data.view}>View</a> | <a href={data.download}>Download</a>
                </td>
              </tr>
              <tr>
                <th>Hash</th>
                <td>{data.infohash}</td>
              </tr>
              <tr>
                <th>Checksum</th>
                <td>{data.checksum}</td>
              </tr>
              <tr>
                <th>Tags</th>
                <td>{data.tags}</td>
              </tr>
              <tr>
                <th>Created</th>
                <td>{data.created_at}</td>
              </tr>
              <tr>
                <th>Published</th>
                <td>{data.published}</td>
              </tr>
            </table>
          </div>
        </div>
      )}
    </Container>
  );
}
