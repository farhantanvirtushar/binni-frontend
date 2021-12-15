/* eslint-disable */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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
  title: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function ProductCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const addItemToCart = () => {
    var product_id = props.id;

    var temp_cart = { ...props.cart };
    temp_cart[product_id] = 1;

    props.setCart(temp_cart);
  };

  return (
    <Card sx={{ minHeight: 330 }}>
      <CardMedia
        component="img"
        height="194"
        image={props.product.image_url}
        alt={props.product.title}
      />
      <CardContent>
        <div className={classes.title}>
          <ThemeProvider theme={theme}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                color: "#000000",
                fontSize: 30,
                minHeight: 70,
                width: "fit-content",
                textAlign: "center",
              }}
            >
              {props.product.title}
            </Typography>
          </ThemeProvider>
        </div>

        <Typography
          variant="caption"
          display="block"
          sx={{
            color: "#000000",
            minHeight: 100,
          }}
        >
          {props.product.description}
        </Typography>
        {props.product.stock < 100 ? (
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "#000000",
            }}
          >
            Stock : {props.product.stock}
          </Typography>
        ) : (
          <div></div>
        )}
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: "#000000",
          }}
        >
          Price : <b> {props.product.price}</b> BDT /{props.product.unit}
        </Typography>
        <Button
          variant="contained"
          color="error"
          fullWidth
          endIcon={<AddShoppingCartIcon />}
          onClick={addItemToCart}
        >
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
}
