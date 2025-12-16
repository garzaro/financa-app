import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  return (
    <React.Fragment>
      {/*<Button variant="outlined" onClick={handleClickOpen}>*/}
      {/*  Slide in alert dialog*/}
      {/*</Button>*/}
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {decription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClick}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}