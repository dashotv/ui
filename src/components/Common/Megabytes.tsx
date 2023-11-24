import React, { useState } from 'react';

import Typography from '@mui/material/Typography';

export const Megabytes = ({ value, ord }: { value: number; ord: 'bytes' | 'kilobytes' | 'megabytes' }) => {
  const getOutput = (v: number) => {
    switch (ord) {
      case 'bytes':
        return v / 1000000;
      case 'kilobytes':
        return v / 1000;
      default:
        return v;
    }
  };
  const [output] = useState(getOutput(value));

  return (
    <Typography variant="subtitle2" color="textSecondary">
      {output.toFixed(2)}mb
    </Typography>
  );
};
