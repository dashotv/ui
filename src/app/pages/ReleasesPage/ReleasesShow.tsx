import * as React from 'react';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Release } from '../../../types/release';
import LoadingIndicator from '../../components/Loading';
import Typography from '@mui/material/Typography';

export default function ReleasesShow(props) {
  const [data, setData] = useState<Release | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  // @ts-ignore
  let { id } = useParams();

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      axios
        .get(`/api/tower/releases/${id}`)
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
    getData();
  }, [id, enqueueSnackbar]);

  return (
    <Container maxWidth="xl">
      {loading && <LoadingIndicator />}
      {data && (
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
            <th>Season</th>
            <td>{data.season}</td>
          </tr>
          <tr>
            <th>Episode</th>
            <td>{data.episode}</td>
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
            <td>{data.verified}</td>
          </tr>
          <tr>
            <th>NZB</th>
            <td>{data.nzb}</td>
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
              <a href={data.view}>View</a> |{' '}
              <a href={data.download}>Download</a>
            </td>
          </tr>
          <tr>
            <th>Hash</th>
            <td>{data.hash}</td>
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
            <td>{data.published_at}</td>
          </tr>
        </table>
      )}
    </Container>
  );
}
