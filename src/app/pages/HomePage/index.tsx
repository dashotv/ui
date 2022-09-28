import * as React from 'react';
import axios from 'axios';
import {Helmet} from 'react-helmet-async';
import {Masthead} from './Masthead';
import {Features} from './Features';
import {PageWrapper} from 'app/components/PageWrapper';
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
        <PageWrapper>
          <div>
            {loading && <div>loading...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            <ul>
              {data && data.map(({ id, title, search, season_number, episode_number, release_date }) => (
                      <li key={id}>
                        <h3>{search} {season_number}x{episode_number} {title} {release_date}</h3>
                      </li>
                  ))}
            </ul>
          </div>
          {/*<Masthead/>*/}
          {/*<Features/>*/}
        </PageWrapper>
      </>
  );
}
