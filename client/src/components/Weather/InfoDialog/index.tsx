import React from "react";

// ===== Material UI ===== //
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Slide,
  Divider,
  Stack,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";

// ===== Components ===== //

// ===== Constants ===== //

// ===== Helpers ===== //

// ===== Interfaces ===== //
import { WeatherStackApiResponse } from "redux/slices/settings/interfaces";

// ===== Redux ===== //
import { useAppSelector } from "redux/hooks";

// ===== Styles ===== //
import { flexCenter } from "styles/index";
import { DEFAULT_BG_COLOR } from "styles/themes";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InfoDialog({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const { weatherInfo } = useAppSelector((state) => state.settings);

  if (!weatherInfo) {
    return null;
  }

  const { location } = weatherInfo as WeatherStackApiResponse;
  const { name, country } = location;

  return (
    <Dialog
      data-testid="weather-info-dialog"
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar data-testid="weather-info-toolbar" sx={{ position: "relative" }}>
        <Toolbar sx={{ backgroundColor: DEFAULT_BG_COLOR, width: "100%" }}>
          <IconButton
            data-testid="weather-info-dialog-close-btn"
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Typography
            data-testid="weather-info-name-country"
            sx={{ ml: 2, flex: 1 }}
            variant="h6"
            component="div"
          >
            {name}, {country}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          ...flexCenter,
          width: "100%",
          height: "100%",
        }}
      >
        <Card
          data-testid="weather-dialog-info-card"
          sx={{ height: 250, width: 500 }}
        >
          <CardHeader
            data-testid="weather-dialog-info-card-header"
            title={
              <Stack direction="row" spacing={2}>
                <Box
                  component="img"
                  src={`${weatherInfo?.current?.weather_icons[0]}`}
                  alt={`${weatherInfo?.current.weather_descriptions[0]} icon`}
                  loading="lazy"
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                />

                <Typography data-testid="weather-info-description" variant="h5">
                  {weatherInfo?.current?.weather_descriptions[0]}
                </Typography>
              </Stack>
            }
            subheader={weatherInfo?.location?.localtime}
          />

          <Divider />

          <CardContent>
            <Typography data-testid="weather-info-temperature">
              Temperature: {weatherInfo?.current?.temperature}&deg; degrees
            </Typography>

            <Typography data-testid="weather-info-feels-like">
              Feels Like: {weatherInfo?.current?.temperature}&deg; degrees
            </Typography>

            <Typography data-testid="weather-info-humidity">
              Humidity: {weatherInfo?.current?.humidity}%
            </Typography>

            <Typography data-testid="weather-info-wind-speed">
              Wind: {weatherInfo?.current?.wind_speed}{" "}
              {weatherInfo?.current?.wind_dir}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Dialog>
  );
}
