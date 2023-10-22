import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import LoadingIndicator from 'components/Loading';
import { useFeedQuery } from 'query/feeds';
import Chrono from 'components/Date';

export default function FeedsShow() {
  let { id } = useParams();
  const { isFetching, data } = useFeedQuery(id);

  return (
    <>
      <Helmet>
        <title>Releases - Feeds</title>
        <meta name="description" content="A React Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="xl">
        {isFetching && <LoadingIndicator />}
        {data && <FeedShow data={data} />}
      </Container>
    </>
  );
}

function FeedShow(props) {
  return (
    <div className="details">
      <table className="horizontal-table" aria-label="a dense table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{props.data.name}</td>
          </tr>
          <tr>
            <th>Active</th>
            <td>{props.data.active ? 'TRUE' : 'FALSE'}</td>
          </tr>
          <tr>
            <th>Source:Type</th>
            <td>
              {props.data.source}:{props.data.type}
            </td>
          </tr>
          <tr>
            <th>URL</th>
            <td>{props.data.url}</td>
          </tr>
          <tr>
            <th>Processed</th>
            <td>
              <Chrono fromNow>{props.data.processed}</Chrono>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
