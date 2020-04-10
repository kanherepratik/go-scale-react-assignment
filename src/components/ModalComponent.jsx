import * as React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Paper, DialogContent, DialogActions, Button } from "@material-ui/core";

const ModalComponent = ({ rowData, isModalOpen, handleClose }) => {
  return (
    <Dialog onClose={handleClose} open={isModalOpen}>
      <DialogTitle>Row Data in RAW JSON format</DialogTitle>
      <DialogContent>
        <Paper elevation={0}>
          <pre className="wrap-text">{JSON.stringify(rowData, null, 2)}</pre>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalComponent;
