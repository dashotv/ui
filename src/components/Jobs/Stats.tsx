import React, { useState } from 'react';

import { Stack } from '@mui/material';

import { Pill } from 'components/Common';
import { useSub } from 'hooks/sub';
import { EventStats } from 'types/events';

export const JobsStats = () => {
  const [stats, setStats] = useState({});

  useSub('tower.stats', (data: EventStats) => {
    setStats(data);
  });

  if (!stats || !stats['totals']) {
    return null;
  }
  return (
    <Stack direction="row" spacing={2} justifyContent="end">
      <Pill name="Pending" color="gray" value={stats['totals']['pending'] || 0} />
      <Pill name="Queued" color="secondary" value={stats['totals']['queued'] || 0} />
      <Pill name="Running" color="primary" value={stats['totals']['running'] || 0} />
      {stats['totals']['cancelled'] > 0 && (
        <Pill name="Cancelled" color="warning" value={stats['totals']['cancelled']} />
      )}
      {stats['totals']['failed'] > 0 && <Pill name="Failed" color="error" value={stats['totals']['failed']} />}
    </Stack>
  );
};
