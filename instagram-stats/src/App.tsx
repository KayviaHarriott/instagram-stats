import { useState } from "react";
import "./App.css";
import { MiniCardProps } from "./components/MiniCard";
// import { CustomDropzone } from './components/CustomDropzone'
// import { Button } from '@mui/material'
import { CustomCheckBox } from "./components/CustomCheckBox";
import { Button } from "@mui/material";
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';

function App() {
  // // const [count, setCount] = useState(0)
  // const [files, setFiles] = useState<File[]>([]);
  // const [options, setOptions] = useState<string[]>([]);

  // // Moved `useState` for checked items to the top level
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // const items = ['Instagram', 'Facebook', 'TikTok', 'X (Twitter)'];

  // const handleFiles = (files: File[]) => {
  //   setFiles(files);
  //   console.log("Received files:", files);
  // };

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

  return (
    <>
      <p>Data Comparison Options</p>
      <p>Select which data comparisons you'd like to analyze:</p>

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

      <Button variant="contained" color="primary" sx={{boxShadow: 'none'}} onClick={() => console.log(selectedLabels)}>
        <StackedBarChartIcon />   
        <p>Analyze Data</p>
      </Button>

      
      <div>
        {/* Custom Dropzone component */}
        {/* <CustomDropzone onFilesSelected={handleFiles} /> */}

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
