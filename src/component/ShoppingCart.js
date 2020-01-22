import React, { useContext, useEffect } from "react";
import { dbLink } from "../App";
import clsx from "clsx";
import "./Card.css";
import "./ShoppingCart.css";
import {
  makeStyles,
  useTheme,
  Drawer,
  Toolbar,
  Button,
  AppBar,
  List,
  Typography,
  IconButton,
  Divider,
  CssBaseline
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  paper: {
    background: "white"
  },
  appBar: {
    background: "white",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  },
  toolbarButtons: {
    marginLeft: "auto"
  }
}));

const ShoppingCart = ({ inventory, setInventory, user }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { shoppingCart, setShoppingCart, open, setOpen } = useContext(
    ShoppingCartContext
  );

  useEffect(() => {
    if (user && shoppingCart) {
      dbLink
        .ref("carts/" + user.uid)
        .once("value")
        .then(function(snapshot) {
          setShoppingCart([...shoppingCart, ...snapshot.val()]);
        });
    }
  }, [user]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDelete = product => {
    const newShoppingCart = shoppingCart.filter(item => product.id !== item.id);
    if (user) {
      dbLink.ref("carts/" + user.uid).set(newShoppingCart);
    }
    setShoppingCart(newShoppingCart);

    //update Inventory
    const copiedInventory = Object.assign({}, inventory);
    copiedInventory[product.sku][product.size]++;
    setInventory(copiedInventory);
  };

  const CartItem = ({ product }) => {
    return (
      <li className="card-container">
        <IconButton
          className={classes.toolbarButtons}
          onClick={() => handleDelete(product)}
        >
          X
        </IconButton>
        <img src={`data/products/${product.sku}_2.jpg`} alt="" />
        <p>{product.title}</p>
        <p>{`$${product.price}`}</p>
        <p>Size: {product.size}</p>
      </li>
    );
  };

  const handleCheckout = () => {
    // NEED TO REVIEW
    dbLink.ref().set(inventory);
    // Empty ShoppingCart
    setShoppingCart([]);
    alert("Successfully Bought!");
  };

  const CheckOut = () => {
    return shoppingCart.length >= 1 ? (
      <div className="checkout-button">
        <List>Subtotal: ${shoppingCart.reduce((a, b) => a + b.price, 0)}</List>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    ) : null;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title} />
          <IconButton
            color="default"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {shoppingCart.map(product => (
          <List key={`${product.id}`}>
            <CartItem
              product={product}
              inventory={inventory}
              setInventory={setInventory}
            />
          </List>
        ))}
        <Divider />
        <CheckOut shoppingCart={shoppingCart} />
      </Drawer>
    </div>
  );
};

export default ShoppingCart;
