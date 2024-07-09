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

const Register = () => {
  return (
    <>
      <div className="flex w-full justify-center bg-backgroundLight">
        <Grid>
          <Paper
            elevation={4}
            className="flex items-center w-[25vw] h-[65vh] flex-col rounded-3xl gap-6 bg-highLight p-3 m-10"
          >
            <Avatar className="m-2 w-12 h-12 bg-backgroundLight">
              <AccountCircleIcon className="text-4xl text-highLight" />
            </Avatar>
            <Typography
              variant="h4"
              className="font-extrabold text-backgroundLight"
            >
              Register
            </Typography>

            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              className="rounded-lg w-4/5 m-1 bg-backgroundLight"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              className="rounded-lg w-4/5 m-1 bg-backgroundLight"
            />

            <Button
              variant="contained"
              endIcon={<AccountCircleIcon />}
              className="m-10 w-48 h-10 rounded-lg bg-backgroundLight text-highLight font-bold text-base"
            >
              REGISTER NOW
            </Button>
          </Paper>
        </Grid>
      </div>
    </>
  );
};
export default Register;
