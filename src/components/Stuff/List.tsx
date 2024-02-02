import React from 'react';

import { Chrono, LoadingIndicator } from 'components/Common';

import './List.scss';
import { usePlexStuff } from './query';
import { Child } from './types';

const Show = ({ show }: { show: Child }) => {
  return (
    <div className="show">
      <div className="backdrop"></div>
      <img src={show.thumb} alt="thumbnail" />
      <div className="title">{show.title}</div>
      <div className="type">{show.librarySectionTitle}</div>
      <div className="viewed">
        {show.viewed}/{show.total}
      </div>
      <ShowDate unix={show.lastViewedAt} />
    </div>
  );
};
const ShowDate = ({ unix }: { unix: string }) => {
  if (!unix) return null;

  const string = new Date(Number(unix) * 1000).toString();
  return (
    <div className="date">
      <Chrono fromNow>{string}</Chrono>
    </div>
  );
};
export const Stuff = () => {
  const { data, isFetching } = usePlexStuff();

  return (
    <>
      {isFetching && <LoadingIndicator />}
      {data?.map((child: Child) => <Show key={child.key} show={child} />)}
    </>
  );
};
