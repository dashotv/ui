import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function Series() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // @ts-ignore
  let { id } = useParams();

  const getData = async () => {
    try {
      const response = await axios.get(`/api/tower/series/${id}`);
      console.log(response.data);
      setData(response.data.results);
      setCount(response.data.count);
    } catch (err) {
      // @ts-ignore
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>Series</div>;
}
