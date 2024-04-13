import React, { useCallback, useEffect, useState } from 'react';

import { NzbgeekFormMovie, NzbgeekFormTv, SearchResult } from 'client/scry/nzbgeek';
import { DownloadSearch, Release } from 'client/tower';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';

import { ButtonMap, ButtonMapButton, LoadingIndicator, WrapErrorBoundary } from 'components/Common';
import {
  NzbgeekResults,
  NzbgeekSearchMovie,
  NzbgeekSearchTv,
  useNzbSearchMovieQuery,
  useNzbSearchTvQuery,
} from 'components/Nzbgeek';
import { useQueryString } from 'hooks/queryString';

export const Nzbgeek = ({
  search,
  selector,
  selected,
}: {
  search?: DownloadSearch;
  selector: (url: string) => void;
  selected?: string;
}) => {
  switch (search?.type) {
    case 'tv':
    case 'anime':
      return <NzbgeekTv {...{ search, selector, selected }} />;
    case 'movies':
      return <NzbgeekMovie {...{ search, selector, selected }} />;
    default:
      return <>wut?</>;
  }
};

export type NzbgeekTvProps = {
  search?: DownloadSearch;
  selector: (url: string) => void;
  selected?: string;
};
export function NzbgeekTv({ search, selector, selected }: NzbgeekTvProps) {
  const { queryString } = useQueryString();
  // const [initial] = useState<NzbgeekFormTv | NzbgeekFormMovie | null>(null);
  const [form, setForm] = useState<NzbgeekFormTv>(() => {
    if (!search) return {};
    const { source_id, season, episode } = search;
    return { tvdbid: source_id, season: season || '', episode: episode || '' };
  });
  const { isFetching, data: nzbs } = useNzbSearchTvQuery(form);

  const handleSelect = useCallback(
    (selected: SearchResult) => {
      selector(selected.link);
    },
    [selector],
  );

  const submit = (data: NzbgeekFormTv) => {
    setForm(data);
  };

  const click = useCallback(() => {
    console.log('click');
  }, []);

  const renderActions = (row: SearchResult) => {
    const buttons: ButtonMapButton[] = [
      {
        Icon: OutboundRoundedIcon,
        color: 'primary',
        click: click,
        title: 'edit',
      },
      {
        Icon: CheckCircleIcon,
        color: 'primary',
        click: () => handleSelect(row),
        title: 'select',
      },
    ];
    return <ButtonMap buttons={buttons} size="small" />;
  };

  return (
    <WrapErrorBoundary>
      {isFetching && <LoadingIndicator />}
      <NzbgeekSearchTv {...{ form, submit }} />
      {nzbs && <NzbgeekResults data={nzbs} actions={renderActions} selected={selected} />}
    </WrapErrorBoundary>
  );
}

export type NzbgeekMovieProps = {
  search?: DownloadSearch;
  selector: (url: string) => void;
  selected?: string;
};
export function NzbgeekMovie({ search, selector, selected }: NzbgeekMovieProps) {
  const { queryString } = useQueryString();
  // const [initial] = useState<NzbgeekFormTv | NzbgeekFormMovie | null>(null);
  const [form, setForm] = useState<NzbgeekFormMovie>(() => {
    if (!search) return {};
    const { source_id } = search;
    return { imdbid: source_id, tmdbid: source_id };
  });
  const { isFetching, data: nzbs } = useNzbSearchMovieQuery(form);

  const handleSelect = useCallback(
    (selected: SearchResult) => {
      selector(selected.link);
    },
    [selector],
  );

  const submit = (data: NzbgeekFormMovie) => {
    setForm(data);
  };

  const click = useCallback(() => {
    console.log('click');
  }, []);

  const renderActions = (row: SearchResult) => {
    const buttons: ButtonMapButton[] = [
      {
        Icon: OutboundRoundedIcon,
        color: 'primary',
        click: click,
        title: 'edit',
      },
      {
        Icon: CheckCircleIcon,
        color: 'primary',
        click: () => handleSelect(row),
        title: 'select',
      },
    ];
    return <ButtonMap buttons={buttons} size="small" />;
  };

  return (
    <WrapErrorBoundary>
      {isFetching && <LoadingIndicator />}
      <NzbgeekSearchMovie {...{ form, submit }} />
      {nzbs && <NzbgeekResults data={nzbs} actions={renderActions} selected={selected} />}
    </WrapErrorBoundary>
  );
}
