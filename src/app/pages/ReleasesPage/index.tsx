import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Helmet } from 'react-helmet-async';
import {
  LoadingIndicator,
  LoadingWrapper,
} from '../../components/LoadingIndicator';
import Downloads from '../../components/Downloads';
import axios from 'axios';
import Moment from 'react-moment';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArticleIcon from '@mui/icons-material/Article';
import WavesIcon from '@mui/icons-material/Waves';
import FourKIcon from '@mui/icons-material/FourK';
import TwoKIcon from '@mui/icons-material/TwoK';
import Typography from '@mui/material/Typography';

import './releases.scss';

export function ReleasesPage() {
  const [releases, setReleases] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getReleases = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/scry/releases/');
        console.log(response.data);
        setReleases(response.data.Releases);
      } catch (err) {
        // @ts-ignore
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getReleases();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - Recent</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <Container maxWidth="xl">
        <Search />
        {loading && (
          <LoadingWrapper>
            <LoadingIndicator />
          </LoadingWrapper>
        )}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <Releases data={releases} />
      </Container>
    </>
  );
}

function Search(props) {
  return (
    <div>
      <h1>Search</h1>
    </div>
  );
}

function Releases(props) {
  return (
    <div className="releases">
      <table>
        <thead>
          <tr>
            <td className="number"></td>
            <td className="number"></td>
            <td></td>
            <td>Title</td>
            <td className="actions" align="right">
              Release
            </td>
            <td className="actions" align="right">
              Actions
            </td>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map(row => (
              <ReleaseRow
                key={row.id}
                type={row.type}
                nzb={row.nzb}
                source={row.source}
                display={row.display}
                raw={row.raw}
                resolution={row.resolution}
                group={row.group}
                author={row.author}
                created={row.created_at}
                verified={row.verified}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

function ReleaseRow(props) {
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

  function group() {
    if (props.group) {
      return (
        <Typography className="spacer" variant="caption">
          {props.group}
        </Typography>
      );
    }
    if (props.author) {
      return <Typography variant="caption">[{props.group}]</Typography>;
    }
    return '';
  }
  return (
    <tr>
      <td>
        {props.verified ? (
          <CheckCircleIcon color="primary" fontSize="small" />
        ) : (
          <CheckCircleOutlineIcon fontSize="small" />
        )}
      </td>
      <td>
        {props.nzb ? (
          <ArticleIcon fontSize="small" />
        ) : (
          <WavesIcon fontSize="small" />
        )}
      </td>
      <td>
        {props.source}:{props.type}
      </td>
      <td>
        <span title={props.raw}>
          {props.display}
          {resolution(props.resolution)}
          {group()}
        </span>
      </td>
      <td align="right">
        <Moment fromNow>{props.created}</Moment>
      </td>
      <td align="right">
        <IconButton size="small">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <DeleteForeverIcon fontSize="small" />
        </IconButton>
      </td>
    </tr>
  );
}
