/* eslint-disable */
import React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { ListItemButton } from "@mui/material";

import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
    },
  },

  listItem: {
    borderRadius: "1em",
  },

  listItemDone: {
    borderRadius: "1em",
    backgroundColor: "#e3d1ff !important",
    color: "#6600FF !important",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

const items = ["Dashboard", "Categories", "Products", "Orders"];
const itemUrl = ["/dashboard", "/categories", "/products", "/orders"];
const itemIcons = [
  <QueryStatsIcon />,
  <CategoryIcon />,
  <FastfoodIcon />,
  <LocalMallIcon />,
];

export default function Sidebar(props) {
  const classes = useStyles();
  const history = useHistory();

  const { open } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleNav = (path) => {
    history.push("/admin" + path);
  };
  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        border: "none",
      }}
    >
      <Toolbar />
      <List>
        {items.map((text, index) => (
          <Link to={"/admin" + itemUrl[index]} className={classes.link}>
            <ListItemButton
              key={text}
              className={
                selectedIndex === index
                  ? classes.listItemDone
                  : classes.listItem
              }
              selected={selectedIndex === index}
              onClick={(event) => {
                handleListItemClick(event, index);
              }}
            >
              <ListItemIcon>{itemIcons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
