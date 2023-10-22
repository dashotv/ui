import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Date from 'components/Date';
import LoadingIndicator from 'components/Loading';
import { useFeedsAllQuery } from 'query/feeds';

export default function FeedsIndex(props) {
  const { isFetching, data } = useFeedsAllQuery();

  return (
    <>
      <Helmet>
        <title>Releases - Feeds</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="xl">
        {isFetching && <LoadingIndicator />}
        {data && <Feeds data={data} />}
      </Container>
    </>
  );
}

function Feeds(props) {
  const renderRow = useCallback(row => {
    return (
      <tr key={row.id}>
        <td>
          <IconButton size="small">
            <CheckCircleIcon color={row.active ? 'secondary' : 'action'} fontSize="small" />
          </IconButton>
        </td>
        <td>
          <Typography variant="caption">
            {row.source}:{row.type}
          </Typography>
        </td>
        <td>
          <span title={row.url}>
            <Link to={row.id}>{row.name}</Link>
          </span>
        </td>
        <td align="right">
          <Date fromNow>{row.processed}</Date>
        </td>
        <td align="right">
          <IconButton size="small">
            <EditIcon fontSize="small" color="primary" />
          </IconButton>
          <IconButton size="small">
            <DeleteForeverIcon fontSize="small" color="error" />
          </IconButton>
        </td>
      </tr>
    );
  }, []);

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
        <tbody>{props.data && props.data.map(row => renderRow(row))}</tbody>
      </table>
    </div>
  );
}
