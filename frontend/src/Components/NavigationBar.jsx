import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const theme = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleTheme = () => {

  };

  const onLogout = () => {
    logout();
    navigate("/");
  };
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.bg_navigation.main,
        height: "100px",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xl" sx={{ alignItems: "center", padding: 0 }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "100px",
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            noWrap
            component="a"
            sx={{
              display: { xs: "flex", md: "flex" },
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: theme.logo_text_color.main,
              textDecoration: "none",
              flexGrow: 1,
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            Movie Explorer
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Tooltip title="Toggle Dark/Light Mode">
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{
                  backgroundColor: theme.button_color.main,
                  cursor: "pointer",
                }}
              >
                <Brightness4Icon />
              </IconButton>
            </Tooltip>

            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              color="inherit"
              sx={{
                backgroundColor: theme.button_color.main,
                cursor: "pointer",
              }}
              onClick={handleOpen}
            >
              <PersonOutlineOutlinedIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              sx={{
                mt: 1,
                "& .MuiPaper-root": {
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  backgroundColor: theme.button_color.main,
                  minWidth: 160,
                  cursor: "pointer",
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  onLogout();
                }}
                sx={{
                  py: 0.5,
                  px: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  cursor: "pointer",
                }}
              >
                <LogoutIcon
                  sx={{
                    fontSize: 20,
                    color: theme.text_color.text,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: theme.text_color.text,
                  }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavigationBar;
