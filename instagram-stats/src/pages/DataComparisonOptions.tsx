import { Button, CircularProgress } from "@mui/material";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import { MiniCardProps } from "../components/MiniCard";
import { CustomCheckBox } from "../components/CustomCheckBox";

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
}

export const DataComparisonOptions = ({
  options,
  onCheckboxChange,
  onSubmit,
  isLoading = false,
  hasSelectedOptions = false,
}: DataComparisonOptionsProps) => {
  return (
    <div>
      <h2 className="font-bold text-lg">Data Comparison Options</h2>
      <p className="text-gray-500 text-sm pb-2">
        Select which data comparisons you'd like to analyze:
      </p>

      <div className="flex flex-wrap col-span-2">
        {options.map((option, index) =>
          option.label != "Pending Follow Requests" &&
          option.label != "Hide Story From" &&
          option.label != "Restricted Profiles" &&
          option.label != "Followers/Following" ? (
            <div
              key={index}
              className="w-1/2 h-auto p-2 opacity-50 pointer-events-none"
            >
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
          ) : (
            <div key={index} className="w-1/2 h-auto p-2">
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
          disabled={isLoading || !hasSelectedOptions}
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
