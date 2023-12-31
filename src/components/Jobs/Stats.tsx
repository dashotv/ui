import React from 'react';

import { Stack } from '@mui/material';

import { Pill } from 'components/Common';
import { EventStats } from 'types/events';

export const JobsStats = ({ stats }: { stats: EventStats }) => {
  if (!stats || !stats['totals']) {
    return null;
  }
  return (
    <Stack direction="row" spacing={2} justifyContent="end">
      <Pill name="Pending" color="primary.dark" value={stats['totals']['pending'] || 0} />
      <Pill name="Queued" color="primary" value={stats['totals']['queued'] || 0} />
      <Pill name="Running" color="warning" value={stats['totals']['running'] || 0} />
      <Pill name="Failed" color="error" value={stats['totals']['failed'] || 0} />
      <Pill name="Finished" color="success" value={stats['totals']['finished'] || 0} />
    </Stack>
  );
};
