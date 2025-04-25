import { useState } from "react";
import "./App.css";
import { MiniCardProps } from "./components/MiniCard";
import { CustomDropzone } from "./components/CustomDropzone";
// import { Button } from '@mui/material'
import { CustomCheckBox } from "./components/CustomCheckBox";
import { Button } from "@mui/material";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import { Instagram } from "@mui/icons-material";

function App() {
  // // const [count, setCount] = useState(0)
  const [files, setFiles] = useState<File[]>([]);
  // const [options, setOptions] = useState<string[]>([]);

  // // Moved `useState` for checked items to the top level
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // const items = ['Instagram', 'Facebook', 'TikTok', 'X (Twitter)'];

  const handleFiles = (files: File[]) => {
    setFiles(files);
    console.log("Received files:", files);
  };

  // Handle changes in the checkboxes
  const handleCheckboxChange = (label: string, isChecked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [label]: isChecked,
    }));
  };

  const selectedLabels = Object.entries(checkedItems)
    .filter(([, isChecked]) => isChecked)
    .map(([label]) => label);

  // // Get all the selected (checked) items
  // const getSelectedItems = () => {
  //   return Object.keys(checkedItems).filter((key) => checkedItems[key]);
  // };

  // // Handle the files and options selected
  // const handleFilesSelected = (files: File[], options: string[]) => {
  //   const selectedOptions = getSelectedItems();

  //   // Log all the selected options
  //   for (const option of selectedOptions) {
  //     console.log("Option selected:", option);
  //   }

  //   for (const item of options) {
  //     console.log("Option selected:", item);
  //   }
  //   // console.log("Received files:", files);

  //   // Look for a specific file by name
  //   const targetFile = files.find(file => file.name === "followers_1.json");

  //   if (targetFile) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       try {
  //         const result = event.target?.result as string;
  //         const parsed = JSON.parse(result);
  //         console.log("Parsed JSON data:", parsed);

  //         // Do something with the parsed data
  //       } catch (err) {
  //         console.error("Error parsing JSON:", err);
  //       }
  //     };
  //     reader.readAsText(targetFile);
  //   } else {
  //     console.warn("Couldn't find followers_1.json, honey 🧐");
  //   }
  // };

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

  const handleSubmission = (files: File | File[]): void => {
    // Ensure 'files' is always treated as an array
    const fileArray = Array.isArray(files) ? files : [files];

    // Define a mapping from selected labels to corresponding file name patterns
    const labelToFileMap: Record<string, string[]> = {
      "Followers/Following": ["followers_1.json", "following.json"],
      "Hide Story From": ["hide_story_from.json"],
      "Pending Follow Requests": ["pending_follow_requests.json"],
      "Restricted Profiles": ["restricted_profiles.json"],
    };

    // Loop through the selectedLabels
    selectedLabels.forEach((label) => {
      // Get the corresponding files for the label
      const filePatterns = labelToFileMap[label] || [];

      // Filter files based on name matching any of the filePatterns
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

      <div>
        {/* Custom Dropzone component */}

        {/* Button to trigger file processing */}
        {/* <Button
          variant="contained"
          color="primary"
          onClick={() => handleFilesSelected(files, options)}
        >
          Load
        </Button> */}

        {/* Render checkboxes for each item */}
        {/* <div>
          {items.map((item) => (
            <div key={item}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CustomCheckBox
                  defaultChecked={false}
                  onChange={(isChecked) => handleCheckboxChange(item, isChecked)}
                />
                {item}
              </label>
            </div>
          ))}
        </div> */}

        {/* <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>

      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
