import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  btnSubmit: {
    borderRadius: "25px",
    background: "#06446b",
    color: "#fff",
    "&:hover": {
      background: "#0b5380",
    },
  },
  dialogLayout: {
    minWidth: "40vw",
  },
}));

export default function Row({ open, handleClose, data }) {
  const {
    AccountID,
    CustomSettings,
    Emails,
    FireWaitSec,
    ModifyTime,
    Mobiles,
    NotifyChannels,
    NotifyType,
    NotifyWaitSec,
    UnfireWaitSec,
  } = data;
  const classes = useStyles();

  const emailsSub = [Emails].join().split(",");

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Row Details</DialogTitle>
        <DialogContent className={classes.dialogLayout}>
          <strong className="titleModel">Account ID</strong>
          <h3 className="modelData">{AccountID ? AccountID : "Not Added"}</h3>
          <Divider />
          <strong className="titleModel">Emails</strong>
          {emailsSub.map((it, index) => (
            <h3 className="modelData" key={index}>
              {it ? it : "Not Added"}
            </h3>
          ))}

          <Divider />
          <strong className="titleModel">Mobiles</strong>
          <h3 className="modelData">{Mobiles ? Mobiles : "Not Added"}</h3>
          <Divider />
          <strong className="titleModel">Notify Type</strong>
          <h3 className="modelData">{NotifyType ? NotifyType : "Not Added"}</h3>
          <Divider />
          <strong className="titleModel">Notify Channels</strong>
          <h3 className="modelData">
            {NotifyChannels ? NotifyChannels : "Not Added"}
          </h3>
          <Divider />
          <strong className="titleModel">Notify Wait Sec</strong>
          <h3 className="modelData">
            {NotifyWaitSec ? NotifyWaitSec : "Not Added"}
          </h3>
          <Divider />
          <strong className="titleModel">Fire Wait Sec</strong>
          <h3 className="modelData">
            {FireWaitSec ? FireWaitSec : "Not Added"}
          </h3>
          <Divider />
          <strong className="titleModel">Unfire Wait Sec</strong>
          <h3 className="modelData">
            {UnfireWaitSec ? UnfireWaitSec : "Not Added"}
          </h3>
          <Divider />
          <strong className="titleModel">Custom Settings</strong>
          <h3 className="modelData">
            {CustomSettings ? CustomSettings : "Not Added"}
          </h3>
          <Divider />
          <strong className="titleModel">Modify Time</strong>
          <h3 className="modelData">{ModifyTime ? ModifyTime : "Not Added"}</h3>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            className={classes.btnSubmit}
            onClick={handleClose}
            variant="contained"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
