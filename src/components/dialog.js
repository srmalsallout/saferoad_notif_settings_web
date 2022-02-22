import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  btncancel: {
    borderRadius: "25px",
    background: "#ef3333",
    color: "#fff",
    "&:hover": {
      background: "#db2525",
    },
  },
  btnSubmit: {
    borderRadius: "25px",
    background: "#06446b",
    color: "#fff",
    "&:hover": {
      background: "#0b5380",
    },
  },
}));

export default function FormDialog({
  open,
  handleClose,
  data,
  onChange,
  handleFormSubmit,
}) {
  const {
    AccountID,
    CustomSettings,
    Emails,
    FireWaitSec,
    ID,
    Mobiles,
    NotifyChannels,
    NotifyType,
    NotifyWaitSec,
    UnfireWaitSec,
  } = data;
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {ID ? "Update user" : "Create new user"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="AccountID"
              value={AccountID}
              onChange={(e) => onChange(e)}
              placeholder="Enter AccountID"
              label="AccountID"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Emails"
              value={Emails}
              onChange={(e) => onChange(e)}
              placeholder="Enter Emails"
              label="Emails"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="Mobiles"
              value={Mobiles}
              onChange={(e) => onChange(e)}
              placeholder="Enter Mobiles"
              label="Mobiles"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="NotifyType"
              value={NotifyType}
              onChange={(e) => onChange(e)}
              placeholder="Enter Notify Type"
              label="Notify Type"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="NotifyChannels"
              value={NotifyChannels}
              onChange={(e) => onChange(e)}
              placeholder="Enter Notify Channels"
              label="Notify Channels"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="FireWaitSec"
              value={FireWaitSec}
              onChange={(e) => onChange(e)}
              placeholder="Enter Fire Wait Sec"
              label="Fire Wait Sec"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="UnfireWaitSec"
              value={UnfireWaitSec}
              onChange={(e) => onChange(e)}
              placeholder="Enter Unfire Wait Sec"
              label="Unfire Wait Sec"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="NotifyWaitSec"
              value={NotifyWaitSec}
              onChange={(e) => onChange(e)}
              placeholder="Enter Notify Wait Sec"
              label="Notify Wait Sec"
              variant="outlined"
              margin="dense"
              fullWidth
            />
            <TextField
              id="CustomSettings"
              value={CustomSettings}
              onChange={(e) => onChange(e)}
              placeholder="Enter Custom Settings"
              label="Custom Settings"
              variant="outlined"
              margin="dense"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className={classes.btncancel}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            className={classes.btnSubmit}
            onClick={() => handleFormSubmit()}
            variant="contained"
          >
            {ID ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
