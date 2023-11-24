import React, { useCallback, useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';

import { ButtonMap, LoadingIndicator, WrapErrorBoundary } from 'components/Common';
import { NzbgeekForm, NzbgeekResults, NzbgeekSearch } from 'components/Nzbgeek';
import { Nzbgeek as NzbgeekType, useNzbSearchTvQuery } from 'components/Nzbgeek';
import { Release } from 'components/Releases';
import { useQueryString } from 'hooks/useQueryString';
import { Medium } from 'types/medium';

const formdata = (medium: Medium): NzbgeekForm => {
  const { source_id, season_number, episode_number } = medium;
  return {
    tvdbid: source_id,
    season: season_number,
    episode: episode_number,
  };
};

export type NzbgeekProps = {
  medium: Medium;
  selector: (selected: Release | NzbgeekType) => void;
  selected?: { release_id: string; url: string };
};
export function Nzbgeek({ medium, selector, selected }: NzbgeekProps) {
  const { queryString } = useQueryString();
  const [initial] = useState<NzbgeekForm>(() => formdata(medium));
  const [form, setForm] = useState(initial);
  const [qs, setQs] = useState(queryString(form));
  const { isFetching, data: nzbs } = useNzbSearchTvQuery(qs);

  useEffect(() => {
    setQs(queryString(form));
  }, [form, queryString]);

  const handleSelect = useCallback(
    (selected: Release | NzbgeekType) => {
      selector(selected);
    },
    [selector],
  );

  const click = useCallback(() => {
    console.log('click');
  }, []);

  const renderActions = (row: NzbgeekType) => {
    const buttons = [
      {
        icon: <OutboundRoundedIcon fontSize="small" color="primary" />,
        click: click,
        title: 'edit',
      },
      {
        icon: <CheckCircleIcon fontSize="small" color="primary" />,
        click: () => handleSelect(row),
        title: 'select',
      },
    ];
    return <ButtonMap buttons={buttons} />;
  };

  return (
    <WrapErrorBoundary>
      {isFetching && <LoadingIndicator />}
      <NzbgeekSearch form={form} setForm={setForm} />
      {nzbs && <NzbgeekResults data={nzbs} actions={renderActions} selected={selected} />}
    </WrapErrorBoundary>
  );
}
