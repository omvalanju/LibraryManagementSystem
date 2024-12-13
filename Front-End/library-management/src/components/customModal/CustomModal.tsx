import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { ReactNode } from 'react';
interface Props {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  modalTitle: string;
  children: ReactNode;
}
const CustomModal = ({
  open,
  handleClose,
  modalTitle,
  children,
  handleSubmit,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{modalTitle}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button
          onClick={() => {
            handleClose();
            handleSubmit();
          }}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
