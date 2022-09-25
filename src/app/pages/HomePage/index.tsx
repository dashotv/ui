import * as React from 'react';
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
    fetch(`/api/tower/upcoming/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
                `This is an HTTP error: The status is ${response.status}`
            );
          }
          return response.json();
        })
        .then((actualData) => {
          console.log(actualData);
          setData(actualData);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setData([]);
        })
        .finally(() => {
          setLoading(false);
        });
  }, []);

  return (
      <>
        <Helmet>
          <title>Home Page</title>
          <meta
              name="description"
              content="A React Boilerplate application homepage"
          />
        </Helmet>
        <PageWrapper>
          <div>
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            <ul>
              {data && data.map(({ id, title, search, season_number, episode_number }) => (
                      <li key={id}>
                        <h3>{search} {season_number}x{episode_number} {title}</h3>
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
