import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Feed } from '../../../types/Feed';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import LoadingIndicator from '../../components/Loading';
import * as React from 'react';
import Moment from 'react-moment';

export default function FeedsShow() {
  const [data, setData] = useState<Feed | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  // @ts-ignore
  let { id } = useParams();

  useEffect(() => {
    const getFeed = () => {
      setLoading(true);
      console.log('getfeed');
      axios
        .get(`/api/tower/feeds/${id}`)
        .then(response => {
          console.log(response.data);
          setData(response.data);
          setLoading(false);
        })
        .catch(err => {
          enqueueSnackbar('error getting data', { variant: 'error' });
          console.error(err);
        });
    };
    getFeed();
  }, [id, enqueueSnackbar]);

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
        {loading && <LoadingIndicator />}
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
              <Moment fromNow>{props.data.processed}</Moment>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
