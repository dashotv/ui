import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Chrono from 'components/Chrono';
import LoadingIndicator from 'components/Loading';
import { useFeedsAllQuery } from 'query/feeds';
import { Feed } from 'types/Feed';

export default function FeedsIndex() {
  const { isFetching, data } = useFeedsAllQuery();

  return (
    <>
      <Helmet>
        <title>Releases - Feeds</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="xl">
        {isFetching && <LoadingIndicator />}
        {data && <FeedsList data={data} />}
      </Container>
    </>
  );
}

function FeedsList({ data }: { data: Feed[] }) {
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
        <tbody>{data?.map(row => <FeedsRow key={row.id} {...row} />)}</tbody>
      </table>
    </div>
  );
}

function FeedsRow({ id, active, source, type, url, name, processed }: Feed) {
  return (
    <tr key={id}>
      <td>
        <IconButton size="small">
          <CheckCircleIcon color={active ? 'secondary' : 'action'} fontSize="small" />
        </IconButton>
      </td>
      <td>
        <Typography variant="caption">
          {source}:{type}
        </Typography>
      </td>
      <td>
        <span title={url}>
          <Link to={id}>{name}</Link>
        </span>
      </td>
      <td align="right">
        <Chrono fromNow>{processed}</Chrono>
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
}
