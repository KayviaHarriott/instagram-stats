import { useState } from "react";
import "./App.css";
import { CustomDropzone } from "./components/CustomDropzone";
import { Box, CircularProgress } from "@mui/material";
import { Instagram } from "@mui/icons-material";
import { DataComparisonOptions } from "./pages/DataComparisonOptions";
import { PendingFollowRequests } from "./components/PendingFollowRequests";

function App() {
  const [files, setFiles] = useState<File[]>([]); //to track uploaded files
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({}); //to track selected checkboxes
  const [loadingState, setLoadingState] = useState(false); //to track loaded state
  const [steps, setSteps] = useState(0); //to track steps
  const [matchingFiles, setMatchingFiles] = useState<File[]>([]); //to track matching files
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
      setMatchingFiles((prev) => [...prev, ...matchingFiles]); // Add matching files to the state
    });

    setLoadingState(true); // Set loading state to true
    setSteps(1); // Move to the next step

    // your matching logic here...
    setLoadingState(true);

    setTimeout(() => {
      setLoadingState(false);
    }, 5000);

    setSteps(1); // Move to the next step AFTER the 5-second delay
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

          {loadingState && (
            <Box className="h-[50vh] rounded-2xl w-full bg-gray-100 flex items-center justify-center">
              <CircularProgress />
            </Box>
          )}

          {/* Section 2: Data Comparison Options */}
          {steps == 0 && !loadingState ? (
            <div>
              <DataComparisonOptions
                options={dataComparisonOptions}
                onCheckboxChange={handleCheckboxChange}
                onSubmit={() => handleSubmission(files)}
                isLoading={loadingState}
                hasSelectedOptions={selectedLabels.length > 0}
              />
            </div>
          ) : null}

          {/* Section 3: Results */}

          {steps == 1 && !loadingState ? (
            <div>
              <h2 className="font-bold text-lg pb-2">Results</h2>
              {selectedLabels.map((label, index) => (
                <div key={index}>
                  {/* {label === "Followers/Following" ? (<p>follower/following</p>) : null}
                    {label === "Hide Story From" ? (<p>hide story</p>) : null} */}
                  {label === "Pending Follow Requests" ? (
                    <PendingFollowRequests file={matchingFiles} />
                  ) : null}
                  {/* {label === "Restricted Profiles" ? (<p>restricted profiles</p>) : null}                    */}
                </div>
              ))}

              {/* {console.log(selectedLabels)}
              {console.log(checkedItems)} */}
              {/* <p className="text-gray-500 text-sm pb-2"></p> */}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
