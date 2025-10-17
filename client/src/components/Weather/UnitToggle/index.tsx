// ===== Material UI ===== //
import {
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

// ===== Components ===== //

// ===== Constants ===== //

// ===== Helpers ===== //

// ===== Interfaces ===== //

// ===== Redux ===== //

// ===== Styles ===== //

export default function UnitToggle({
  unit,
  handleSetUnit,
}: {
  unit: string;
  handleSetUnit: (
    _evt: React.MouseEvent<HTMLElement>,
    _newUnit: string
  ) => void;
}) {
  return (
    <ToggleButtonGroup
      data-testid="unit-toggle-btn-group"
      value={unit}
      exclusive
      onChange={handleSetUnit}
      aria-label="unit selection"
      sx={{ mt: 1 }}
      color="success"
    >
      <ToggleButton unit="celsius" value="m" />

      <ToggleButton unit="fahrenheit" value="f" />
    </ToggleButtonGroup>
  );
}

function ToggleButton({ unit, value }: { unit: string; value: string }) {
  return (
    <MuiToggleButton
      data-testid={`unit-${unit}-btn`}
      value={value}
      aria-label={`${unit} button select`}
      size="small"
    >
      {unit}
    </MuiToggleButton>
  );
}