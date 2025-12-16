import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(
  {
    open,
    title,
    description,
    onConfirm,
    onClose,
    name = '',
    cancel = '',
    confirm='',
    children,
  }
){

  return (
    <React.Fragment>

      <Dialog
        open={open}
        slots={{
          transition={Transition}
        }}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {description}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{name}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

