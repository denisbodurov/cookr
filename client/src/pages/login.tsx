import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Login = () => {
  const paperStyle = {
    width: "30vw",
    height: "70vh",
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 25,
    flexDirection: "column",
    gap: 30,
    backgroundColor: "#E56B6F",
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
    borderRadius: 20,
    width: "80%",
    margin: 5,
    backgroundColor: '#F9F7F3'
  };

  const submitButton = {
    margin: 50,
    width: 200,
    height: 40,
    backgroundColor: '#F9F7F3',
    color: '#22223B',
    fontWeight: 'bold',
    fontSize: 20,
  };
  return (
    <>
      <div>
        <Grid>
          <Paper elevation={4} style={paperStyle}>
            <Avatar style={avatarCircle}>
              <AccountCircleIcon style={avatarIcon} />
            </Avatar>
            <Typography variant="h4" fontWeight={"bold"} color={"#F9F7F3"}>
              Login
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

            <Button
              variant="contained"
              endIcon={<AccountCircleIcon />}
              style={submitButton}
            >
              Send
            </Button>
          </Paper>
        </Grid>
      </div>
    </>
  );
};
export default Login;
