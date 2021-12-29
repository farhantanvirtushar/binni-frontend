/* eslint-disable */
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { getUser } from "../User";
import { Container } from "@material-ui/core";
import Cookies from "js-cookie";

import Grid from "@mui/material/Grid";

import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import CateringMenuDetails from "../components/CateringMenuDetails";

var pjson = require("../../package.json");
const serverAddress = pjson.proxy;

const theme = createTheme({
  typography: {
    fontFamily: ["Kalam", "cursive"].join(","),
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  grid: {
    alignItems: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
export default function Caterings() {
  const classes = useStyles();

  const [caterings, setCaterings] = useState([]);

  const [activeStep, setActiveStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  var csrftoken = Cookies.get("csrftoken");
  let config = {
    headers: {
      "X-CSRFToken": csrftoken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const user = getUser();

  const getCaterings = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACK_END_URL + "/api/caterings/",
        config
      );

      if (res) {
        setCaterings(res.data);
        setMaxSteps(res.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCaterings();
  }, []);
  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <ThemeProvider theme={theme}>
            <Typography
              variant="h3"
              component="div"
              sx={{
                marginTop: 5,
                marginBottom: 5,
                color: "#000000",
              }}
            >
              Catering Menu
            </Typography>
          </ThemeProvider>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {caterings.map((catering) => (
              <div key={catering.catering_id}>
                <CateringMenuDetails catering={catering} />
              </div>
            ))}
          </SwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
          <Typography
            variant="body1"
            sx={{
              marginTop: 5,
              marginBottom: 5,
              color: "#000000",
            }}
          >
            Call : +8801813262561
          </Typography>
        </div>
      </Container>
    </div>
  );
}
