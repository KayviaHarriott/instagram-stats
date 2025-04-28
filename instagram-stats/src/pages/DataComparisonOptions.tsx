import { Button, CircularProgress } from "@mui/material";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import { MiniCardProps } from "../components/MiniCard";
import { CustomCheckBox } from "../components/CustomCheckBox";
import { CustomToggleButtons } from "../components/CustomToggleButtons";

interface DataComparisonOption {
  label: string;
  description: string;
}

interface DataComparisonOptionsProps {
  options: DataComparisonOption[];
  onCheckboxChange: (label: string, isChecked: boolean) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  hasSelectedOptions?: boolean;
  fileUploaded: boolean;
}

export const DataComparisonOptions = ({
  options,
  onCheckboxChange,
  onSubmit,
  isLoading = false,
  hasSelectedOptions = false,
  fileUploaded = false,
}: DataComparisonOptionsProps) => {
  return (
    <div className="flex flex-col gap-4 pt-3 pb-4 px-4 bg-white rounded-2xl">
      <div className="flex flex-col">
        <h2 className="text-lg font-bold text-gray-700">
          Data Comparison Options
        </h2>
        <p className="text-gray-500 text-sm">
          Select which data comparisons you'd like to analyze:
        </p>
      </div>

      <div className="md:hidden">
        <CustomToggleButtons options={options} onCheckboxChange={onCheckboxChange} />
      </div>
      {/* <div className="flex w-full flex-row flex-wrap col-span-2"> */}
      <div className="md:flex col-span-2 flex-wrap hidden">
        {options.map(
          (option, index) => (
            <div key={index} className="md:w-1/2 h-auto p-2">
              <MiniCardProps
                title={option.label}
                description={option.description}
                checkboxArea={
                  <CustomCheckBox
                    defaultChecked={false}
                    onChange={(isChecked) =>
                      onCheckboxChange(option.label, isChecked)
                    }
                  />
                }
              />
            </div>
          )
        )}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          variant="contained"
          color="primary"
          sx={{ boxShadow: "none", gap: 1, backgroundColor: "black" }}
          onClick={onSubmit}
          disabled={isLoading || !(hasSelectedOptions && fileUploaded)}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <>
              <StackedBarChartIcon />
              <p>Analyze Data</p>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
