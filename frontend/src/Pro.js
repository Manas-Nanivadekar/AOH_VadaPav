import * as React from "react";
import { useState } from "react";
import { Container, Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AppAppBar from "./components/AppAppBar";
import { grey } from "@mui/material/colors";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CustomizedMenus, {handleSelect} from "./components/CustomizedMenus";

export default function MainPage() {
  const [showAccessKey, setShowAccessKey] = useState(true);
  const [showSecretKey, setShowSecretKey] = useState(true);
  const [showRepoLink, setShowRepoLink] = useState(true);
  const [showProjectName, setShowProjectName] = useState(true);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [selectedStack, setSelectedStack] = useState('');
  // setSelectedStack(handleSelect);

  const [project, setProject] = useState({
    accessKey: "",
    secretKey: "",
    repoLink: "",
    projectName: "",
  });
  console.log(selectedStack);
  // console.log(setSelectedStack);
  let key1, key2, name, value;

  const handleInputs = (e) => {
    console.log(e);
    key1 = e.target.key1;
    key2 = e.target.key2;
    name = e.target.name;
    value = e.target.value;

    setProject({ ...project, [e.target.id]: value });
    console.log(project.accessKey);
    console.log(project.secretKey);
    console.log(project.projectName);
    console.log(project.repoLink);
  };

  const MakeAPICall = async (e) => {
    e.preventDefault();
    const { accessKey, secretKey, repoLink, projectName } = project;
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setCompleted(true);
    //   // Add your deployment logic here
    // }, 18000);

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
    console.log("HYUVUIDLHBUYD");
    const payload = {
      accessKey: accessKey,
      secretKey: secretKey,
      repoLink: repoLink,
      projectName: projectName,
    };
    console.log(payload);
    console.log(selectedStack);
    // const res = await axios.post(
    //   "http://localhost:5000/deploy/destroy-static",
    //   payload
    // );
    // console.log(res);

    // const data = await res.json();
    // if ((data.status === 422 || !data)) {
    //   window.alert("INvalid Registration");
    //   console.log("INvalid Registration");
    // } else {

    // }

    let apiUrl;
    switch (selectedStack) {
      case 'static':
        apiUrl = "http://localhost:5000/deploy/static";
        break;
      case 'mern':
        apiUrl = "http://localhost:5000/deploy/mern";
        break;
      // case 'lamp':
      //   apiUrl = "http://localhost:5000/deploy/lamp";
      //   break;
      // Add more cases as needed
      default:
        apiUrl = "http://localhost:5000/deploy"; // Default or error handling
    }

    // Your existing API call logic, using apiUrl for the endpoint
    const res = await axios.post(apiUrl, payload);

    if (res.status == 200) {
      setCompleted(true);
      window.alert(" Deployment Successfull");
      console.log("Successfull Deployment");
    } else {
      window.alert("INvalid Deployment");
      console.log("INvalid Deployment");
    }
  };

  const handleNextClick = () => {
    setShowAccessKey(false);
    setShowSecretKey(false);
    setShowRepoLink(true);
    setShowProjectName(true);
  };

  const handleDeployClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCompleted(true);
      // Add your deployment logic here
    }, 18000);
  };

  const handleButtonClick = () => {
    // Add logic for the "Click here" button
  };

  return (
    <>
      <AppAppBar />
      <Box
        id="hero"
        sx={(theme) => ({
          width: "100%",
          backgroundImage:
            theme.palette.mode === "light"
              ? "linear-gradient(#CEE5FD)"
              : `linear-gradient(#0D0D0D)`,
          backgroundSize: "100% 20%",
          backgroundRepeat: "no-repeat",
        })}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
            border: "",
          }}
        >
          <Stack
            spacing={3}
            useFlexGap
            sx={{ width: { xs: "90%", sm: "90%" } }}
          >
            <Typography
              component="h2"
              variant="h1"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignSelf: "center",
                textAlign: "center",
              }}
            >
              Let's deploy something extraordinary.
              <Typography
                component="span"
                variant="h1"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "primary.main"
                      : "primary.light",
                }}
              ></Typography>
            </Typography>
            {/* <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
            >
              Paste the link of an existing git repo
            </Typography> */}
            <Stack
              direction={{ xs: "column", sm: "column" }}
              alignSelf="center"
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
            >
              {showAccessKey && (
                <>
                  <TextField
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    aria-label=""
                    id="accessKey"
                    placeholder="Your access key here"
                    onChange={handleInputs}
                    inputProps={{
                      autoComplete: "off",
                      ariaLabel: "Access Key",
                    }}
                  />
                </>
              )}

              {showSecretKey && (
                <>
                  <TextField
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    aria-label=""
                    id="secretKey"
                    placeholder="Your secret key here"
                    onChange={handleInputs}
                    inputProps={{
                      autoComplete: "off",
                      ariaLabel: "Secret Key",
                    }}
                  />
                </>
              )}

              {showRepoLink && (
                <>
                  <TextField
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    aria-label=""
                    id="repoLink"
                    placeholder="Your repo link here"
                    onChange={handleInputs}
                    inputProps={{
                      autoComplete: "off",
                      ariaLabel: "Repo Link",
                    }}
                  />
                </>
              )}

              {showProjectName && (
                <>
                  <TextField
                    id="projectName"
                    hiddenLabel
                    size="small"
                    variant="outlined"
                    aria-label=""
                    placeholder="Your project name here"
                    onChange={handleInputs}
                    inputProps={{
                      autoComplete: "off",
                      ariaLabel: "Project Name",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CustomizedMenus onSelect={setSelectedStack}/>                  
                    </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={MakeAPICall}
                    disabled={loading}
                  >
                    {loading ? "Deploying..." : "Deploy"}
                  </Button>
                </>
              )}

              {completed && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={MakeAPICall}
                    href={""}
                  >
                    Click here
                  </Button>
                </div>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
