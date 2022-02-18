/* eslint-disable */
import * as React from "react";

import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import { Button } from "@mui/material";

import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Kalam", "cursive"].join(","),
  },
});

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

export default function CategoryCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minHeight: 330 }}>
      {/* <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      /> */}
      <CardMedia
        component="img"
        height="194"
        image={props.category.category_image_url}
        alt={props.category.name}
      />
      <CardContent>
        <Link
          to={"/menu/" + props.category.category_id}
          className={classes.link}
        >
          <Button
            variant="text"
            fullWidth
            style={{ textTransform: "capitalize" }}
          >
            <ThemeProvider theme={theme}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  color: "#000000",
                  fontSize: 30,
                  width: "fit-content",
                  textAlign: "center",
                }}
              >
                {props.category.name}
              </Typography>
            </ThemeProvider>
          </Button>
        </Link>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions> */}
    </Card>
  );
}
