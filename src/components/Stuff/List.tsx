import React from 'react';

import { Chrono } from 'components/Common';

import './List.scss';
import { usePlexStuff } from './query';
import { Child } from './types';

const Show = ({ show }: { show: Child }) => {
  return (
    <div className="show">
      <div className="backdrop"></div>
      <img src={show.thumb} alt="thumbnail" />
      <div className="title">{show.title}</div>
      <div className="viewed">
        {show.viewed}/{show.total}
      </div>
      {show.lastViewedAt && (
        <div className="date">
          <Chrono fromNow>{ShowDate(show.lastViewedAt)}</Chrono>
        </div>
      )}
    </div>
  );
};
const ShowDate = (unix: string) => {
  return new Date(Number(unix) * 1000).toString();
};
export const Stuff = () => {
  const { data, isFetching } = usePlexStuff();

  if (isFetching) {
    return <div>Loading...</div>;
  }
  return <>{data?.map((child: Child) => <Show key={child.key} show={child} />)}</>;
};
