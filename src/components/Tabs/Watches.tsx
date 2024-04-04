import * as React from 'react';

import { LoadingIndicator, WrapErrorBoundary } from 'components/Common';
import { WatchesList, useWatchesQuery } from 'components/Watches';

export function Watches({ medium_id }: { medium_id: string }) {
  const { isFetching, data } = useWatchesQuery(1, medium_id);
  return (
    <WrapErrorBoundary>
      {isFetching && <LoadingIndicator />}
      <WatchesList watches={data?.result} />
    </WrapErrorBoundary>
  );
}
