import * as React from 'react';
import axios from 'axios';
import {Helmet} from 'react-helmet-async';
import {Masthead} from './Masthead';
import {Features} from './Features';
import {PageWrapper} from 'app/components/PageWrapper';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import {useEffect, useState} from "react";

export function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/tower/upcoming/');
        setData(response.data);
        setError(null);
      } catch (err) {
        // @ts-ignore
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
      <>
        <Helmet>
          <title>Home</title>
          <meta
              name="description"
              content="A React Boilerplate application homepage"
          />
        </Helmet>
        <Container>
          <ImageList rowHeight={215} cols={8}>
            {loading && <div>loading...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
              {data && data.map(({ id, title, search, season_number, episode_number, release_date, cover }) => (
                    <ImageListItem key={id}>
                      <img
                          src={`${cover}?w=135&h=200`}
                          alt="cover"
                          loading="lazy"
                      />
                      <ImageListItemBar
                          title={search}
                          subtitle={`${season_number}x${episode_number} ${title}`}
                      />
                    </ImageListItem>
                  ))}
          </ImageList>
          {/*<Masthead/>*/}
          {/*<Features/>*/}
        </Container>
      </>
  );
}
