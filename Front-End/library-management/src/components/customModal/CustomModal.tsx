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
  handleSubmit?: () => void;
  modalTitle: string;
  children: ReactNode;
  dialogActionChildren?: ReactNode;
}

const CustomModal = ({
  open,
  handleClose,
  modalTitle,
  children,
  dialogActionChildren,
  handleSubmit,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth={'700px'}
    >
      <DialogTitle id='alert-dialog-title'>{modalTitle}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {dialogActionChildren ? (
          dialogActionChildren
        ) : (
          <>
            {handleSubmit && (
              <>
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
              </>
            )}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
