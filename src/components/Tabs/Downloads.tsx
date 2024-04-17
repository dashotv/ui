import React from 'react';

import { LoadingIndicator, WrapErrorBoundary } from '@dashotv/components';

import { DownloadRows, useDownloadsRecentMediaQuery } from 'components/Downloads';

export const Downloads = ({ medium_id }: { medium_id: string }) => {
  const { isFetching, data } = useDownloadsRecentMediaQuery(1, medium_id);
  return (
    <WrapErrorBoundary>
      {isFetching && <LoadingIndicator />}
      <DownloadRows downloads={data?.result || []} />
    </WrapErrorBoundary>
  );
};
