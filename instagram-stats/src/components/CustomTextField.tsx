import { TextField } from "@mui/material";

interface CustomTextFieldProps {
  label: string;
  value: string; // This allows you to pass the value of the input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // This allows you to update the value in the parent component
}

export const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <TextField
      label={label}
      value={value} // Bind the value to the parent state
      onChange={onChange} // Call the parent's onChange handler
      sx={{ width: "100%" }}
      slotProps={{ inputLabel: { shrink: true } }}
    />
  );
};
