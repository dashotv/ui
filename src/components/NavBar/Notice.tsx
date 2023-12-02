import React, { forwardRef } from 'react';

import { SnackbarContent, SnackbarKey } from 'notistack';

import { useTheme } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { EventNotice } from 'types/events';

export interface NoticeProps {
  key: SnackbarKey;
  data: EventNotice;
}

export const Notice = forwardRef((props: NoticeProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    key,
    data: { class: className, message, level },
  } = props;
  const theme = useTheme();
  const color = theme.palette[level].main;
  return (
    <SnackbarContent key={key} ref={ref}>
      <Alert severity={level} sx={{ width: '390px', border: '1px solid', borderColor: color }}>
        <AlertTitle>{className}</AlertTitle>
        <div role="alert">{message}</div>
      </Alert>
    </SnackbarContent>
  );
});
Notice.displayName = 'ReportComplete';
