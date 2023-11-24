import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import Chrono from 'components/Chrono';
import LoadingIndicator from 'components/Loading';
import { useFeedQuery } from 'components/Releases/query';
import { Feed } from 'components/Releases/types';

export default function FeedsShow() {
  const { id } = useParams();
  const { isFetching, data } = useFeedQuery(id);

  return (
    <>
      <Helmet>
        <title>Releases - Feeds</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="xl">
        {isFetching && <LoadingIndicator />}
        {data && <FeedShow {...data} />}
      </Container>
    </>
  );
}

function FeedShow({ name, active, source, type, url, processed }: Feed) {
  return (
    <div className="details">
      <table className="horizontal-table" aria-label="a dense table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{name}</td>
          </tr>
          <tr>
            <th>Active</th>
            <td>{active ? 'TRUE' : 'FALSE'}</td>
          </tr>
          <tr>
            <th>Source:Type</th>
            <td>
              {source}:{type}
            </td>
          </tr>
          <tr>
            <th>URL</th>
            <td>{url}</td>
          </tr>
          <tr>
            <th>Processed</th>
            <td>
              <Chrono fromNow>{processed}</Chrono>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
