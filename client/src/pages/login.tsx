import { Grid, Paper, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import G from "../assets/public/G.png";
import { Link } from "react-router-dom";

const Login = () => {
  type TextFieldProps = {
    borderColor?: string;
  };

  const options = {
    shouldForwardProp: (prop) => prop !== "borderColor",
  };
  const outlinedSelectors = [
    "& .MuiOutlinedInput-notchedOutline",
    "&:hover .MuiOutlinedInput-notchedOutline",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline",
  ];
  const TextField = styled(
    MuiTextField,
    options
  )<TextFieldProps>(({ borderColor }) => ({
    "& label.Mui-focused, label.Mui-focus": {
      color: borderColor,
    },
    [outlinedSelectors.join(",")]: {
      borderWidth: 2,
      borderColor,
    },
  }));
  return (
    <>
      <div className="flex w-full justify-center bg-backgroundLight">
        <Grid>
          <Paper
            elevation={4}
            className="flex items-center w-96 flex-col rounded-3xl gap-5 border-2 border-highLight bg-backgroundLight p-3 px-5 m-10 phone:m-1"
          >
            <div className="w-20 h-20 bg-highLight p-3 rounded-full">
              <img src={G} />
            </div>

            <Typography variant="h4" className="font-extrabold text-highLight">
              LOGIN
            </Typography>

            <TextField
              id="outlined-basic"
              label="Email"
              borderColor="#06D6A0"
              variant="outlined"
              className="rounded-lg w-full m-1 shadow-md bg-backgroundLight"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              borderColor="#06D6A0"
              className="rounded-lg w-full m-1 shadow-md bg-backgroundLight"
            />
            <Link to="/register" style={{ margin: 10, textDecoration: "none" }}>
              <Typography className="text-xs font-bold text-highLight">
                Don't have an account? Register now!
              </Typography>
            </Link>
            <Button
              variant="contained"
              endIcon={<AccountCircleIcon />}
              className="mb-5 w-48 h-10 rounded-lg bg-highLight text-backgroundLight font-bold text-base"
            >
              LOGIN NOW
            </Button>
          </Paper>
        </Grid>
      </div>
    </>
  );
};
export default Login;
