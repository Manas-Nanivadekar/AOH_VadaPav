import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }
const useStyles = makeStyles((theme) => ({
  logo: {
    width: "200px",
    height: "auto",
  },
  title: {
    width: "350px",
    textAlign: "center",
    paddingBottom: "20px",
  },
  formBox: {
    my: 8,
    mx: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0px 95px 0px 95px",

    [theme.breakpoints.down("sm")]: {
      margin: "0px 30px 0px 30px",
    },
    [theme.breakpoints.up("md")]: {
      margin: "0px 95px 0px 95px",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "0px 95px 0px 95px",
    },
  },
}));

export default function SignUp() {
  const history = useHistory()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    //name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [e.target.id]: value });
  };

  const MakeAPICall = async (e) => {
    e.preventDefault();
    console.log("REACHED HERE")
    const { email, password } = user;
    // const res = await fetch("http://ec2-52-66-208-132.ap-south-1.compute.amazonaws.com:5001/auth/signup", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // });
    const payload = {
      username : email, password : password
    }
    console.log(payload)
    const res = await axios.post("http://ec2-52-66-208-132.ap-south-1.compute.amazonaws.com:5001/auth/signup", payload)
    console.log(res)

    // const data = await res.json();
    // if ((data.status === 422 || !data)) {
    //   window.alert("INvalid Registration");
    //   console.log("INvalid Registration");
    // } else {
    
    // }
    if (res.status == 200) {
      window.alert(" Registration Successfull");
      console.log("Successfull Registration");
      history.push("/product");
    } else {
      window.alert("INvalid Registration");
      console.log("INvalid Registration");
    }
  };

  const classes = useStyles();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!isChecked) {
      alert("Please agree to the Terms & Conditions");
      return;
    }
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage:
            "url(https://res.cloudinary.com/dnvh2fya6/image/upload/v1710138718/majs-tech/canva103_lzp2xu.png)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) => (t.palette.mode = t.palette.grey[900]),
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={6} elevation={6} square>
        <Box className={classes.formBox}>
          <img
            className={classes.logo}
            src="https://res.cloudinary.com/dnvh2fya6/image/upload/v1709996741/majs-tech/footerlogo_r14blu.png"
            sx={{ m: 1, bgcolor: "secondary.main" }}
            alt=""
          />
          <Typography component="h1" variant="h5" className={classes.title}>
            Welcome to majs.tech!
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          ><form method="POST">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email Address"
              name="email"
              defaultValue={user.email}
              onChange={handleInputs}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              defaultValue={user.password}
              onChange={handleInputs}
              type="password"
              id="password"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Confirm Password"
              type="password"
              id="password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="agree"
                  color="primary"
                  required
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              }
              label={
                <Typography variant="body2" style={{ fontSize: "1rem" }}>
                  By clicking on Sign Up, you agree to our Terms & Conditions.
                </Typography>
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={MakeAPICall}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ mt: 5 }} /> */}
            </form></Box>
        </Box>
      </Grid>
    </Grid>
  );
}
