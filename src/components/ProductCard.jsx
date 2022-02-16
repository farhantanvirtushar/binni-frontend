/* eslint-disable */
import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import { Button } from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

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

    localStorage.setItem("cart", JSON.stringify(temp_cart));
    updatePriceList();
  };

  const updatePriceList = () => {
    var saved_price_list = localStorage.getItem("priceList");

    if (!saved_price_list) {
      saved_price_list = {};
    } else {
      saved_price_list = JSON.parse(saved_price_list);
    }

    saved_price_list[props.product.product_id] = props.product.price;
    localStorage.setItem("priceList", JSON.stringify(saved_price_list));
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
          <pre>{props.product.description}</pre>
        </Typography>
        {/* {props.product.stock < 100 ? (
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
        )} */}
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
