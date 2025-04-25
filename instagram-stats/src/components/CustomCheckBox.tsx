import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

interface CustomCheckBoxProps {
  defaultChecked?: boolean; // optional default value
  onChange?: (checked: boolean) => void; // callback to parent
}

export const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  defaultChecked = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = React.useState(defaultChecked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue); // notify parent
    }
  };

  return (
    <Checkbox
      checked={isChecked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled checkbox' }}
    />
  );
};
