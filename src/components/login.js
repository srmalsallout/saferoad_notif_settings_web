import React from "react";
import { Grid, Paper, Button, Typography, makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  gridStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  account: {
    background: "none",
    fontSize: "4rem",
    color: "#06446b",
  },
  btnSubmit: {
    borderRadius: "25px",
    background: "#06446b",
    color: "#fff",
    "&:hover": {
      background: "#0b5380",
    },
  },
  field: {
    marginTop: "2rem",
  },
  field2: {
    marginTop: "2rem",
    marginBottom: "1rem",
  },
}));

const RegistrationForm = ({ submitForm }) => {
  const paperStyle = {
    padding: "40px 20px",
    width: 500,
    minHeight: 400,
    margin: "7rem auto",
  };
  const btnStyle = { marginTop: 10 };
  const initialValues = {
    userName: "defaultUser",
    password: "123456",
  };
  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    userName: Yup.string().min(3, "It's too short").required("Required"),
    password: Yup.string()
      .min(4, "Minimum characters should be 8")
      .required("Required"),
  });

  const onLogin = ({ userName, password }) => {
    fetch("https://notification-system-beta.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "user logged in!!") {
          swal({
            title: "Good job!",
            text: "User Logged In!!",
            icon: "success",
            button: "OK",
          });
          submitForm();
        } else {
          swal({
            title: "Opps!",
            text: "Username or Password Is incorrect!!",
            icon: "error",
            button: "OK",
          });
        }
      });
  };

  return (
    <Grid className={classes.gridStyle}>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <AccountCircleIcon className={classes.account} />
          <Typography variant="h4">Register</Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onLogin}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                name="userName"
                label="Username"
                type="text"
                fullWidth
                error={props.errors.userName && props.touched.userName}
                helperText={<ErrorMessage name="userName" />}
                required
                className={classes.field}
              />

              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                fullWidth
                error={props.errors.password && props.touched.password}
                helperText={<ErrorMessage name="password" />}
                required
                className={classes.field2}
              />

              <Button
                type="submit"
                style={btnStyle}
                variant="contained"
                color="primary"
                className={classes.btnSubmit}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default RegistrationForm;
