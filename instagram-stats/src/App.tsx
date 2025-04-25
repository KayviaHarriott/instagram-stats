import { useState } from "react";
import "./App.css";
import { MiniCardProps } from "./components/MiniCard";
import { CustomDropzone } from "./components/CustomDropzone";
// import { Button } from '@mui/material'
import { CustomCheckBox } from "./components/CustomCheckBox";
import { Button, CircularProgress } from "@mui/material";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import { Instagram } from "@mui/icons-material";

function App() {
  const [files, setFiles] = useState<File[]>([]); //to track uploaded files
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({}); //to track selected checkboxes
  const [loadingState, setLoadingState] = useState(false); //to track loaded state

  //Extract selected labels based on checked items
  const selectedLabels = Object.entries(checkedItems)
    .filter(([, isChecked]) => isChecked)
    .map(([label]) => label);

  //Data Comparisons to check file types
  const dataComparisonOptions = [
    {
      label: "Followers/Following",
      description:
        "Compare your followers list with your following list to see who doesn't follow you back",
    },
    {
      label: "Hide Story From",
      description: "See which accounts you've chosen to hide your stories from",
    },
    {
      label: "Pending Follow Requests",
      description: "View accounts that haven't accepted your follow requests",
    },
    {
      label: "Restricted Profiles",
      description: "See which accounts you've restricted on Instagram",
    },
  ];

  //Handle file selection from the dropzone
  const handleFiles = (files: File[]) => {
    setFiles(files);
  };

  // Handle changes in the checkboxes
  const handleCheckboxChange = (label: string, isChecked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [label]: isChecked,
    }));
  };

  // Handle form submission
  const handleSubmission = (files: File | File[]): void => {
    const fileArray = Array.isArray(files) ? files : [files]; //Ensure 'files' is always treated as an array
    const labelToFileMap: Record<string, string[]> = {
      "Followers/Following": ["followers_1.json", "following.json"],
      "Hide Story From": ["hide_story_from.json"],
      "Pending Follow Requests": ["pending_follow_requests.json"],
      "Restricted Profiles": ["restricted_profiles.json"],
    }; // Define a mapping from selected labels to corresponding file name patterns

    // Loop through the selectedLabels
    selectedLabels.forEach((label) => {
      const filePatterns = labelToFileMap[label] || [];
      const matchingFiles = fileArray.filter((file) =>
        filePatterns.some((pattern) =>
          file.name.toLowerCase().includes(pattern.toLowerCase())
        )
      );
      console.log(`Files matching label "${label}":`, matchingFiles);
    });
  };

  return (
    <>
      <div className="flex w-full justify-center pt-2">
        <div className="flex flex-col gap-6 max-w-[800px] w-full">
          {/* Section 1: Instagram Data Viewer*/}
          <div>
            <div className="flex gap-1">
              <Instagram />
              <h2 className="font-bold text-lg pb-2">Instagram Data Viewer</h2>
            </div>
            <CustomDropzone onFilesSelected={handleFiles} />
          </div>

          {loadingState && <CircularProgress />}
          {/* Section 2: Data Comparison Options */}
          <div>
            <h2 className="font-bold text-lg">Data Comparison Options</h2>
            <p className="text-gray-500 text-sm pb-2">
              Select which data comparisons you'd like to analyze:
            </p>

            <div className="flex flex-wrap col-span-2">
              {dataComparisonOptions.map((option, index) => (
                <div key={index} className="w-1/2 h-auto p-2">
                  <MiniCardProps
                    key={index}
                    title={option.label}
                    description={option.description}
                    checkboxArea={
                      <CustomCheckBox
                        defaultChecked={false}
                        onChange={(isChecked) =>
                          handleCheckboxChange(option.label, isChecked)
                        }
                      />
                    }
                  />{" "}
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <Button
                variant="contained"
                color="primary"
                sx={{ boxShadow: "none", gap: 1, backgroundColor: "black" }}
                onClick={() => handleSubmission(files)}
              >
                <StackedBarChartIcon />
                <p>Analyze Data</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
