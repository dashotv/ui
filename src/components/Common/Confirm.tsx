import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface ConfirmProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  message: string;
  ok: () => void;
  cancel?: () => void;
}
export const Confirm = ({ open, setOpen, message, ok, cancel }: ConfirmProps) => {
  const handleCancel = () => {
    setOpen(false);
    if (cancel !== undefined) {
      cancel();
    }
  };
  const handleConfirm = () => {
    setOpen(false);
    ok();
  };

  return (
    <Dialog open={open} onClose={handleCancel} aria-labelledby="confirm-title" aria-describedby="confirm-description">
      <DialogTitle id="confirm-title">{'Confirm?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
