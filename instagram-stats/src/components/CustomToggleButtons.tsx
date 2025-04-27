import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface CustomToggleButtonsProps {
  options: { label: string; description: string }[];
}

export const CustomToggleButtons: React.FC<CustomToggleButtonsProps> = ({
  options,
}) => {
  const [formats, setFormats] = React.useState(() => ["bold", "italic"]);

  const handleFormat = (
    _event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setFormats(newFormats);
  };

  return (
    <div>
      {" "}
      <ToggleButtonGroup
        value={formats}
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
                justifyContent: "flex-start", // 🧠 makes content left-aligned inside button
                textAlign: "left",
                textTransform: "none",
                flexDirection: "column", // 🧠 stack label and description vertically
                alignItems: "flex-start", // 🧠 align left instead of center
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
