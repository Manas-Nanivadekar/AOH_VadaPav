import * as React from "react";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


const cloudStyle = {
  height: "80%",
  border: "1px solid",
  borderRadius: "10px",
};

export default function Secondary() {
  return (
    <Box
      id="hero"
      sx={
        (theme) => ({
        width: "100%",
        marginTop:"-150px",
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
        }}
      >
        <Grid
          container
          spacing={2}
          columns={16}
          sx={(theme) => ({
            mt: { xs: 8, sm: 15 },
            alignSelf: "center",
            height: { xs: 200, sm: 500 },
            width: "100%",
            backgroundSize: "cover",
            borderRadius: "10px",
            outline: "1px solid",
            outlineColor:
              theme.palette.mode === "light"
                ? alpha("#BFCCD9", 0.5)
                : alpha("#9CCCFC", 0.1),
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
          })}
        >
          <Grid xs={8} sx={{ padding: 7 }}>
            <Stack>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "150px" }}
              >
                Cloud Copilot
              </Button>
              <Typography
                component="span"
                variant="h3"
                sx={{
                  paddingTop: 3,
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "primary.main"
                      : "primary.light",
                }}
              >
                Streamline Your Development Workflow!
              </Typography>
              <Typography
                component="span"
                variant="subtitle2"
                sx={{
                  paddingTop: 2,
                  textAlign: { sm: "left", md: "left" },
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "primary.main"
                      : "primary.light",
                }}
              >
                Simplify your development process with TerraForge! Our intuitive platform is designed to enhance productivity for developers of all levels. Say farewell to cumbersome setups; input your project specifics, select your preferred cloud provider, and initiate deployment with ease. 
              </Typography>
            </Stack>
          </Grid>

          <Grid
            xs={7}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://res.cloudinary.com/dnvh2fya6/image/upload/v1710223021/majs-tech/cloud2_l8auwk.png"
              alt="#"
              style={cloudStyle}
            ></img>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          columns={16}
          sx={(theme) => ({
            mt: { xs: 8, sm: 15 },
            alignSelf: "center",
            height: { xs: 200, sm: 500 },
            width: "100%",
            backgroundSize: "cover",
            borderRadius: "10px",
            outline: "1px solid",
            outlineColor:
              theme.palette.mode === "light"
                ? alpha("#BFCCD9", 0.5)
                : alpha("#9CCCFC", 0.1),
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
          })}
        >
          <Grid
            xs={7}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://res.cloudinary.com/dnvh2fya6/image/upload/v1710223024/majs-tech/cloud_v6ayok.png"
              alt="#"
              style={cloudStyle}
            ></img>
          </Grid>

          <Grid xs={8} sx={{ padding: 7 }}>
            <Stack>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "150px", marginLeft: "auto" }}
              >
                Easy Deployment
              </Button>
              <Typography
                component="span"
                variant="h3"
                sx={{
                  paddingTop: 3,
                  textAlign: "right",
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "primary.main"
                      : "primary.light",
                }}
              >
                Effortless Deployment in a Few Clicks!
              </Typography>
              <Typography
                component="span"
                variant="subtitle2"
                sx={{
                  paddingTop: 2,
                  textAlign: "right",
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "primary.main"
                      : "primary.light",
                }}
              >
                Experience seamless project deployment with TerraForge! Our user-friendly interface caters to all developers. Say goodbye to complex setups; input your project details, choose your cloud provider, and click 'Deploy.' Turn your ideas into reality with TerraForge!
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
