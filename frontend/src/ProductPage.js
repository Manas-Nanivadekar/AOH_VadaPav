import * as React from "react";
import {
  Container,
  Button,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AppAppBar from "./components/AppAppBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  formBox: {
    width: "100%",
    padding: "20px 20px 20px 20px",
    marginBottom: "20px",
    // background: "rgba( 176, 185, 232, 0.15 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    borderRadius: "10px",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
  },
  form: {
    width: "100%",
    maxHeight: "500px",
    borderRadius: "8px",
  },
  formItems: {
    width: "100%",
    margin: "20px",
    padding: "0px 35px 0px 30px",
    [theme.breakpoints.up("sm")]: {
      margin: "20px",
      padding: "0px 0px 0px 20px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "10px",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "40px 20px 0px 100px",
    },
    borderRadius: "8px",
  },
  formControl: {
    width: "100%",
    marginBottom: "20px",
  },
  dropdownContainer: {
    width: "90%",
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      padding: "40px 0px 0px 0px",
    },
    [theme.breakpoints.up("md")]: {
      padding: "10px",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "0px 0px 0px 40px",
    },
  },
  textFieldContainer: {
    width: "100%",
    marginTop: "20px",
  },

  textField: {
    width: "100%",
  },

  dropdown: {
    width: "100%",
  },
  button: {
    width: "100%",
  },
  cardItem: {
    padding: "20px",
  },
}));

export default function ProductPage() {
  const classes = useStyles();
  const [repoLink, setRepoLink] = React.useState("");
  const [projectName, setprojectName] = React.useState("");
  const [frontend, setFrontend] = React.useState("");
  const [backend, setBackend] = React.useState("");
  const [deploying, setDeploying] = React.useState(false);

  const handleDeploy = () => {
    // Your deployment logic goes here
    setDeploying(true);
    // Simulating deployment process with a timeout
    setTimeout(() => {
      setDeploying(false);
    }, 5000); // Change to actual deployment logic
  };

  return (
    <div className={classes.root}>
      <AppAppBar />

      
      
          <Grid
            container
            className={classes.form}
            center
            style={{ marginTop: "30px" }}
          >
            <Box
              
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { sm: "100%", md: "60%" },
                textAlign: { sm: "left", md: "left" },
              }}
            >
              <Typography component="h2" variant="h4">
                Let's build something new.
              </Typography>
              <Typography variant="body1" sx={{ color: "grey.400" }}>
                To deploy a new Project, paste the link of an existing Git
                Repository
              </Typography>
            </Box>
            
            <Grid
              container
              item
              xs={12}
              sm={6}
              className={classes.formItems}
              style={{ marginTop: "" }}
            >
              <Box className={classes.formBox}>
                <div className={classes.textFieldContainer}>
                  <TextField
                    className={classes.textField}
                    placeholder="Enter Project Name"
                    variant="outlined"
                    value={projectName}
                    onChange={(e) => setprojectName(e.target.value)}
                  />
                </div>

                <div className={classes.textFieldContainer}>
                  <TextField
                    className={classes.textField}
                    placeholder="GitHub Repository Link"
                    variant="outlined"
                    value={repoLink}
                    onChange={(e) => setRepoLink(e.target.value)}
                  />
                </div>
                <div className={classes.dropdownContainer}>
                  <Grid
                    item
                    xs={10}
                    sm={5}
                    variant="outlined"
                    className={classes.dropdown}
                    style={{ margin: "20px 0px 20px 10px" }}
                  >
                    <FormControl
                      variant="outlined"
                      className={classes.dropdown}
                    >
                      <InputLabel>Frontend</InputLabel>
                      <Select
                        value={frontend}
                        onChange={(e) => setFrontend(e.target.value)}
                        label="Frontend"
                        style={{ borderRadius: "17px" }}
                      >
                        <MenuItem value="HTML">HTML</MenuItem>
                        <MenuItem value="React">React</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    sm={5}
                    className={classes.dropdown}
                    style={{ margin: "20px 0px 20px 10px" }}
                  >
                    <FormControl
                      variant="outlined"
                      className={classes.dropdown}
                    >
                      <InputLabel>Backend</InputLabel>
                      <Select
                        value={backend}
                        onChange={(e) => setBackend(e.target.value)}
                        label="Backend"
                        style={{ borderRadius: "17px" }}
                      >
                        <MenuItem value="Javascript">Javascript</MenuItem>
                        <MenuItem value="Node.js">Node.js</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </div>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleDeploy}
                  disabled={!repoLink || deploying}
                >
                  {deploying ? (
                    <CircularProgress size={24} color="primary" />
                  ) : (
                    "Deploy"
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>

      {/* <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
          Let's build something new.
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
          To deploy a new Project, paste the link of an existing Git Repository
          </Typography>
        </Box> */}
    </div>
  );
}

{
  /* <Grid container item xs={12} sm={5} className={classes.formItems}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Steps to Deploy</Typography>
              <Typography variant="body1" className={classes.cardItem}>
                Step 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
              <Divider />
              <Typography variant="body1" className={classes.cardItem}>
                Step 2: Nulla nec mollis sapien. Integer at nunc eros.
              </Typography>
              <Divider />
              <Typography variant="body1" className={classes.cardItem}>
                Step 3: Vestibulum ante ipsum primis in faucibus orci luctus et
                ultrices posuere cubilia Curae; Morbi sagittis justo nec sapien
                vehicula volutpat.
              </Typography>
              
            </CardContent>
          </Card>
        </Grid> */
}
