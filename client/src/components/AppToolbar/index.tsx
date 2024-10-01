// ===== Material UI ===== //
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
  Button,
  Stack,
} from "@mui/material";

// ===== Components ===== //

// ===== Constants ===== //

// ===== Helpers ===== //
import { generateAvatarName } from "./helpers";

// ===== Interfaces ===== //

// ===== React Router ===== //
import { useNavigate } from "react-router-dom";

// ===== Redux ===== //
import { useAppSelector } from "redux/hooks";

// ===== Styles ===== //

export default function AppToolbar() {
  const navigate = useNavigate();

  const { isLoggedIn, user } = useAppSelector((state) => state.user);
  const { firstName, lastName } = user;

  const avatarText = generateAvatarName(firstName, lastName);

  const handleNavigation = (path = "/") => {
    if (path === "settings" && !isLoggedIn) {
      return;
    }

    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar data-testid="app-toolbar" position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#87A878",
          }}
        >
          <Typography
            data-testid="app-toolbar-title"
            variant="h6"
            onClick={() => handleNavigation()}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            ResFrac Kev L
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              data-testid="app-toolbar-settings-btn"
              color="inherit"
              variant="outlined"
              onClick={() => handleNavigation("settings")}
            >
              Settings
            </Button>

            <Button
              data-testid="app-toolbar-login-btn"
              color="inherit"
              variant="outlined"
              onClick={() => handleNavigation("login")}
            >
              Login
            </Button>

            {isLoggedIn && avatarText ? (
              <Avatar
                data-testid="avatar-content"
                variant="square"
                sx={{ backgroundColor: "#7e57c2" }}
              >
                {avatarText}
              </Avatar>
            ) : null}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
