import React, { useState } from "react";

import {
  Button,
  TextField,
  Stack,
  Box,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Signup from "./Signup";
import { render } from "react-dom";
export default function Login() {
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );

  const [open, setOpen] = useState(false);

  const [errorMsg, setErrorMsg] = useState("Invalid Input!");

  const [user, setUser] = useState({
    email: {
      value: "",
      type: "email",
      name: "email",
      label: "E-mail Address",
      error: false,
      helperText: "",
    },
    password: {
      value: "",
      type: "password",
      name: "password",
      label: "Password",
      error: false,
      helperText: "",
    },
  });

  const onChange = (e) => {
    let key = e.target.name;
    setUser({
      ...user,
      [key]: {
        ...user[key],
        value: e.target.value,
        error: false,
        helperText: "",
      },
    });
  };
  const validate = () => {
    let err = false;
    if (!user.password.value) {
      setUser((olduser)=> ({
        ...olduser,
        password: {
          ...olduser["password"],
          error: true,
          helperText: "Password cannot be empty!",
        },
      }));
  
      err = true;
    }
    if (!validEmail.test(user.email.value)) {
      setUser((prevState) => ({
        ...prevState,
        email: {
          ...prevState["email"],
          error: true,
          helperText: "Please enter a valid E-mail Address!",
        },
      }));
      err = true;
    }

    return !err;
  };
  const url = "http://localhost:80/lab_2/login.php";
  const welcomeurl = "http://localhost:80/lab_2/welcome.php";
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("OK");
      fetch(url,{
        method:"POST",

        
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(
          {
            email:user.email.value,
            pwd:user.password.value
          }
        )})
      
      .then(res => res.json())
      .then(res=> {
        if(res['error'] === "not-found"){
          setErrorMsg("Incorrect E-mail or Password!");
          setOpen('true');
          console.log(res['error']);
        }
        else{
          window.location.replace(welcomeurl+"?name="+res[2]);
        }
      })
      .catch((err)=>{
        setErrorMsg("Error!");
        setOpen('true');
        console.log(err);
      });
    }
  };

  return (
    <Stack spacing={3}>
      <form autocmplete="off" onSubmit={onSubmit} autoComplete="off" >
        <Box sx={{ p: 2 }}>
          <TextField
            variant="filled"
            required
            fullWidth
            color="secondary"
            {...user["email"]}
            onChange={onChange}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <TextField
            variant="filled"
            required
            fullWidth
            color="secondary"
            {...user["password"]}
            onChange={onChange}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="secondary"
            onClick={onSubmit}
          >
            Login
          </Button>
        </Box>
        <Box sx={{ p: 2 }}>
          {open ? (
            <Alert
              show={open}
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {errorMsg}
            </Alert>
          ) : (
            <></>
          )}
        </Box>
      </form>
    </Stack>
  );
}
