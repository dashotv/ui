import React, { forwardRef } from 'react';

import { SnackbarContent, SnackbarKey } from 'notistack';

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
  return (
    <SnackbarContent key={key} ref={ref}>
      <Alert severity={level} sx={{ width: '390px' }}>
        <AlertTitle>{className}</AlertTitle>
        <div role="alert">{message}</div>
      </Alert>
    </SnackbarContent>
  );
});
Notice.displayName = 'ReportComplete';
