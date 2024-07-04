import React from "react";
import { Grid, Paper, Avatar, TextField, Typography, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Login = () => {
  const paperStyle = {
    width: "30vw",
    minWidth: 300,
    height: "70vh",
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 25,
    flexDirection: 'column',
    gap: 30,
  };
  const avatarCircle = {
    margin: 10,
    width: 50,
    height: 50,
  };

  const avatarIcon = {
    fontSize: 40,
  };

  const inputField = {
    height: 40,
    width: "80%",
    margin: 5,
  };

  const submitButton = { 
    margin: 50,
    width: 200,
    height: 40
  }
  return (
    <>
      <div>
        <Grid>
          <Paper elevation={4} style={paperStyle}>
            <Avatar style={avatarCircle}>
              <AccountCircleIcon style={avatarIcon} />
            </Avatar>
            <Typography variant="h4" fontWeight={"bold"}>
              Register
            </Typography>

            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              style={inputField}
            />
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              style={inputField}
            />

            <Button variant="contained" endIcon={<AccountCircleIcon/>} style={submitButton}>
              Send
            </Button>
          </Paper>
        </Grid>
      </div>
    </>
  );
};
export default Login;
