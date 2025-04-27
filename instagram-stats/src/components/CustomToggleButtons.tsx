import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState

 } from "react";
interface CustomToggleButtonsProps {
  options: { label: string; description: string }[];
  onCheckboxChange: (label: string, isChecked: boolean) => void; // <-- accept the callback!

}

export const CustomToggleButtons: React.FC<CustomToggleButtonsProps> = ({
  options,
  onCheckboxChange
}) => {
  // const [formats, setFormats] = React.useState(() => ["bold", "italic"]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const handleFormat = (
    _event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    // setFormats(newFormats);
    // Figure out what changed
    const added = newFormats.filter(x => !selectedLabels.includes(x));
    const removed = selectedLabels.filter(x => !newFormats.includes(x));

    // Notify parent for each change
    added.forEach(label => onCheckboxChange(label, true));
    removed.forEach(label => onCheckboxChange(label, false));

    // Update local state
    setSelectedLabels(newFormats);
  };

  return (
    <div>
      <ToggleButtonGroup
        value={selectedLabels}
        onChange={handleFormat}
        aria-label="text formatting"
        className="flex flex-col gap-2"
      >
      <div className="flex flex-col gap-2">
        {options.map((option, index) => (
          <ToggleButton
            key={index}
            value={option.label}
            aria-label={option.label}
            // disabled
            sx={{
                justifyContent: "flex-start", 
                textAlign: "left",
                textTransform: "none",
                flexDirection: "column", 
                alignItems: "flex-start",
                width: "100%",
              }}
          >
            <div>
            <h4 className="font-bold text-md text-black">{option.label}</h4>
            <p className="text-gray-500 text-sm">{option.description}</p>
           </div>
          </ToggleButton>
        ))}
      </div>
      </ToggleButtonGroup>
    </div>
  );
};
