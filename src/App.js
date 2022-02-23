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
              <svg
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 30 30"
                style={{
                  enableBackground: "new 0 0 30 30",
                  width: "30px",
                  marginLeft: "4rem",
                }}
                xmlSpace="preserve"
              >
                <style type="text/css">
                  {"\n\t.st0{fill:#FFFFFF;}\n\t.st1{fill:url(#SVGID_1_);}\n"}
                </style>
                <path
                  className="st0"
                  d="M26,0H4C1.8,0,0,1.8,0,4v22c0,2.2,1.8,4,4,4h22c2.2,0,4-1.8,4-4V4C30,1.8,28.2,0,26,0z"
                />
                <linearGradient
                  id="SVGID_1_"
                  gradientUnits="userSpaceOnUse"
                  x1={34.5273}
                  y1={-6.1733}
                  x2={-4.7378}
                  y2={36.4015}
                >
                  <stop
                    offset={0}
                    style={{
                      stopColor: "#0048B2",
                    }}
                  />
                  <stop
                    offset={1}
                    style={{
                      stopColor: "#012034",
                    }}
                  />
                </linearGradient>
                <path
                  className="st1"
                  d="M10.9,19.6c0-0.5,0-1,0-1.3c0-0.1,0.1-0.2,0.2-0.2c0.5,0,0.9,0,1.4,0v1.5C12,19.2,11.3,19.2,10.9,19.6z  M17.8,12.9c-0.3,0-0.6,0-0.8,0c-0.3,0-0.4,0.1-0.4,0.3c0,0.6,0,1.2,0,1.7s-0.3,0.7-0.7,0.5c-0.6-0.4-1.3-0.4-1.9,0 c-0.4,0.2-0.7,0-0.7-0.5c0-0.6,0-1.2,0-1.8c0-0.1-0.1-0.2-0.2-0.3c-0.3,0.1-0.6,0.1-1,0.1v4.3h5.7V12.9z M15.8,14.5c0-0.5,0-1,0-1.4 c0-0.1-0.1-0.2-0.2-0.2c-0.4,0-0.8,0-1.2,0c-0.1,0-0.2,0.1-0.2,0.1c0,0.5,0,0.9,0,1.5C14.6,14.1,15.3,14.1,15.8,14.5z M6.8,12.8 c0.1-0.1,0.2-0.1,0.3-0.2L14.5,7c0.4-0.3,0.5-0.3,1,0l7.3,5.6c0.1,0.1,0.2,0.2,0.3,0.2c0.2,0.1,0.5,0.1,0.6-0.1 c0.2-0.2,0.2-0.5,0-0.6c-0.1-0.1-0.1-0.1-0.2-0.2c-2.7-2.2-5.5-4.4-8.2-6.6c-0.2-0.1-0.4-0.1-0.6,0c-1.2,1-2.5,2-3.7,3 c-1.5,1.2-3,2.4-4.6,3.6c-0.1,0.2-0.3,0.3-0.3,0.4C6.1,12.8,6.5,13,6.8,12.8z M8.9,18.1v4.1h5.6V18c-0.3,0-0.6,0-0.9,0 c-0.2,0-0.3,0.1-0.3,0.3c0,0.6,0,1.1,0,1.7s-0.3,0.8-0.8,0.5s-1.2-0.3-1.7,0S10,20.6,10,20s0-1.3,0-1.9H8.9z M21.9,22.3 c0.2,0,0.3,0,0.5,0c0.3,0,0.3-0.1,0.3-0.3c0-2.7,0-5.4,0-8c0-0.2-0.1-0.3-0.2-0.4c-2.4-1.9-4.8-3.7-7.2-5.5 c-0.2-0.3-0.5-0.3-0.6-0.2c-2.5,1.9-4.9,3.7-7.3,5.5c-0.2,0.1-0.3,0.3-0.3,0.6c0,2.6,0,5.1,0,7.7c0,0.1,0,0.2,0,0.3s0.1,0.2,0.2,0.2 c0.2,0,0.4,0,0.6,0v-0.4c0-1.3,0-2.6,0-3.9C8,17.2,8,17.2,8.7,17.2h2.6v-0.4c0-1.3,0-2.7,0-4c0-0.6,0.1-0.7,0.5-0.7 c2.1,0,4.2,0,6.2,0c0.5,0,0.6,0.1,0.6,0.6c0,1.3,0,2.7,0,4v0.5c0.9,0,1.8,0,2.6,0c0.6,0,0.7,0.1,0.7,0.7c0,1.3,0,2.7,0,4V22.3z  M17.5,19.6c0.4-0.4,1.1-0.4,1.6-0.1c0-0.5,0-0.9,0-1.4c0-0.1-0.1-0.1-0.2-0.2c-0.5,0-0.9,0-1.4,0V19.6z M30,4v22c0,2.2-1.8,4-4,4H4 c-2.2,0-4-1.8-4-4V4c0-2.2,1.8-4,4-4h22C28.2,0,30,1.8,30,4z M24.7,22.8c0-0.3-0.2-0.5-0.5-0.5c-0.2,0-0.4,0-0.6,0v-8.5 c1.3-0.5,1.4-1.9,0.3-2.7c-2.9-2.2-5.7-4.4-8.5-6.7c-0.4-0.3-0.5-0.3-0.9,0L9.2,8.6c-1.1,0.9-2.3,1.8-3.4,2.7 c-0.2,0.2-0.4,0.4-0.5,0.7c-0.3,0.7,0.1,1.5,0.8,1.7c0.2,0.1,0.2,0.2,0.2,0.4c0,2.6,0,5.2,0,7.8v0.4H5.9c-0.6,0-0.7,0.1-0.7,0.7 c0,0.9,0,1.7,0,2.5c0,0.6,0.1,0.7,0.7,0.7H24c0.1,0,0.1,0,0.2,0c0.3,0,0.5-0.2,0.5-0.5C24.7,24.7,24.7,23.8,24.7,22.8z M6.1,23.7 h13.8c0.4,0,0.6,0.1,0.7,0.2c0,0,0,0,0-0.1c0,0,0,0,0-0.1c0-0.3,0.2-0.5,0.5-0.5s0.5,0.2,0.5,0.5c0,0,0,0,0,0.1 c0,0.3-0.2,0.5-0.5,0.5c-0.2,0-0.3-0.1-0.4-0.2c0,0.3-0.2,0.4-0.8,0.4H6.1v0.1C6,25.2,6,25.2,6.6,25.2h16.8c0.1,0,0.2,0,0.3,0 c0.1,0,0.2-0.1,0.2-0.1c0-0.7,0-1.3,0-2H6.1V23.7z M21,18h-1.1c0,0.7,0,1.3,0,2c0,0.6-0.3,0.8-0.8,0.5c-0.6-0.4-1.3-0.4-1.8,0 c-0.5,0.3-0.7,0.1-0.7-0.5s0-1.1,0-1.7c0-0.1-0.1-0.3-0.2-0.3c-0.3,0-0.7,0-1,0v4.2H21V18z"
                />
              </svg>
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
