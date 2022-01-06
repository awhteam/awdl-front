// IMPORTING APIS
import React from "react";
import {
  AppBar,
  Toolbar,
  Divider,
  Drawer,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

// IMPORTING ICONS
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

//Local
import { useMobile } from "../../utils/detectSource";
import "./style.scss";
import Logo from "./Logo";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { fa_genres } from "../../utils/translations";

const Navbar = () => {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
    },
    typography: {
      fontFamily: "iranyekan, Arial",
    },
  });

  const NavbarItems = [
    {
      label: "خانه",
      props: { component: Link, to: "/" },
    },
    {
      label: "ژانر ها",
      props: { endIcon: <ExpandMore /> },
    },
    {
      label: "سریالی ها",
      props: { component: Link, to: "anime/series" },
    },
    {
      label: "سینمایی ها",
      props: { component: Link, to: "anime/movies" },
    },
  ];
  const DesktopNavbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    NavbarItems[1] = {
      label: "ژانر ها",
      props: {
        onClick: handleClick,
        endIcon: open ? <ExpandLess /> : <ExpandMore />,
      },
    };
    return (
      <div>
        <AppBar style={{ backgroundColor: "#fff" }}>
          <Toolbar dir="rtl" className="desktop_navbar__logo">
            <Logo />
            <div style={{ marginRight: "2rem" }}>
              {NavbarItems.map((item, i) => (
                <Button key={i} {...item.props}>
                  <span style={{ marginRight: "5px" }}>{item.label}</span>
                </Button>
              ))}
            </div>
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className="navbar-genres"
          disableScrollLock={true}
        >
          {Object.entries(fa_genres).map(([id, genre], i) => (
            <MenuItem
              dir="rtl"
              component={Link}
              to={`/anime/genre/${id}/${genre["en"]}`}
            >
              {genre["fa"]}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  };

  const drawerWidth = 240;
  const MobileAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const MobileNavbar = () => {
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    NavbarItems[1] = {
      label: "ژانر ها",
      props: {
        onClick: handleClick,
        endIcon: Boolean(anchorEl) ? <ExpandLess /> : <ExpandMore />,
      },
    };
    return (
      <div>
        <MobileAppBar style={{ backgroundColor: "#fff" }} open={open}>
          <Toolbar dir="rtl">
            <Logo />
            <div style={{ marginRight: "auto" }}>
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </MobileAppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="temporary"
          onEscapeKeyDown={handleDrawerClose}
          onBackdropClick={handleDrawerClose}
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          {NavbarItems.map((item, i) => (
            <Button
              style={{
                width: "100%",
                justifyContent: "flex-end",
                padding: "16px",
              }}
              key={i}
              {...item.props}
            >
              <span style={{ marginRight: "5px" }}>{item.label}</span>
            </Button>
          ))}
        </Drawer>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          className="navbar-genres mobile"
          disableScrollLock={true}
        >
          {Object.entries(fa_genres).map(([id, genre], i) => (
            <MenuItem
              dir="rtl"
              sx={{ width: "100%" }}
              component={Link}
              to={`/anime/genre/${id}/${genre["en"]}`}
            >
              {genre["fa"]}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  };

  return (
    <div className="Navbar">
      <ThemeProvider theme={customTheme}>
        {useMobile() ? <MobileNavbar /> : <DesktopNavbar />}
      </ThemeProvider>
    </div>
  );
};

export default Navbar;
