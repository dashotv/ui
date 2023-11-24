import React, { useCallback, useEffect, useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';

import { ButtonMap } from 'components/ButtonMap';
import LoadingIndicator from 'components/Loading';
import { NzbgeekForm, NzbgeekResults, NzbgeekSearch } from 'components/Nzbgeek';
import { useNzbSearchTvQuery } from 'components/Nzbgeek';
import { Nzbgeek as NzbgeekType } from 'components/Nzbgeek/types';
import { WrapErrorBoundary } from 'components/Util';
import { useQueryString } from 'hooks/useQueryString';
import { Release } from 'types/release';

export type NzbgeekProps = {
  form: NzbgeekForm;
  selector: (selected: Release | NzbgeekType) => void;
  selected?: { release_id: string; url: string };
};
export function Nzbgeek({ form: initial, selector, selected }: NzbgeekProps) {
  const { queryString } = useQueryString();
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
