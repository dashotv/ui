import React, { useCallback, useEffect, useState } from 'react';

import { Medium, Release } from 'client/tower';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';

import { ButtonMap, ButtonMapButton, LoadingIndicator, WrapErrorBoundary } from 'components/Common';
import {
  NzbgeekFormMovie,
  NzbgeekFormTv,
  NzbgeekResults,
  NzbgeekSearchMovie,
  NzbgeekSearchTv,
  Nzbgeek as NzbgeekType,
  useNzbSearchMovieQuery,
  useNzbSearchTvQuery,
} from 'components/Nzbgeek';
import { useQueryString } from 'hooks/queryString';

export const Nzbgeek = ({
  medium,
  selector,
  selected,
}: {
  medium?: Medium;
  selector: (url: string) => void;
  selected?: { release_id?: string; url?: string };
}) => {
  switch (medium?.type) {
    case 'Series':
    case 'Episode':
      return <NzbgeekTv {...{ medium, selector, selected }} />;
    case 'Movie':
      return <NzbgeekMovie {...{ medium, selector, selected }} />;
    default:
      return <>wut?</>;
  }
};

export type NzbgeekTvProps = {
  medium?: Medium;
  selector: (url: string) => void;
  selected?: { release_id?: string; url?: string };
};
export function NzbgeekTv({ medium, selector, selected }: NzbgeekTvProps) {
  const { queryString } = useQueryString();
  // const [initial] = useState<NzbgeekFormTv | NzbgeekFormMovie | null>(null);
  const [form, setForm] = useState<NzbgeekFormTv>(() => {
    if (!medium) return {};
    const { source_id, season_number, episode_number } = medium;
    return { tvdbid: source_id, season: season_number, episode: episode_number };
  });
  const [qs, setQs] = useState(queryString(form));
  const { isFetching, data: nzbs } = useNzbSearchTvQuery(qs);

  useEffect(() => {
    setQs(queryString(form));
  }, [form, queryString]);

  const handleSelect = useCallback(
    (selected: NzbgeekType) => {
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

  const renderActions = (row: NzbgeekType) => {
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
  medium?: Medium;
  selector: (url: string) => void;
  selected?: { release_id?: string; url?: string };
};
export function NzbgeekMovie({ medium, selector, selected }: NzbgeekMovieProps) {
  const { queryString } = useQueryString();
  // const [initial] = useState<NzbgeekFormTv | NzbgeekFormMovie | null>(null);
  const [form, setForm] = useState<NzbgeekFormMovie>(() => {
    if (!medium) return {};
    const { imdb_id, source_id } = medium;
    return { imdbid: imdb_id, tmdbid: source_id };
  });
  const [qs, setQs] = useState(queryString(form));
  const { isFetching, data: nzbs } = useNzbSearchMovieQuery(qs);

  useEffect(() => {
    if (!form.imdbid) return;
    setQs(queryString(form));
  }, [form, queryString]);

  const handleSelect = useCallback(
    (selected: NzbgeekType) => {
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

  const renderActions = (row: NzbgeekType) => {
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
