/* eslint-disable */
import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import binni from "../assets/images/binni.jpg";
import resturant from "../assets/images/resturant.jpg";
import delivery from "../assets/images/delivery.jpg";
import catering from "../assets/images/catering.jpg";

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
    justifyContent: "center",
    padding: 15,
  },
  row: {
    margin: 25,
  },
  titlle: {
    marginBottom: 25,
  },
}));

export default function About() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.row}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <img src={binni} width="100%" />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.paper}>
              <div className={classes.titlle}>
                <Typography variant="h2" component="div">
                  About Us
                </Typography>
              </div>

              <Typography variant="subtitle1">
                We are taking Reservation for Event, Birthday Party , Marriage
                Anniversary , Weeding , Corporate Events . We provide your
                perfect wedding ,birthday & event day. We provide Event
                Management & Wedding Planners offer a highly creative , friendly
                & Professional service to Bangladesh.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.row}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={7}>
            <div className={classes.paper}>
              <div className={classes.titlle}>
                <Typography variant="h2" component="div">
                  Why Us
                </Typography>
              </div>

              <Typography variant="subtitle1">
                <ul>
                  <li>Your one stop shop for designer weddings.</li>
                  <li>Uniqueness to your wedding event.</li>
                  <li>
                    Strong network to offer you various specialties from
                    different cities of Bangladesh.
                  </li>
                  <li>Designer touch to enhance the ambiance.</li>
                  <li>Highly cost effective.</li>
                  <li>
                    We help you to figure out the best service providers of your
                    town.
                  </li>
                  <li>High professionalism and dedication.</li>
                  <li>
                    Covering every aspect of wedding and giving a symmetric
                    touch to it.
                  </li>
                  <li>
                    Our development department gives new concepts and designs.
                  </li>
                  <li>Hassle free Wedding.</li>
                </ul>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
            <img src={resturant} width="100%" />
          </Grid>
        </Grid>
      </div>
      <div className={classes.row}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={7}>
            <img src={delivery} width="100%" />
          </Grid>
          <Grid item xs={12} md={5}>
            <div className={classes.paper}>
              <div className={classes.titlle}>
                <Typography variant="h2" component="div">
                  Services
                </Typography>
              </div>

              <Typography variant="subtitle1">
                <ul>
                  <li>Home Delivery</li>
                  <li>Take Away</li>
                  <li>Dine In</li>
                  <li>Catering</li>
                </ul>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.row}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={5}>
            <div className={classes.paper}>
              <div className={classes.titlle}>
                <Typography variant="h2" component="div">
                  Caterings
                </Typography>
              </div>

              <Typography variant="subtitle1">
                <ul>
                  <li>Weeding Party</li>
                  <li>Birthday Party</li>
                  <li>Anniversary Party</li>
                  <li>Family Get Together Parties</li>
                  <li>Office Parties</li>
                  <li>Outdoor Catering</li>
                  <li>Get Together Parties</li>
                  <li>Event Catering</li>
                  <li>Reception Party</li>
                  <li>Lunches</li>
                  <li>Celebrations Party</li>
                </ul>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={7}>
            <img src={catering} width="100%" />
          </Grid>
        </Grid>
      </div>
      <div className={classes.row}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.047281812456!2d90.41511171469497!3d23.781330584574185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7994d5e6e31%3A0x4d9b3192d0f5ef4b!2z4Kas4Ka_4Kao4KeN4Kao4Ka_IOCmsOCnh-CmuOCnjeCmn-CngeCmsOCnh-CmqOCnjeCmnw!5e0!3m2!1sen!2sbd!4v1641331072733!5m2!1sen!2sbd"
          width="100%"
          height="450"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
