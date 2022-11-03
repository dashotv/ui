import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import {
  LoadingIndicator,
  LoadingWrapper,
} from '../../components/LoadingIndicator';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ReleasesFeeds(props) {
  const [feeds, setFeeds] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFeeds = () => {
      setLoading(true);
      axios
        .get('/api/tower/feeds/')
        .then(response => {
          console.log(response.data);
          setFeeds(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
        });
    };
    getFeeds();
  }, []);

  return (
    <>
      <Helmet>
        <title>Releases - Feeds</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <Container maxWidth="xl">
        {loading && (
          <LoadingWrapper>
            <LoadingIndicator />
          </LoadingWrapper>
        )}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <Feeds data={feeds} />
      </Container>
    </>
  );
}

function Feeds(props) {
  return (
    <div className="feeds">
      <table className="vertical-table">
        <thead>
          <tr>
            <td className="number"></td>
            <td className="date">Source</td>
            <td>Name</td>
            <td className="actions" align="right">
              Processed
            </td>
            <td className="actions" align="right">
              Actions
            </td>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map(row => (
              <FeedsRow
                key={row.id}
                id={row.id}
                active={row.active}
                name={row.name}
                url={row.url}
                source={row.source}
                type={row.type}
                processed={row.processed}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

function FeedsRow(props) {
  return (
    <tr>
      <td>
        {props.active ? (
          <CheckCircleIcon color="primary" fontSize="small" />
        ) : (
          <CheckCircleOutlineIcon fontSize="small" />
        )}
      </td>
      <td>
        <Typography variant="caption">
          {props.source}:{props.type}
        </Typography>
      </td>
      <td>
        <span title={props.url}>
          <Link to={`feeds/${props.id}`}>{props.name}</Link>
        </span>
      </td>
      <td align="right">
        <Moment fromNow>{props.processed}</Moment>
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
