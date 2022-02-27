import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Fab, makeStyles, IconButton, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FormDialog from "./components/dialog";
import update from "./assetts/svg/pencil.svg";
import trash from "./assetts/svg/trash.svg";
import visible from "./assetts/svg/eye.svg";
import bell from "./assetts/svg/bell.svg";
import swal from "sweetalert";
import Row from "./components/row";
import RegistrationForm from "./components/login";

const initialValue = {
  ID: "",
  AccountID: "",
  Emails: "",
  Mobiles: "",
  NotifyType: "",
  NotifyChannels: "",
  FireWaitSec: "",
  UnfireWaitSec: "",
  NotifyWaitSec: "",
  CustomSettings: "",
  ModifyTime: "",
};

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    right: "4%",
    bottom: "5%",
    background: "#06446b",
    color: "#fff",
    "&:hover": {
      background: "#0b5380",
    },
  },
}));
function App() {
  const [, setGridApi] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [openRow, setOpenRow] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState();
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDetailsModelOpen = () => {
    setOpenRow(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  const handleDetailsModelClose = () => {
    setOpenRow(false);
    setFormData(initialValue);
  };
  const submitForm = () => {
    setIsSubmitted(true);
  };

  const url = "https://notification-system-beta.herokuapp.com/getAS";
  const columnDefs = [
    {
      headerName: "Actions",
      field: "ID",
      minWidth: 180,
      cellRenderer: (params) => (
        <div>
          <Tooltip title="View">
            <IconButton
              onClick={() => handleDetails(params.data)}
              variant="outlined"
              color="primary"
            >
              <img src={visible} alt="details" width={23} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => handleUpdate(params.data)}
              variant="outlined"
              color="primary"
            >
              <img src={update} alt="update" width={23} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => handleDelete(params.value)}
              variant="outlined"
              color="secondary"
            >
              <img src={trash} alt="delete" width={23} />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      headerName: "AccountID",
      field: "AccountID",
      minWidth: 150,
      sortable: true,
      unSortIcon: true,
    },
    {
      headerName: "Emails",
      field: "Emails",
      minWidth: 300,
      sortable: true,
      unSortIcon: true,
    },
    {
      headerName: "Mobiles",
      field: "Mobiles",
      minWidth: 250,
      sortable: true,
      unSortIcon: true,
    },
    {
      headerName: "Notify Type",
      field: "NotifyType",
      minWidth: 150,
      sortable: true,
      unSortIcon: true,
    },
    {
      headerName: "Notify Channels",
      field: "NotifyChannels",
      minWidth: 200,
      sortable: true,
      unSortIcon: true,
    },
    {
      headerName: "Fire Wait Sec",
      field: "FireWaitSec",
      minWidth: 150,
      sortable: true,
      unSortIcon: true,
    },
    {
      headerName: "Unfire Wait Sec",
      field: "UnfireWaitSec",
      minWidth: 150,
      sortable: true,
      unSortIcon: true,
    },
    {
      headerName: "Notify Wait Sec",
      field: "NotifyWaitSec",
      minWidth: 150,
      sortable: true,
      unSortIcon: true,
    },
    {
      headerName: "Custom Settings",
      field: "CustomSettings",
      minWidth: 300,
      sortable: true,
      unSortIcon: true,
    },
    {
      headerName: "Modify Time",
      field: "ModifyTime",
      minWidth: 200,
      sortable: true,
      unSortIcon: true,
    },
  ];
  // calling getUsers function for first time
  useEffect(() => {
    getUsers();
  }, []);

  //fetching user data from server
  const getUsers = () => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp.AccountSettings));
  };
  const onChange = (e) => {
    const { value, id } = e.target;
    // console.log(value, id);
    setFormData({ ...formData, [id]: value });
  };
  const onGridReady = (params) => {
    setGridApi(params);
  };

  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };
  const handleDetails = (oldData) => {
    setFormData(oldData);
    handleDetailsModelOpen();
  };
  //deleting a user
  const handleDelete = (id) => {
    swal({
      title: "Are you sure, you want to delete this row",
      text: "Once deleted, you will not be able to recover this data !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(url + `/${id}`, { method: "DELETE" })
          .then((resp) => resp.json())
          .then((resp) => getUsers());
        swal("Poof! Your data has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
  };
  const handleFormSubmit = () => {
    if (formData.ID) {
      //updating a user
      swal({
        title: "Are you sure?",
        text: "Once you click Ok, your data will be updated !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          fetch(url + `/${formData.ID}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
              "content-type": "application/json",
            },
          })
            .then((resp) => resp.json())
            .then((resp) => {
              handleClose();
              getUsers();
            });
          swal("Poof! Your data has been updated!", {
            icon: "success",
          });
        } else {
          swal("Your data is safe!");
        }
      });
    } else {
      // adding new user
      fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getUsers();
        });
      swal({
        title: "Good job!",
        text: "Your data added sucessfully!",
        icon: "success",
        button: "Added!",
      });
    }
  };

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      flex: 1,
      resizable: true,
      filter: true,
      editable: true,
    };
  }, []);
  return (
    <>
      {!isSubmitted ? (
        <RegistrationForm
          submitForm={submitForm}
          setStatus={setStatus}
          status={status}
        />
      ) : (
        <div className="App">
          <div className="app-nav">
            <div className="svgDiv">
              <img src={bell} width={50} />

              <h1>Notification Settings</h1>
            </div>
          </div>

          <div className="ag-theme-alpine ag-grid-style ">
            <AgGridReact
              rowData={tableData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
              pagination={true}
              paginationPageSize={10}
              domLayout={"autoHeight"}
              suppressMenuHide={true}
            />
            <Fab onClick={handleClickOpen} className={classes.fab}>
              <AddIcon />
            </Fab>
          </div>
          <FormDialog
            open={open}
            handleClose={handleClose}
            data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit}
          />
          <Row
            open={openRow}
            handleClose={handleDetailsModelClose}
            data={formData}
          />
        </div>
      )}
    </>
  );
}

export default App;
